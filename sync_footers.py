import glob
import re

# Read index.html to extract the exact footer string
with open('c:/webluat/DemoWebLuat/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract from <footer to </footer>
footer_match = re.search(r'<footer.*?</footer\s*>', index_content, flags=re.DOTALL)
if not footer_match:
    print("Could not find footer in index.html")
    exit(1)

base_footer = footer_match.group(0)

# Iterate all html files in pages/ and replace their footer
html_files = glob.glob('c:/webluat/DemoWebLuat/pages/*.html')

for filepath in html_files:
    # Adjust paths for pages folder
    page_footer = base_footer.replace('href="pages/', 'href="')
    page_footer = page_footer.replace('href="index.html"', 'href="../index.html"')

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the existing footer
    new_content = re.sub(r'<footer.*?</footer\s*>', page_footer, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Footer synced across all pages.")
