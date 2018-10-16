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

    def survey(self, author_id, article_id):

        # pretend they're sql aliases
        ar = self.metadata.tables["article"]
        re = self.metadata.tables["refs"]
        wr = self.metadata.tables["duoswrites"]
        au = self.metadata.tables["duosauthor"]

        # Every dataset referenced in a paper for a given author
        join = (
            ar.join(re, re.c.articleid == ar.c.articleid)
            .join(wr, wr.c.articleid == ar.c.articleid)
            .join(au, au.c.authorid == wr.c.authorid)
        )

        result = self.conn.execute(
            select(
                [
                    ar.c.articletitle,
                    ar.c.articleid,
                    ar.c.articleyear,
                    re.c.datasetname,
                    re.c.refid,
                    re.c.context,
                    wr.c.authorid,
                    au.c.authorname,
                ]
            )
            .select_from(join)
            .where(and_(wr.c.authorid == author_id, ar.c.articleid == article_id))
        )

        return result.fetchall()

    def author_name(self, author_id):
        author = self.metadata.tables["duosauthor"]

        return self.conn.execute(
            select([author.c.authorname])
            .select_from(author)
            .where(author.c.authorid == author_id)
        ).fetchone()[0]

    def article_name(self, article_id):
        article = self.metadata.tables["article"]

        return self.conn.execute(
            select([article.c.articletitle])
            .select_from(article)
            .where(article.c.articleid == article_id)
        ).fetchone()[0]

    def close(self):
        self.conn.close()
