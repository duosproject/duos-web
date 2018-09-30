# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.template import Context
from django.views.generic import ListView
from feedback.models import Duosauthor


def index(request):
    c = {"title": "ugh"}
    return render(request, "feedback/index.html", c)


class AuthorList(ListView):
    model = Duosauthor
    context_object_name = "authors"
    template_name = "feedback/authorlist.html"
