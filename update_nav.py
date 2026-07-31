import glob

files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Removing border-b border-border-neutral
    new_content = content.replace('<nav class="bg-primary fixed top-0 w-full z-50 border-b border-border-neutral">', 
                                  '<nav class="bg-primary fixed top-0 w-full z-50">')
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print('Updated nav in', f)
