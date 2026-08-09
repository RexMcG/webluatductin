import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix Desktop Active Link
    # Before: <a class="text-accent font-bold transition-colors duration-200" href="...">
    content = re.sub(
        r'class="text-accent font-bold transition-colors duration-200"',
        r'class="text-accent transition-colors duration-200 uppercase font-semibold text-[15px]"',
        content
    )
    
    # Fix Mobile Active Link
    # Before: <a class="font-label-sm text-label-sm text-accent font-bold" href="...">
    content = re.sub(
        r'class="font-label-sm text-label-sm text-accent font-bold"',
        r'class="text-accent uppercase font-semibold text-[15px]"',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed active header links.")
