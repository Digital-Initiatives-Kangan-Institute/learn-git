import re

def on_page_markdown(markdown_text, **kwargs):
    pattern = r":\$([^:]+):([a-zA-Z_]\w*\([^)]*\));"

    def repl(match):
        text = match.group(1).strip()
        function = match.group(2).strip()

        return f'<button class="button" onclick="{function}">{text}</button>'

    return re.sub(pattern, repl, markdown_text, flags=re.DOTALL)