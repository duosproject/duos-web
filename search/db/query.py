import os
import environ

from sqlalchemy import MetaData, create_engine, select, func
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
        intermediate_join = (
            re.join(ar, re.c.article_id == ar.c.article_id)
            .join(wr, wr.c.article_id == re.c.article_id)
            .join(au, au.c.author_id == wr.c.author_id)
            .join(da, da.c.dataset_id == re.c.dataset_id)
        )

        # Match user-query against text search vector
        text_search_match_records = (
            select([ar.c.article_id, au.c.author_id, da.c.dataset_id])
            .select_from(intermediate_join)
            .where(
                func.to_tsvector(
                    func.concat(au.c.author_name, ar.c.article_title, da.c.dataset_name)
                ).match(query_string.replace(" ", r"|"))
            )
        ).cte("text_search_match_records")

        # Join in search result data from IDs in the CTE
        resultset_join = (
            text_search_match_records.join(
                ar, ar.c.article_id == text_search_match_records.c.article_id
            )
            .join(wr, wr.c.article_id == ar.c.article_id)
            .join(au, au.c.author_id == wr.c.author_id)
            .join(re, re.c.article_id == ar.c.article_id)
            .join(da, da.c.dataset_id == re.c.dataset_id)
        )

        return self.conn.execute(
            select(
                [
                    ar.c.article_title,
                    func.json_agg(au.c.author_name),
                    func.json_agg(da.c.dataset_name),
                ]
            )
            .group_by(ar.c.article_title)
            .select_from(resultset_join)
        ).fetchall()

    def close(self):
        self.conn.close()
