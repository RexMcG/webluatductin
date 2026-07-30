import os
import re

html_files = [
    "c:\\webluat\\DemoWebLuat\\index.html",
    "c:\\webluat\\DemoWebLuat\\pages\\ai-chatbot.html",
    "c:\\webluat\\DemoWebLuat\\pages\\ai-form-library.html",
    "c:\\webluat\\DemoWebLuat\\pages\\ai-form-checker.html",
    "c:\\webluat\\DemoWebLuat\\pages\\appointment.html",
    "c:\\webluat\\DemoWebLuat\\pages\\court-fee-calculator.html",
    "c:\\webluat\\DemoWebLuat\\pages\\pit-calculator.html",
    "c:\\webluat\\DemoWebLuat\\pages\\salary-calculator.html",
    "c:\\webluat\\DemoWebLuat\\pages\\services.html"
]

def update_nav(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine if we are in index or pages to set the correct href prefix
    prefix = "pages/" if "index.html" in filepath else ""

    # 1. Desktop Nav Replacement
    # Find something like:
    # <a class="text-surface-alt hover:text-accent transition-colors duration-200" href="ai-form-library.html">Biểu
    #      mẫu AI</a>
    desktop_pattern = r'<a\s+class="text-surface-alt hover:text-accent transition-colors duration-200"\s+href="[^"]*ai-form-library\.html"[^>]*>\s*Biểu\s*mẫu\s*AI\s*</a>'
    
    desktop_replacement = f"""<div class="relative group">
          <a class="text-surface-alt hover:text-accent transition-colors duration-200 flex items-center gap-1"
            href="#">Biểu mẫu AI <span class="material-symbols-outlined text-sm">expand_more</span></a>
          <div class="absolute top-full left-0 mt-2 w-64 bg-primary rounded shadow-lg border border-border-neutral opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 overflow-hidden">
            <a class="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm border-b border-border-neutral" href="{prefix}ai-form-library.html">Thư viện biểu mẫu</a>
            <a class="px-4 py-3 text-on-primary hover:bg-secondary hover:text-accent font-label-sm text-label-sm" href="{prefix}ai-form-checker.html">AI Thẩm định</a>
          </div>
        </div>"""
        
    content = re.sub(desktop_pattern, desktop_replacement, content)

    # 2. Mobile Nav Replacement
    # Find something like:
    # <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent" href="ai-form-library.html">Biểu mẫu
    #      AI</a>
    mobile_pattern = r'<a\s+class="font-label-sm text-label-sm text-surface-alt hover:text-accent"\s+href="[^"]*ai-form-library\.html"[^>]*>\s*Biểu\s*mẫu\s*AI\s*</a>'
    
    mobile_replacement = f"""<div class="font-label-sm text-label-sm text-on-primary font-bold opacity-50 uppercase mt-2">Biểu mẫu AI</div>
        <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent pl-4" href="{prefix}ai-form-library.html">Thư viện biểu mẫu</a>
        <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent pl-4" href="{prefix}ai-form-checker.html">AI Thẩm định</a>"""
        
    content = re.sub(mobile_pattern, mobile_replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filepath in html_files:
    update_nav(filepath)

print("Nav updated successfully!")
