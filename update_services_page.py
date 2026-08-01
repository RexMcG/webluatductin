import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Rename "Dịch vụ" -> "Lĩnh vực"
    # Header links: ">Dịch vụ<" or ">Dịch\n          vụ<"
    content = re.sub(r'>Dịch vụ<', '>Lĩnh vực<', content, flags=re.IGNORECASE)
    content = re.sub(r'>Dịch\s*vụ<', '>Lĩnh vực<', content, flags=re.IGNORECASE)
    # Footer links might just be >Dịch vụ< which is caught above.
    
    # Pill nav: "Dịch vụ Pháp lý"
    content = re.sub(r'>Dịch vụ Pháp lý<', '>Lĩnh vực Pháp lý<', content, flags=re.IGNORECASE)

    # 2. Update services.html hero banner to match white background
    if 'services.html' in file_path:
        # Tầm nhìn & Sứ mệnh badge
        badge_pattern = r'<div class="rounded-full px-4 py-1.5 bg-white/20 text-\[10px\] uppercase tracking-\[0.2em\] font-medium text-white border border-white/30">Tầm nhìn &amp; Sứ mệnh</div>'
        new_badge = '<div class="rounded-full px-4 py-1.5 bg-primary text-[10px] uppercase tracking-[0.2em] font-bold text-white shadow-md">Tầm nhìn &amp; Sứ mệnh</div>'
        content = re.sub(badge_pattern, new_badge, content)
        
        # H1
        h1_pattern = r'<h1 class="font-headline-xl-mobile md:text-\[80px\] leading-\[1.1\] text-white tracking-tighter">'
        new_h1 = '<h1 class="font-headline-xl-mobile md:text-[80px] leading-[1.1] text-primary tracking-tighter">'
        content = re.sub(h1_pattern, new_h1, content)
        
        # P
        p_pattern = r'<p class="font-body-md text-xl text-white/90 max-w-2xl leading-relaxed">'
        new_p = '<p class="font-body-md text-xl text-primary font-semibold max-w-2xl leading-relaxed">'
        content = re.sub(p_pattern, new_p, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated text to 'Lĩnh vực' and fixed services.html hero colors.")
