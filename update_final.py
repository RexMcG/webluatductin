import glob
import re

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

# Function to center headings in index.html
def center_heading(match):
    full_h2 = match.group(0)
    inner_text = match.group(2)
    classes = match.group(1)
    
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
        
    classes += ' mb-1'
    
    return f'''<div class="text-center mb-8">
          <h2 class="{classes}">{inner_text}</h2>
          <div class="text-accent flex items-center justify-center">
            <span class="tracking-widest">— o —</span>
          </div>
        </div>'''

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fonts update
    content = content.replace('"Breymont", "\'Playfair Display\'", "serif"', '"Inter", "sans-serif"')
    
    # 2. Compact Footer Update
    new_footer_links = """<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-3 font-bold border-b border-accent pb-1 w-fit uppercase">Về chúng tôi</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/services.html">Dịch vụ</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Đội ngũ</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Tuyển dụng</a>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-3 font-bold border-b border-accent pb-1 w-fit uppercase">Tính năng</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/court-fee-calculator.html">Tính án phí</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/salary-calculator.html">Tính lương</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-chatbot.html">Hỏi đáp AI</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/ai-form-library.html">Biểu mẫu AI</a>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-3 font-bold border-b border-accent pb-1 w-fit uppercase">Hỗ trợ</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="pages/appointment.html">Đặt lịch hẹn</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Chính sách bảo mật</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Điều khoản</a>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-label-sm text-label-sm text-on-primary mb-3 font-bold border-b border-accent pb-1 w-fit uppercase">Liên hệ</p>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Hotline: 09xx.xxx.xxx</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Email: info@ductinlaw.vn</a>
          <a class="font-label-sm text-label-sm text-surface-alt hover:text-accent transition-colors" href="#">Địa chỉ: TP. Hồ Chí Minh</a>
        </div>
      </div>"""
    
    # We replace from `<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-gutter">`
    # up to `</div>\n      </div>\n      <div class="col-span-1 mt-stack-lg`
    # or similar structure at the end of the footer links grid.
    pattern = r'<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=\s*</div\s*>\s*</div\s*>\s*<div class="col-span-1 mt-stack-lg)'
    
    content = re.sub(pattern, new_footer_links, content, flags=re.DOTALL)
    
    # 3. Center Headings (only for index.html)
    if 'index.html' in file_path:
        # Match section headings: <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary ...">Text</h2>
        h2_pattern = r'<h2\s+class="([^"]*font-headline-lg-mobile[^"]*text-primary[^"]*)"\s*>([^<]+)</h2>'
        content = re.sub(h2_pattern, center_heading, content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Update completed successfully.")
