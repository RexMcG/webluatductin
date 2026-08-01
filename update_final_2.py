import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

def center_heading(match):
    full_h2 = match.group(0)
    classes = match.group(1)
    inner_text = match.group(2).strip()
    
    # If it's already centered with the ornament, skip
    if 'text-center' in classes and '— o —' in full_h2:
        return full_h2
        
    # Remove existing bottom borders and margins
    classes = classes.replace('mb-4', '')
    classes = classes.replace('mb-6', '')
    classes = classes.replace('border-b', '')
    classes = classes.replace('border-border-neutral', '')
    classes = classes.replace('pb-4', '')
    classes = classes.replace('mb-stack-lg', '')
    
    classes = re.sub(r'\s+', ' ', classes).strip()
    
    # Ensure uppercase and text-center
    if 'uppercase' not in classes:
        classes += ' uppercase'
    if 'text-center' not in classes:
        classes += ' text-center'
        
    classes += ' mb-2'
    
    return f'''<div class="text-center mb-10 w-full flex flex-col items-center justify-center">
          <h2 class="{classes}">{inner_text}</h2>
          <div class="text-accent flex items-center justify-center mt-1">
            <span class="tracking-widest">— o —</span>
          </div>
        </div>'''

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fonts update - replace specialized fonts with just Inter
    content = content.replace('"Breymont", "\'Playfair Display\'", "serif"', '"Inter", "sans-serif"')
    content = content.replace('"Breymont", "\'Playfair Display\'", "serif"', '"Inter", "sans-serif"') # Catch any variants if needed
    
    # 2. Update Footer
    # Replace the bulky footer columns with a very compact one
    new_footer_links = """<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/services.html">Dịch vụ</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Tuyển dụng</a>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b border-accent pb-1 w-fit uppercase">Tính năng</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/court-fee-calculator.html">Tính án phí</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/salary-calculator.html">Tính lương</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-chatbot.html">Hỏi đáp AI</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-form-library.html">Biểu mẫu AI</a>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b border-accent pb-1 w-fit uppercase">Hỗ trợ</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/appointment.html">Đặt lịch hẹn</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Chính sách bảo mật</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Điều khoản</a>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-2 font-bold border-b border-accent pb-1 w-fit uppercase">Liên hệ</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Hotline: 09xx.xxx.xxx</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Email: info@ductinlaw.vn</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Địa chỉ: TP. Hồ Chí Minh</a>
        </div>
      </div>"""
    
    # Regex to find the whole lg:col-span-8 block and replace it
    pattern = r'<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=\s*</div\s*>\s*</div\s*>\s*<div class="col-span-1 mt-stack-lg|\s*</div\s*>\s*</div\s*>\s*</footer)'
    
    content = re.sub(pattern, new_footer_links, content, flags=re.DOTALL)
    
    # 3. Center Headings (only for index.html)
    if 'index.html' in file_path:
        h2_pattern = r'<h2\s+class="([^"]*text-primary[^"]*)"\s*>([\s\S]*?)</h2>'
        content = re.sub(h2_pattern, center_heading, content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Update completed successfully.")
