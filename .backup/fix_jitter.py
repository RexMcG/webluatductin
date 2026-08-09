import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Force vertical scrollbar to prevent horizontal jumping between pages
    # <html lang="vi">
    content = content.replace('<html lang="vi">', '<html lang="vi" class="overflow-y-scroll">')
    # If there are other variants
    content = content.replace('<html lang="en">', '<html lang="en" class="overflow-y-scroll">')
    
    # 2. Add explicit width to the logo to prevent CLS (Cumulative Layout Shift)
    # class="h-8 md:h-10 object-contain"
    content = content.replace(
        'class="h-8 md:h-10 object-contain"',
        'class="h-8 md:h-10 w-[195px] md:w-[244px] object-contain"'
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed navbar jitter by preventing CLS and scrollbar jumps.")
