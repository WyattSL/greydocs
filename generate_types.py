#!/usr/bin/env python3

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "_data"
OUTPUT_FILE = ROOT / "types" / "greyscript.d.ts"

PRIMITIVES = {
    "string": "string",
    "number": "number",
    "null": "null",
    "any": "any",
    "boolean": "boolean",
    "bool": "boolean",
    "void": "void",
}

RESERVED = {
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "as",
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield",
}


def load_json(name: str) -> dict:
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))


def normalize_type_name(name: str, prefer_primitive: bool = True) -> str:
    raw = (name or "any").strip()
    lowered = raw.lower()
    if prefer_primitive and lowered in PRIMITIVES:
        return PRIMITIVES[lowered]
    sanitized = re.sub(r"\W", "_", raw)
    if not sanitized:
        return "any"
    if sanitized[0].isdigit():
        sanitized = f"_{sanitized}"
    return sanitized


def escape_jsdoc(text: str) -> str:
    return text.replace("*/", "*\\/")


def sanitize_identifier(name: str) -> str:
    cleaned = re.sub(r"\W", "_", name or "arg")
    if not cleaned:
        cleaned = "arg"
    if cleaned[0].isdigit():
        cleaned = f"_{cleaned}"
    if cleaned in RESERVED:
        cleaned = f"{cleaned}_"
    return cleaned


def sanitize_member_name(name: str) -> str:
    cleaned = re.sub(r"\W", "_", name or "")
    if not cleaned:
        return '"unknown"'
    if cleaned[0].isdigit():
        cleaned = f"_{cleaned}"
    return cleaned


def ts_type(type_def: dict) -> str:
    base = normalize_type_name(str(type_def.get("type", "any")))
    sub = type_def.get("subType")
    if not sub:
        return base

    sub_type = normalize_type_name(str(sub))
    if base == "List":
        return f"{sub_type}[]"
    if base == "Map":
        return f"Record<string, {sub_type}>"
    return f"{base}<{sub_type}>"


def unique(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        if value not in seen:
            seen.add(value)
            result.append(value)
    return result


def generate() -> str:
    functions = load_json("functions.json")
    arguments = load_json("arguments.json")
    returns = load_json("returns.json")
    descriptions = load_json("descriptions.json")

    lines: list[str] = [
        "// Generated from _data/functions.json, _data/arguments.json, _data/returns.json and _data/descriptions.json",
        "// Run: python generate_types.py",
        "",
        "declare namespace GreyHack {",
    ]

    for class_name, methods in functions.items():
        lines.append(f"  interface {normalize_type_name(class_name, prefer_primitive=False)} {{")
        class_args = arguments.get(class_name, {})
        class_returns = returns.get(class_name, {})
        class_descriptions = descriptions.get(class_name, {})

        for method in methods:
            method_args = class_args.get(method, [])
            method_returns = class_returns.get(method, [])
            description = class_descriptions.get(method)

            params: list[str] = []
            for arg in method_args:
                arg_name = sanitize_identifier(str(arg.get("name", "arg")))
                optional = "?" if arg.get("optional") else ""
                params.append(f"{arg_name}{optional}: {ts_type(arg)}")
            params_text = ", ".join(params)

            if method_returns:
                ret = " | ".join(unique([ts_type(item) for item in method_returns]))
            else:
                ret = "void"

            if description:
                lines.append("    /**")
                for row in escape_jsdoc(str(description)).splitlines():
                    lines.append(f"     * {row}" if row else "     *")
                lines.append("     */")

            method_name = sanitize_member_name(method)
            lines.append(f"    {method_name}({params_text}): {ret};")
            lines.append("")

        if lines[-1] == "":
            lines.pop()
        lines.append("  }")
        lines.append("")

    if lines[-1] == "":
        lines.pop()

    lines.extend(
        [
            "}",
            "",
            "export = GreyHack;",
            "export as namespace GreyHack;",
            "",
        ]
    )

    return "\n".join(lines)


def main() -> None:
    content = generate()
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(content, encoding="utf-8")
    print(f"Generated {OUTPUT_FILE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
