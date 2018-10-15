# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render
from sqlalchemy import MetaData, create_engine, select, and_
from sqlalchemy.engine.url import URL

import environ

env = environ.Env()
env.read_env(".env")


def index(request):
    context = {"title": "Collecting feedback from DUOS' subjects"}
    return render(request, "feedback/index.html", context)


def author_survey(request, author_id, article_id):

    # connstr = "postgresql://duos:zark0&ainsl3y@localhost/duos_dev?port=5432"
    db = {
        "drivername": "postgres",
        "username": env("DB_USER"),
        "password": env("DB_PASSWORD"),
        "host": env("DB_HOST"),
        "port": env("DB_PORT"),
        "database": env("DB_NAME"),
    }
    connstr = URL(**db)

    engine = create_engine(connstr)
    metadata = MetaData()
    metadata.reflect(bind=engine)  # map db metadata to engine
    conn = engine.connect()

    au = metadata.tables["duosauthor"]
    ar = metadata.tables["article"]
    re = metadata.tables["refs"]
    wr = metadata.tables["duoswrites"]

    # Every dataset referenced in a paper for a given author
    join = (
        ar.join(re, re.c.articleid == ar.c.articleid)
        .join(wr, wr.c.articleid == ar.c.articleid)
        .join(au, au.c.authorid == wr.c.authorid)
    )

    query = conn.execute(
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

    resultset = query.fetchall()
    conn.close()

    props = {
        "authorName": list(set([x["authorname"] for x in resultset]))[0],
        "articleName": list(set([x["articletitle"] for x in resultset]))[0],
        "datasets": list(set([x["datasetname"] for x in resultset])),
    }

    context = {"props": json.dumps(props)}
    return render(request, "feedback/author_survey.html", context)
