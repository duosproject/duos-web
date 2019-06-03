# -*- coding: utf-8 -*-s
import logging
import sys

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from search.db.query import Query


@require_http_methods(["GET"])
def index(request):

    if request.GET.get("q", ""):

        session_id = request.COOKIES["sessionid"]
        user_query = request.GET.get("q", "")

        q = Query()

        search_results = q.search_from_user_query(user_query)
        q.write_session_info(session_id, user_query)

        q.close()

        return (
            JsonResponse(
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
            if request.session.test_cookie_worked()
            else HttpResponse("Please enable cookies to use this search engine")
        )

    request.session.set_test_cookie()
    return render(request, "search/index.html")
