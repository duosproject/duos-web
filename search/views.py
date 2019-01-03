# -*- coding: utf-8 -*-s
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from search.db.query import Query


@require_http_methods(["GET"])
def index(request):

    if request.GET.get("q", ""):
        q = Query()

        search_results = q.search_from_user_query(request.GET.get("q", ""))

        try:
            return JsonResponse(
                {
                    "resultList": [
                        {
                            # make it javascripty
                            "articleName": result["article_title"],
                            "authorName": result["author_name"],
                            "datasetName": result["dataset_name"],
                        }
                        for result in search_results
                    ]
                }
            )
        finally:
            # make sure conn closes...
            q.close()

    return render(request, "search/index.html")
