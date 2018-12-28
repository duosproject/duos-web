# -*- coding: utf-8 -*-s
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from search.db.query import Query


@require_http_methods(["GET"])
def index(request):

    if request.GET.get("q", ""):
        q = Query()
        result = q.search_from_user_query(request.GET.get("q", ""))

        q.close()

        return JsonResponse(
            {
                "resultList": [
                    {
                        "articleName": record[0],
                        "authorName": record[1],
                        "datasetName": record[2],
                    }
                    for record in result
                ]
            }
        )

    return render(request, "search/index.html")
