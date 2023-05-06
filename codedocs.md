---
layout: default
title: "Greyscript Documentation"
permalink: /api
---
# Greyscript Documentation
{% assign encrypt = site.data.encryption %}
{% assign nightly = site.data.nightly %}
<ul>
{% for type in site.data.typelist %}
  <li><details><summary><b>{{ type }}</b></summary><ul>
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
    {% assign x = argdata | size | minus:1 %}
    {% assign y = retdata | size | minus:2 %}
    {% assign z = argdata | size %}
    {% if z > 1 %}
        {% assign p1 = "(" %}
        {% assign p2 = ")" %}
    {% endif %}
    {% if type != "General" %}
<li><details><summary>{{ type }}.{{ func }}{{ p1 }}{{ argdata | slice: 0, x}}{{ p2 }} : {{ retdata | slice: 0, y}}</summary>
    {% endif %}
    {% if type == "General" %}
<li><details><summary>{{ func }}{{ p1 }}{{ argdata | slice: 0, x}}{{ p2 }} : {{ retdata | slice: 0, y}}</summary>
    {% endif %}
{% assign funcdef = type | append: "." | append: func %}
{% if encrypt contains funcdef %}
> **Note:** This method cannot be used in encryption configuration.
{% endif %}
{% if nightly contains funcdef %}
> **NIGHTLY BUILD**: This function is only available in the nightly (or experimental?) branch of the game. It is subject to change at any time.
{% endif %}
{{ desc }}
{% for ex in examples %}
```lua
{{ ex }}
```
{% endfor %}
</details></li>
  {% endfor %}
  </ul></details></li>
{% endfor %}
</ul>

#### Checkout the Visual Studio Code extension for Greyscript: it offers autocomplete and hover documentation using the above data (+ some other cool stuff, too!): click (HERE)[https://marketplace.visualstudio.com/items?itemName=WyattL.greyscript]!