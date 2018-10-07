# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render

from feedback.models import Duosauthor


def index(request):
    context = {"title": "Collecting feedback from DUOS' subjects"}
    return render(request, "feedback/index.html", context)


def author_list(request):
    context = {}
    context["authors"] = Duosauthor.objects.all()
    context["props"] = json.dumps({"hey": "hey"})
    return render(request, "feedback/author_list.html", context)


def author_detail(request, author_id):
    context = {}
    context["author"] = Duosauthor.objects.get(authorid=author_id)
    context["props"] = json.dumps({"hey": "hey"})
    return render(request, "feedback/author_detail.html", context)
