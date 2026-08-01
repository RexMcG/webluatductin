import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Header Links: uppercase and slightly larger (text-[15px] or text-base)
    # The header links typically look like:
    # <a class="nav-link font-label-md text-label-md text-text-secondary hover:text-primary transition-colors" href="index.html">Trang chủ</a>
    
    # We will find all header links and add uppercase and text-base.
    # To do this safely, we will replace `nav-link font-label-md text-label-md` with `nav-link font-label-md text-base uppercase font-semibold`.
    content = content.replace('nav-link font-label-md text-label-md', 'nav-link font-label-md text-base uppercase font-semibold')
    # If they are just `text-text-secondary hover:text-primary` inside nav:
    # Let's replace the pill nav items if needed. The Pill Nav has:
    # <a class="bg-surface-main text-text-secondary hover:text-primary rounded-full px-6 py-2 font-label-sm text-label-sm transition-colors"
    content = content.replace('font-label-sm text-label-sm transition-colors"', 'font-label-sm text-sm uppercase transition-colors font-semibold"')

    # 2. Make Footer 50% smaller padding, but text larger.
    # From py-8 to py-4.
    content = content.replace('max-w-container-max mx-auto px-margin-desktop py-8 md:grid-cols-12', 'max-w-container-max mx-auto px-margin-desktop py-4 md:grid-cols-12')
    
    # Update the footer block
    new_footer_links = """<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
          <p class="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="pages/services.html">Dịch vụ</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Tuyển dụng</a>
        </div>
        <div class="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
          <p class="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Tính năng</p>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="pages/court-fee-calculator.html">Tính án phí</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="pages/salary-calculator.html">Tính lương</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-chatbot.html">Hỏi đáp AI</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-form-library.html">Biểu mẫu AI</a>
        </div>
        <div class="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
          <p class="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Hỗ trợ</p>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="pages/appointment.html">Đặt lịch hẹn</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Chính sách bảo mật</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Điều khoản</a>
        </div>
        <div class="flex flex-col gap-1 bg-white/5 border border-white/10 rounded p-2">
          <p class="text-base text-on-primary mb-1 font-bold border-b border-accent pb-1 w-fit uppercase">Liên hệ</p>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Hotline: 09xx.xxx.xxx</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Email: info@ductinlaw.vn</a>
          <a class="text-sm text-surface-alt hover:text-accent transition-colors" href="#">Địa chỉ: TP. Hồ Chí Minh</a>
        </div>
      </div>"""
      
    pattern = r'<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=\s*</div\s*>\s*</div\s*>\s*<div class="col-span-1 mt-[^>]+|\s*</div\s*>\s*</div\s*>\s*</footer)'
    content = re.sub(pattern, new_footer_links, content, flags=re.DOTALL)
    
    # 3. "Tại sao chọn chúng tôi" increase font size
    if 'index.html' in file_path:
        content = content.replace('<h3 class="font-bold text-primary mb-2 text-sm uppercase">', '<h3 class="font-bold text-primary mb-2 text-base md:text-lg uppercase">')
        content = content.replace('<p class="text-sm text-text-secondary">', '<p class="text-base md:text-lg text-text-secondary leading-relaxed">')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated header, footer, and why choose us text.")
