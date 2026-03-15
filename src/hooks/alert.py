import re
import markdown

def on_page_markdown(markdown_text, **kwargs):
    pattern = r":!(\w+)(?: ([^\n]+))?\n([\s\S]*?)\n:::"

    def repl(match):
        type = match.group(1).strip()
        title = match.group(2)
        title = "" if title is None else title.strip()
        content = match.group(3).strip()

        # render markdown inside the block
        content_html = markdown.markdown(content)

        return f'<div class="alert alert-{type}"><div class="title">{title}</div>{content_html}</div>'

    return re.sub(pattern, repl, markdown_text, flags=re.DOTALL)