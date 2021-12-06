#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import markdown
import pelican
import jinja2

LOAD_CONTENT_CACHE = False

AUTHOR = "Dan Turkel"
SITENAME = "Dan Turkel (dot com)"
SITEURL = ""
TIMEZONE = "America/New_York"
DEFAULT_LANG = "en"
NAV_MENU = (
    {"title": "Home", "url": "", "ext": False},
    {"title": "About", "url": "about.html", "ext": False},
    {"title": "Writing", "url": "writing.html", "ext": False},
    {"title": "GitHub", "url": "https://github.com/daturkel", "ext": True},
)

THEME = "theme"

# Basic settings
USE_FOLDER_AS_CATEGORY = False
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False
DEFAULT_DATE_FORMAT = "%B %-d, %Y"
DEFAULT_PAGINATION = False
DEFAULT_METADATA = {"math": "false"}

PATH = "content"
ARTICLE_PATHS = ["posts"]
PAGE_PATHS = ["pages"]

FORMATTED_FIELDS = ["summary"]

# URL settings
ARTICLE_URL = ARTICLE_SAVE_AS = "{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
SLUG_REGEX_SUBSTITUTIONS = [
    (r"[^\w\s-]", ""),  # remove non-alphabetical/whitespace/'-' chars
    (r"(?u)\A\s*", ""),  # strip leading whitespace
    (r"(?u)\s*\Z", ""),  # strip trailing whitespace
    (r"[-\s]+", "-"),  # reduce multiple whitespace or '-' to single '-'
    (r"_", "-"),  # underscores to hyphens
]
PAGE_URL = PAGE_SAVE_AS = "{slug}.html"
SLUGIFY_SOURCE = "title"  # use post/page title to autogenerate slug
SLUGIFY_PRESERVE_CASE = False
STATIC_PATHS = ["images", "misc"]
EXTRA_PATH_METADATA = {
    "misc/android-chrome-192x192.png": {"path": "android-chrome-192x192.png"},
    "misc/android-chrome-512x512.png": {"path": "android-chrome-512x512.png"},
    "misc/apple-touch-icon.png": {"path": "apple-touch-icon.png"},
    "misc/favicon-16x16.png": {"path": "favicon-16x16.png"},
    "misc/favicon-32x32.png": {"path": "favicon-32x32.png"},
    "misc/favicon.ico": {"path": "favicon.ico"},
    "misc/site.webmanifest": {"path": "site.webmanifest"},
}
THEME_STATIC_DIR = "css"
# Don't need these
INDEX_SAVE_AS = ""
ARCHIVES_SAVE_AS = ""
PERIOD_ARCHIVES_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
AUTHORS_SAVE_AS = ""
TAGS_SAVE_AS = ""
CATEGORY_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""

MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.fenced_code": {},
        "markdown.extensions.footnotes": {"BACKLINK_TEXT": "&uarr;"},
        "markdown.extensions.meta": {},
        "markdown.extensions.smarty": {},
    },
    "output_format": "html5",
}
JINJA_ENVIRONMENT = {
    "trim_blocks": True,
    "lstrip_blocks": True,
}

md = markdown.Markdown(extensions=["meta"])
JINJA_FILTERS = {"markdown": lambda text: jinja2.Markup(md.convert(text))}

PLUGINS = ["webassets", "jinja2content"]
WEBASSETS_CONFIG = (
    ("url_expire", False),
    ("versions", False),
)
WEBASSETS_BUNDLES = (
    ("stylesheet", ["style.scss"], {"filters": "scss", "output": "style.css"}),
)
WEBASSETS_SOURCE_PATHS = ["scss"]

# Feed generation is usually not desired when developing
FEED_DOMAIN = None
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# SITEURL = "https://danturkel.com"
FEED_DOMAIN = SITEURL
FEED_ALL_ATOM = "feeds/rss.xml"
CATEGORY_FEED_ATOM = None
RSS_FEED_SUMMARY_ONLY = False
