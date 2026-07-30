import os
import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

nav_items = [
    {"name": "Trang chủ", "file": "index.html", "is_tool": False},
    {"name": "Dịch vụ", "file": "services.html", "is_tool": False},
    {"name": "Biểu mẫu AI", "file": "ai-form-library.html", "is_tool": False},
    {"name": "Công cụ", "file": None, "is_tool": True, "dropdown": [
        {"name": "Tính án phí", "file": "court-fee-calculator.html"},
        {"name": "Tính lương Gross-to-Net", "file": "salary-calculator.html"},
        {"name": "Tính thuế TNCN", "file": "pit-calculator.html"},
    ]},
    {"name": "AI Chat", "file": "ai-chatbot.html", "is_tool": False},
    {"name": "Đặt lịch", "file": "appointment.html", "is_tool": False},
]

for filepath in html_files:
    if ".agents" in filepath or "node_modules" in filepath:
        continue
    
    filename = os.path.basename(filepath)
    is_index = filename == "index.html"
    
    def get_link(target_file):
        if is_index:
            if target_file == "index.html": return "index.html"
            return f"pages/{target_file}"
        else:
            if target_file == "index.html": return "../index.html"
            return target_file

    # Build Desktop Nav
    desktop_html = '<div class="hidden md:flex gap-gutter items-center font-label-sm text-label-sm">\n'
    for item in nav_items:
        if not item.get("is_tool"):
            is_active = item["file"] == filename
            cls = "text-accent font-bold" if is_active else "text-surface-alt hover:text-accent"
            desktop_html += f'<a class="{cls} transition-colors duration-200" href="{get_link(item["file"])}">{item["name"]}</a>\n'
        else:
            is_active = filename in [d["file"] for d in item["dropdown"]]
            cls = "text-accent font-bold" if is_active else "text-surface-alt hover:text-accent"
            desktop_html += f'<div class="relative group">\n<a class="{cls} transition-colors duration-200 flex items-center gap-1" href="#">Công cụ <span class="material-symbols-outlined text-sm">expand_more</span></a>\n'
            desktop_html += '<div class="absolute top-full left-0 mt-2 w-64 bg-primary rounded shadow-lg border border-border-neutral opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">\n'
            for idx, drop in enumerate(item["dropdown"]):
                border = ' border-b border-border-neutral' if idx < len(item["dropdown"]) - 1 else ''
                desktop_html += f'<a class="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm{border}" href="{get_link(drop["file"])}">{drop["name"]}</a>\n'
            desktop_html += '</div>\n</div>\n'
    desktop_html += '</div>'

    # Build Mobile Nav
    mobile_html = '<div class="hidden md:hidden bg-primary border-t border-border-neutral px-margin-mobile py-4" id="mobile-menu">\n<div class="flex flex-col gap-4">\n'
    for item in nav_items:
        if not item.get("is_tool"):
            is_active = item["file"] == filename
            cls = "text-accent font-bold" if is_active else "text-surface-alt hover:text-accent"
            mobile_html += f'<a class="font-label-sm text-label-sm {cls}" href="{get_link(item["file"])}">{item["name"]}</a>\n'
        else:
            is_active = filename in [d["file"] for d in item["dropdown"]]
            cls = "text-accent font-bold" if is_active else "text-on-primary font-bold opacity-50"
            mobile_html += f'<div class="font-label-sm text-label-sm {cls} uppercase mt-2">Công cụ</div>\n'
            for drop in item["dropdown"]:
                d_active = drop["file"] == filename
                d_cls = "text-accent font-bold" if d_active else "text-surface-alt hover:text-accent"
                mobile_html += f'<a class="font-label-sm text-label-sm {d_cls} pl-4" href="{get_link(drop["file"])}">{drop["name"]}</a>\n'
    mobile_html += '</div>\n</div>'

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Desktop Nav
    content = re.sub(
        r'<!-- Desktop Nav -->.*?<div class="flex items-center gap-stack-md">',
        f'<!-- Desktop Nav -->\n{desktop_html}\n<div class="flex items-center gap-stack-md">',
        content,
        flags=re.DOTALL
    )

    # Replace Mobile Nav
    content = re.sub(
        r'<!-- Mobile Menu -->.*?</div>\n</nav>',
        f'<!-- Mobile Menu -->\n{mobile_html}\n</nav>',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Navbar updated successfully across all files.")
