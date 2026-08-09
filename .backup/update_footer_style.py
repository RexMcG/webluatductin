import glob
import re

files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update the wrappers
    content = content.replace('<div class="flex flex-col gap-stack-sm">', '<div class="flex flex-col gap-stack-sm bg-white/5 p-5 rounded-xl border border-white/10 shadow-sm">')
    
    # Update the titles
    pattern = re.compile(r'<p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold">([^<]+)</p>')
    replacement = r'<p class="font-label-sm text-label-sm text-on-primary mb-3 font-bold border-b-2 border-accent pb-1 w-fit">\1</p>'
    content = pattern.sub(replacement, content)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Footer layers and titles updated.")
