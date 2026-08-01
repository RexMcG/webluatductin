import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

# We want to make the footer extremely compact.
compact_footer_links = """<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex flex-col gap-1">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/services.html">Dịch vụ</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Tuyển dụng</a>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Tính năng</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/court-fee-calculator.html">Tính án phí</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/salary-calculator.html">Tính lương</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/ai-chatbot.html">Hỏi đáp AI</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/ai-form-library.html">Biểu mẫu AI</a>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Hỗ trợ</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/appointment.html">Đặt lịch hẹn</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Chính sách bảo mật</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Điều khoản</a>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Liên hệ</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Hotline: 09xx.xxx.xxx</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Email: info@ductinlaw.vn</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Địa chỉ: TP. Hồ Chí Minh</a>
        </div>
      </div>"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Reduce overall footer padding
    content = content.replace(
        '<footer class="bg-primary border-t border-border-neutral w-full">\n    <div\n      class="grid grid-cols-1 gap-gutter max-w-container-max mx-auto px-margin-desktop py-section-padding md:grid-cols-12">',
        '<footer class="bg-primary border-t border-border-neutral w-full">\n    <div\n      class="grid grid-cols-1 gap-4 max-w-container-max mx-auto px-margin-desktop py-8 md:grid-cols-12">'
    )
    
    # Also replace it if it's formatted slightly differently
    content = content.replace('py-section-padding', 'py-8')
    content = content.replace('mb-stack-lg', 'mb-4')
    content = content.replace('mt-stack-lg', 'mt-4')
    content = content.replace('pt-stack-md', 'pt-4')
    
    # Replace the links part
    pattern = r'<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=\s*</div\s*>\s*</div\s*>\s*<div class="col-span-1 mt-[^>]+|\s*</div\s*>\s*</div\s*>\s*</footer)'
    content = re.sub(pattern, compact_footer_links, content, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Footer compacted.")
