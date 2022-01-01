---
layout: default
title: "Greyscript Documentation"
permalink: /api
---
# Greyscript Documentation
{% assign encrypt = site.data.encryption %}
{% for type in site.data.typelist %}
  ## {{ type }}
  {% for func in site.data.functions[type] %}
    {% assign args = site.data.arguments[type][func] %}
    {% assign desc = site.data.descriptions[type][func] %}
    {% assign examples = site.data.examples[type][func] %}
    {% assign returns = site.data.returns[type][func] %}
    ### {{ type }}.{{ func }}({% for a in arguments %}{% if a.optional %}?{{ a.name }}:{{ a.type }}, {% else %}{{ a.name }}:{{ a.type }}, {% endif %}{% endfor %}) : {% for r in returns %}{% if r.subType %}{{ r.type }}[{{ r.subType }}] | {% else %}{{ r.type }} | {% endif %}{% endfor %}\n
    {{ desc }}
    {% comment %}
    {% for ex in examples %}
        ```lua
            {{ ex }}
        ```
    {% endfor %}
    {% endcomment %}
  {% endfor %}
{% endfor %}