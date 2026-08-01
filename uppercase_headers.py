import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Make top desktop navigation uppercase and larger
    content = content.replace(
        'text-surface-alt hover:text-accent transition-colors duration-200',
        'text-surface-alt hover:text-accent transition-colors duration-200 uppercase font-semibold text-[15px]'
    )
    
    # Check if they are already modified and if so avoid double applying
    # The replace above will just do it. But wait, if I run it twice, it will add it twice.
    # We can just do a regex replace to be safe.
    content = re.sub(
        r'text-surface-alt hover:text-accent transition-colors duration-200(\s+uppercase font-semibold text-\[15px\])*',
        r'text-surface-alt hover:text-accent transition-colors duration-200 uppercase font-semibold text-[15px]',
        content
    )
    
    # Also fix the Mobile Menu items if needed? 
    # "<a class="font-label-sm text-label-sm text-surface-alt hover:text-accent""
    content = re.sub(
        r'font-label-sm text-label-sm text-surface-alt hover:text-accent(\s+uppercase font-semibold text-\[15px\])*',
        r'font-label-sm text-label-sm text-surface-alt hover:text-accent uppercase font-semibold text-[15px]',
        content
    )
    
    # Also fix "Dịch vụ Pháp lý" in Pill bar which was missed because it had `bg-primary` instead of `bg-surface-main`
    content = content.replace(
        'bg-primary text-on-primary rounded-full px-6 py-2 font-label-sm text-label-sm"',
        'bg-primary text-on-primary rounded-full px-6 py-2 font-label-sm text-sm uppercase transition-colors font-semibold"'
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated header links to uppercase.")
