# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods


from feedback.db.query import Query


def index(request):
    return render(request, "feedback/index.html")


@require_http_methods(["GET", "POST"])
def author_survey(request, writes_hash):

    q = Query()

    # every reference to a dataset in this article
    references = q.survey(writes_hash)

    # handle form submission
    if request.method == "POST":
        validation_data = json.loads(request.body)

        q.insert_validation(validation_data)
        q.close()

        return HttpResponse("thanks!")

    # just grab the first entry of the _id columns
    author_id = next((ref["author_id"] for ref in references))
    article_id = next((ref["article_id"] for ref in references))
    ref_id = next((ref["ref_id"] for ref in references))

    props = {
        "authorName": q.author_name(author_id),
        "authorId": author_id,
        "articleName": q.article_name(article_id),
        "articleId": article_id,
        "refId": ref_id,
        "datasets": [
            {"name": ref["dataset_name"], "id": ref["dataset_id"]} for ref in references
        ],
    }

    context = {"props": json.dumps(props)}

    q.close()
    return render(request, "feedback/author_survey.html", context)
