# -*- coding: utf-8 -*-
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods


def index(request):
    return render(request, "search/index.html")
