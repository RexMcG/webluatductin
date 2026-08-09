import glob
import re

# 1. Fix Layout and Spacing in index.html
with open('c:/webluat/DemoWebLuat/index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

idx_content = idx_content.replace(
    '<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">\n        <!-- About Us -->',
    '<div class="flex flex-col gap-12">\n        <!-- About Us -->'
)

idx_content = idx_content.replace(
    '<!-- Consultation Form & FAQ -->\n    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">',
    '<!-- Consultation Form & FAQ -->\n    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-12">'
)

with open('c:/webluat/DemoWebLuat/index.html', 'w', encoding='utf-8') as f:
    f.write(idx_content)

# 2. Update Header and Footer in ALL HTML files
html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Rename "Công cụ" -> "Tính năng" in header (desktop)
    content = content.replace('>Công cụ <span class="material-symbols-outlined', '>Tính năng <span class="material-symbols-outlined')
    # Mobile menu
    content = content.replace('uppercase mt-2">Công cụ</div>', 'uppercase mt-2">Tính năng</div>')

    # Fix footer wrapper spacing
    content = content.replace('gap-8 md:gap-12', 'gap-6 md:gap-8')
    content = content.replace('mb-6', 'mb-4')
    
    new_links_section = """<div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex flex-col gap-2 bg-white/5 p-4 rounded-lg border border-white/10 shadow-sm">
            <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b-2 border-accent pb-1 w-fit">Về chúng tôi</p>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/services.html">Dịch vụ</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Tuyển dụng</a>
          </div>
          <div class="flex flex-col gap-2 bg-white/5 p-4 rounded-lg border border-white/10 shadow-sm">
            <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b-2 border-accent pb-1 w-fit">Tính năng</p>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/court-fee-calculator.html">Tính án phí</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/salary-calculator.html">Tính lương</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-chatbot.html">Hỏi đáp AI</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-form-library.html">Biểu mẫu AI</a>
          </div>
          <div class="flex flex-col gap-2 bg-white/5 p-4 rounded-lg border border-white/10 shadow-sm">
            <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b-2 border-accent pb-1 w-fit">Hỗ trợ</p>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/appointment.html">Đặt lịch hẹn</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Chính sách bảo mật</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Điều khoản</a>
          </div>
          <div class="flex flex-col gap-2 bg-white/5 p-4 rounded-lg border border-white/10 shadow-sm">
            <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b-2 border-accent pb-1 w-fit">Liên hệ</p>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Hotline: 09xx.xxx.xxx</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Email: info@ductinlaw.vn</a>
            <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Địa chỉ: TP. Hồ Chí Minh</a>
          </div>
        </div>"""
    
    # Regex to find the whole lg:col-span-8 block and replace it
    pattern = r'<div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=</div\s*>\s*<div class="col-span-1 mt-stack-lg)'
    content = re.sub(pattern, new_links_section, content, flags=re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Update completed successfully.")
