# -*- coding: utf-8 -*-s
import logging
import sys

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from search.db.query import Query


@require_http_methods(["GET"])
def index(request):

    logging.basicConfig(
        stream=sys.stdout,
        level=logging.INFO,
        datefmt="%m/%d/%Y %H:%M:%S",
        format="%(asctime)s %(message)s",
    )

    if request.GET.get("q", ""):
        q = Query()

        search_results = q.search_from_user_query(request.GET.get("q", ""))
        q.close()

        logging.info(
            f"""User originating from {request.META["REMOTE_ADDR"]} searched for: {request.GET.get("q", "")}"""
        )
        return JsonResponse(
            {
                "resultList": [
                    {
                        "articleName": article,
                        "authors": list(set(authors)),
                        "datasets": list(set(datasets)),
                    }
                    for article, authors, datasets in search_results
                ]
            }
        )

    return render(request, "search/index.html")
