import glob

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file in html_files:
    if ".agents" in file or "node_modules" in file:
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Change logo color from text-primary to text-accent inside the footer
    if 'class="font-headline-md text-headline-md font-bold text-primary mb-stack-sm">DUCTIN &amp; PARTNERS</div>' in content:
        content = content.replace(
            'class="font-headline-md text-headline-md font-bold text-primary mb-stack-sm">DUCTIN &amp; PARTNERS</div>',
            'class="font-headline-md text-headline-md font-bold text-accent mb-stack-sm">DUCTIN &amp; PARTNERS</div>'
        )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Footer logo colors fixed.")
