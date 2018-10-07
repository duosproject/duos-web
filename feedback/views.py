# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.shortcuts import render

from feedback.models import Duosauthor


def index(request):
    context = {"title": "Collecting feedback from DUOS' subjects"}
    return render(request, "feedback/index.html", context)


def author_survey(request, author_id):
    context = {}

    author = Duosauthor.objects.get(authorid=author_id)
    author_name = author.authorname

    props = {"name": author_name}

    context["props"] = json.dumps(props)
    return render(request, "feedback/author_survey.html", context)
