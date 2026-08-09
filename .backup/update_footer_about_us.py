import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the footer "Về chúng tôi" section
    # First, let's find the specific block
    footer_block_pattern = r'<div class="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">\s*<p class="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>.*?</div>'
    
    # Check if this is a subpage (in pages/) or index
    is_subpage = 'pages\\' in file_path or 'pages/' in file_path
    
    if is_subpage:
        intro_href = '../index.html#about-us'
        services_href = 'services.html'
    else:
        intro_href = '#about-us'
        services_href = 'pages/services.html'

    new_footer_block = f'''<div class="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
          <p class="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="{intro_href}">Giới thiệu chung</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="{services_href}">Lĩnh vực</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
        </div>'''
        
    content = re.sub(footer_block_pattern, new_footer_block, content, flags=re.DOTALL)

    # 2. Add id="about-us" to the section in index.html
    if not is_subpage:
        # The section looks like:
        # <!-- About Us & Why Choose Us -->
        # <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">
        section_pattern = r'<!-- About Us &amp; Why Choose Us -->\s*<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">'
        new_section = '<!-- About Us & Why Choose Us -->\n    <section id="about-us" class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">'
        content = re.sub(section_pattern, new_section, content)
        
        # If the above fails due to exact spacing, let's just do a simpler replacement
        if 'id="about-us"' not in content:
            content = content.replace(
                '<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">',
                '<section id="about-us" class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">'
            )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Footer and about-us ID updated.")
