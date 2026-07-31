import glob
import re

files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

header_regex = re.compile(r'<a\s+class="font-headline-lg[^>]+href="([^"]+)"[^>]*>\s*DUCTIN\s*&amp;\s*PARTNERS\s*</a>', re.IGNORECASE)
footer_regex = re.compile(r'<div\s+class="font-headline-md[^>]+>\s*DUCTIN\s*&amp;\s*PARTNERS\s*</div>', re.IGNORECASE)

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    is_root = 'pages' not in f.replace('\\', '/')
    img_path = 'img/Logo_website.png' if is_root else '../img/Logo_website.png'
    
    header_replacement = r'<a href="\1"><img src="' + img_path + r'" alt="Logo" class="h-8 md:h-10 object-contain" /></a>'
    footer_replacement = r'<div><img src="' + img_path + r'" alt="Logo" class="h-10 md:h-12 object-contain" /></div>'
    
    new_content = header_regex.sub(header_replacement, content)
    new_content = footer_regex.sub(footer_replacement, new_content)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print('Updated', f)
