import environ
from sqlalchemy.engine.url import URL
from sqlalchemy import MetaData, create_engine, select, and_


class Query:
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

    def survey(self, writes_hash):

        # pretend they're sql aliases
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

        result = self.conn.execute(
            select(
                [
                    ar.c.article_title,
                    ar.c.article_id,
                    re.c.dataset_id,
                    re.c.ref_id,
                    wr.c.writes_hash,
                    wr.c.author_id,
                    au.c.author_name,
                    da.c.dataset_name,
                ]
            )
            .select_from(join)
            .where(wr.c.writes_hash == writes_hash)
        )

        return result.fetchall()

    def author_name(self, author_id):
        author = self.metadata.tables["author"]

        return self.conn.execute(
            select([author.c.author_name])
            .select_from(author)
            .where(author.c.author_id == author_id)
        ).fetchone()[0]

    def article_name(self, article_id):
        article = self.metadata.tables["article"]

        return self.conn.execute(
            select([article.c.article_title])
            .select_from(article)
            .where(article.c.article_id == article_id)
        ).fetchone()[0]

    def insert_validation(self, validation_data):
        from random import randint
        from datetime import datetime

        print(validation_data)

        # ins = (
        #     self.metadata.tables["validation"]
        #     .insert()
        #     .values(
        #         validationid=randint(0, 100),
        #         refid=refid,
        #         validationchoice=selection,
        #         validationcomment=clarification,
        #         updatedat=datetime.now(),
        #     )
        # )
        pass
        # return self.conn.execute(ins)

    def close(self):
        self.conn.close()
