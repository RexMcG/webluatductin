import glob
import re
import os

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_footer_links = """<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-lg p-4">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/services.html">Dịch vụ</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Tuyển dụng</a>
        </div>
        <div class="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-lg p-4">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Tính năng</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/court-fee-calculator.html">Tính án phí</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/salary-calculator.html">Tính lương</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/ai-chatbot.html">Hỏi đáp AI</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/ai-form-library.html">Biểu mẫu AI</a>
        </div>
        <div class="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-lg p-4">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Hỗ trợ</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="pages/appointment.html">Đặt lịch hẹn</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Chính sách bảo mật</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Điều khoản</a>
        </div>
        <div class="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-lg p-4">
          <p class="text-xs text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Liên hệ</p>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Hotline: 09xx.xxx.xxx</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Email: info@ductinlaw.vn</a>
          <a class="text-xs text-surface-alt hover:text-accent transition-colors" href="#">Địa chỉ: TP. Hồ Chí Minh</a>
        </div>
      </div>"""
    
    pattern = r'<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=\s*</div\s*>\s*</div\s*>\s*<div class="col-span-1 mt-[^>]+|\s*</div\s*>\s*</div\s*>\s*</footer)'
    content = re.sub(pattern, new_footer_links, content, flags=re.DOTALL)
    
    # 2. Increase the prose size for "Về Chúng Tôi"
    if 'index.html' in os.path.basename(file_path):
        content = content.replace('<div class="prose prose-lg text-text-secondary leading-relaxed space-y-4 text-justify">', '<div class="prose prose-xl md:prose-2xl text-text-secondary leading-relaxed space-y-4 text-justify text-lg md:text-xl">')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
