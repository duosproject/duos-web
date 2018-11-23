# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods


from feedback.db.query import Query


def index(request):
    context = {"title": "Collecting feedback from DUOS' subjects"}
    return render(request, "feedback/index.html", context)


@require_http_methods(["GET", "POST"])
def author_survey(request, writes_hash):

    q = Query()

    # every reference to a dataset in this article
    references = q.survey(writes_hash)
    from pprint import pprint

    pprint(references)

    # handle form submission
    if request.method == "POST":
        validation_data = json.loads(request.body)

        q.insert_validation(validation_data)
        q.close()

        return HttpResponse("nice")

    # distinct datasets (dupes b/c of above granularity)
    dataset_names = list({ref["dataset_name"] for ref in references})

    author_id = [ref["author_id"] for ref in references][0]
    article_id = [ref["article_id"] for ref in references][0]

    props = {
        "authorName": q.author_name(author_id),
        "authorId": author_id,
        "articleName": q.article_name(article_id),
        "articleId": article_id,
        "datasets": [{"name": name} for name in dataset_names],  # TODO: need an ID
    }

    context = {"props": json.dumps(props)}

    q.close()
    return render(request, "feedback/author_survey.html", context)
