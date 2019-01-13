import os
import environ

from sqlalchemy import MetaData, create_engine, select
from sqlalchemy.engine.url import URL
from whoosh.index import create_in
from whoosh.fields import Schema, TEXT
from whoosh.qparser import MultifieldParser


class Query:
    """consolidation of database reads and writes for use in views.py."""

    def __init__(self):
        env = environ.Env()
        env.read_env(".env")

        db = {
            "drivername": "postgres",
            "username": env("DB_USER"),
            "password": env("DB_PASSWORD"),
            "host": env("DB_HOST"),
            "port": env("DB_PORT"),
            "database": env("DB_NAME"),
        }

        self.connstr = URL(**db)

        engine = create_engine(self.connstr)
        self.metadata = MetaData()
        self.metadata.reflect(bind=engine)  # map db metadata to engine

        self.conn = engine.connect()

    def search_from_user_query(self, query_string):

        ar = self.metadata.tables["article"]
        re = self.metadata.tables["reference"]
        wr = self.metadata.tables["writes"]
        au = self.metadata.tables["author"]
        da = self.metadata.tables["dataset"]

        # Every dataset referenced in a paper for a given author
        join = (
            ar.join(re, re.c.article_id == ar.c.article_id)
            .join(wr, wr.c.article_id == ar.c.article_id)
            .join(au, au.c.author_id == wr.c.author_id)
            .join(da, da.c.dataset_id == re.c.dataset_id)
        )

        reference_records = self.conn.execute(
            select(
                [ar.c.article_title, au.c.author_name, da.c.dataset_name]
            ).select_from(join)
        ).fetchall()

        # full text search
        schema = Schema(
            article_title=TEXT(stored=True),
            author_name=TEXT(stored=True),
            dataset_name=TEXT(stored=True),
        )

        if not os.path.exists("indexdir"):
            os.mkdir("indexdir")

        ix = create_in("indexdir", schema)
        writer = ix.writer()

        # yapf: disable
        for record in reference_records:
            writer.add_document(
                article_title=record[0],
                author_name=record[1],
                dataset_name=record[2]
            )

        writer.commit()

        parser = MultifieldParser(
            ["article_title", "author_name", "dataset_name"], schema
        )

        full_text_query = parser.parse(query_string)

        with ix.searcher() as searcher:
            for r in searcher.search(full_text_query, limit=None):
                yield r

    def close(self):
        self.conn.close()
