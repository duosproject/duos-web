# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic import ListView

from feedback.models import Duosauthor


def index(request):
    context = {"title": "Collecting feedback from DUOS' subjects"}
    return render(request, "feedback/index.html", context)


class AuthorList(ListView):
    model = Duosauthor
    context_object_name = "authors"
    template_name = "feedback/author_list.html"


def author_detail(request, author_id):
    context = {}
    context["author"] = Duosauthor.objects.get(authorid=author_id)
    return render(request, "feedback/author_detail.html", context)
