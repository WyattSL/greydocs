---
layout: default
title: "Greyscript Documentation"
permalink: /api
---
# Greyscript Documentation
{% assign encrypt = site.data.encryption %}
{% for type in site.data.typelist %}
  <details><summary><b>{{ type }}</b></summary>
  {% for func in site.data.functions[type] %}
    {% assign args = site.data.arguments[type][func] %}
    {% assign desc = site.data.descriptions[type][func] %}
    {% assign examples = site.data.examples[type][func] %}
    {% assign returns = site.data.returns[type][func] %}
    {% capture argdata %}
        {% for a in args %}
            {% if a.optional %}
?{{ a.name }}:{{ a.type }}, 
            {% else %}
{{ a.name }}:{{ a.type }}, 
            {% endif %}
        {% endfor %}
    {% endcapture %}
    {% capture retdata %}
        {% for r in returns %}
            {% if r.subType %}
{{ r.type }}[{{ r.subType }}] | 
            {% else %}
{{ r.type }} | 
            {% endif %}
        {% endfor %}
    {% endcapture %}
    {% assign argdata = argdata | strip_newlines | strip %}
    {% assign retdata = retdata | strip_newlines | strip %}
    {% assign x = argdata | size | minus:2 %}
    {% assign y = retdata | size | minus:3 %}
<details><summary>{{ type }}.{{ func }}({{ argdata | slice: 1, x}}) : {{ retdata | slice: 1, y}}</summary>
{{ desc }}
{% comment %}
{% for ex in examples %}
```lua
{{ ex }}
```
    {% endfor %}
    {% endcomment %}
</details>
  {% endfor %}
  </details>
{% endfor %}