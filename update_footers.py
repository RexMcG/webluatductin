import os
import glob

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

iframe_html = '\n      <div class="col-span-1 md:col-span-4 mt-stack-md">\n        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125419.33178072695!2d106.5754288003725!3d10.784166700000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4bc8ad1f21%3A0x1c31b41801cfac6c!2sSaigon%20Trade%20Center%20Tower%20-%20Office%20Saigon!5e0!3m2!1svi!2s!4v1785438121278!5m2!1svi!2s" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" class="rounded-lg shadow-elegant"></iframe>\n      </div>'

for file_path in html_files:
    if ".agents" in file_path or "node_modules" in file_path:
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "https://www.google.com/maps/embed" in content:
        continue
        
    # Pattern 1: index.html style (copyright at the bottom)
    target1 = '<div class="col-span-1 md:col-span-4 mt-stack-lg pt-stack-md border-t border-border-neutral">'
    if target1 in content:
        content = content.replace(target1, iframe_html + '\n      ' + target1)
    
    # Pattern 2: calculator style (copyright at the top, contact at the bottom)
    target2 = '<div class="flex flex-col gap-stack-sm">\n        <span class="font-label-sm text-label-sm text-surface-alt hover:text-accent">Hotline: 09xx.xxx.xxx</span>\n        <span class="font-label-sm text-label-sm text-surface-alt hover:text-accent">info@ductinlaw.vn</span>\n      </div>'
    if target2 in content:
        content = content.replace(target2, target2 + iframe_html)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Successfully added Google Maps to footers.")
