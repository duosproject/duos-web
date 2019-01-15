# -*- coding: utf-8 -*-s
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from search.db.query import Query


@require_http_methods(["GET"])
def index(request):

    if request.GET.get("q", ""):
        q = Query()

        # its a generator because the whoosh API is irritating. TODO: destroy whoosh
        _search_results = q.search_from_user_query(request.GET.get("q", ""))
        search_results = []

        # calling list() on the generator throws an exception TODO: destroy whoosh
        for result in _search_results:
            search_results.append(
                # appending `result` explicitly to make a copy throws an exception: TODO: destroy whoosh
                {
                    "author_name": result["author_name"],
                    "article_title": result["article_title"],
                    "dataset_name": result["dataset_name"],
                }
            )

        distinct_articles = {r["article_title"] for r in search_results}
        json_result_list = []

        for article in distinct_articles:
            if article not in [j["articleName"] for j in json_result_list]:
                json_result_list.append(
                    {
                        "articleName": article,
                        "authorName": list(  # sets are not serializable
                            {
                                r["author_name"]
                                for r in search_results
                                if r["article_title"] == article
                            }
                        ),
                        "datasetName": list(
                            {
                                r["dataset_name"]
                                for r in search_results
                                if r["article_title"] == article
                            }
                        ),
                    }
                )

        q.close()

        return JsonResponse({"resultList": json_result_list})

    return render(request, "search/index.html")
