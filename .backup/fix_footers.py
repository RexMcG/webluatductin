import glob

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file in html_files:
    if ".agents" in file or "node_modules" in file:
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace the light footer wrapper with the dark one
    # Note: different files might have slightly different classes, but generally it starts with <footer
    if '<footer class="bg-surface-main' in content:
        content = content.replace(
            '<footer class="bg-surface-main w-full border-t border-border-neutral mt-section-padding">',
            '<footer class="bg-primary border-t border-border-neutral w-full mt-section-padding">'
        )
        content = content.replace(
            '<footer class="bg-surface-main w-full border-t border-border-neutral">',
            '<footer class="bg-primary border-t border-border-neutral w-full">'
        )
        
    # Change copyright text from text-text-secondary to text-surface-alt text-sm
    if 'class="font-body-md text-body-md text-text-secondary">© 2024 DUCTIN' in content:
        content = content.replace(
            'class="font-body-md text-body-md text-text-secondary">© 2024 DUCTIN',
            'class="font-body-md text-body-md text-surface-alt text-sm">© 2024 DUCTIN'
        )

    # In services.html, there might be other footer texts. But text-surface-alt is already used for links.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Footers fixed.")
