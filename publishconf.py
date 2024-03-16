#!/usr/bin/env python
# -*- coding: utf-8 -*- #

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import sys
sys.path.append(".")

from pelicanconf import *



# If your site is available via HTTPS, make sure SITEURL begins with https://
SITEURL = "https://danturkel.com"
RELATIVE_URLS = False

FEED_DOMAIN = SITEURL
FEED_ALL_ATOM = "feeds/rss.xml"
CATEGORY_FEED_ATOM = None
RSS_FEED_SUMMARY_ONLY = False

DELETE_OUTPUT_DIRECTORY = True
