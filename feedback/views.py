# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic import ListView, TemplateView

from feedback.models import Duosauthor, Refs


def index(request):
    c = {"title": "ugh"}
    return render(request, "feedback/index.html", c)


class AuthorList(ListView):
    model = Duosauthor
    context_object_name = "authors"
    template_name = "feedback/author_list.html"


def author_detail(request, author_id):
    c = {}
    c['author'] = Duosauthor.objects.filter(authorid=author_id)[0]
    return render(request, "feedback/author_detail.html", c)
