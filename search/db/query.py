from datetime import datetime

import environ
from sqlalchemy import MetaData, create_engine, select, or_
from sqlalchemy.engine.url import URL


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

        return self.conn.execute(
            select([ar.c.article_title, au.c.author_name, da.c.dataset_name])
            .where(
                # or_(
                # ar.c.article_title.ilike(query_string),
                au.c.author_name == (query_string),
                # da.c.dataset_name.ilike(query_string),
                # )
            )
            .select_from(join)
        ).fetchall()

    def close(self):
        self.conn.close()
