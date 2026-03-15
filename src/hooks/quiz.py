import re

site_url = ""

def on_config(config):
    global site_url
    site_url = str(config["site_url"])
    
    if not site_url.endswith("/"):
        site_url = "{site_url}/"

    return config

def on_page_markdown(markdown_text, **kwargs):
    pattern = r":\?(.*?);"

    def repl(match):
        quiz = match.group(1).strip()

        return f'<div class="quiz" file="{site_url}quizzes/{quiz}">Loading Quiz..</div>'

    return re.sub(pattern, repl, markdown_text, flags=re.DOTALL)