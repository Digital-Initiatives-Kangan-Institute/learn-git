import re

def on_page_markdown(markdown, **kwargs):
    pattern = r":::(.*?)\n(.*?)\s:::"

    def repl(match):
        type = match.group(1).strip()
        content = match.group(2).strip()
        return f'<div class="alert {type}">{content}</div>'

    return re.sub(pattern, repl, markdown, flags=re.DOTALL)