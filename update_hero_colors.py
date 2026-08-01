import re

with open('c:/webluat/DemoWebLuat/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace H1
h1_pattern = r'<h1[^>]*>.*?Công Ty Luật Đức Tín\s*&amp;\s*Partners.*?</h1>'
new_h1 = '''<h1 class="font-headline-xl-mobile text-[40px] leading-[1.2] md:font-headline-xl md:text-[64px] md:leading-[1.1]">
            <span class="text-primary">Công Ty Luật Đức Tín</span> <span class="text-accent">&amp; Partners</span>
          </h1>'''
content = re.sub(h1_pattern, new_h1, content, flags=re.DOTALL)

# Replace Subtitle
p_pattern = r'<p class="font-body-md text-body-md text-white/90">.*?Đội ngũ luật sư giàu kinh nghiệm.*?nhân và doanh nghiệp.*?</p>'
new_p = '''<p class="font-body-md text-body-md text-primary font-semibold">
            Đội ngũ luật sư giàu kinh nghiệm, kết hợp công nghệ AI tiên tiến, mang đến giải pháp pháp lý tối ưu cho cá nhân và doanh nghiệp.
          </p>'''
content = re.sub(p_pattern, new_p, content, flags=re.DOTALL)

# Replace Search Box
search_pattern = r'<div class="mt-8 relative shadow-lg">\s*<input\s*class="[^"]*"\s*id="hero-search"[^>]*>\s*<span\s*class="[^"]*"\s*id="hero-search-btn">search</span>\s*</div>'
new_search = '''<div class="mt-8 relative shadow-lg">
            <input
              class="w-full h-14 pl-4 pr-12 border border-primary rounded focus:ring-2 focus:ring-primary bg-white text-text-primary placeholder:text-text-secondary outline-none"
              id="hero-search" placeholder="Bạn đang gặp vướng mắc pháp lý gì?" type="text" />
            <span
              class="material-symbols-outlined absolute right-4 top-4 text-primary cursor-pointer hover:opacity-80"
              id="hero-search-btn">search</span>
          </div>'''
content = re.sub(search_pattern, new_search, content, flags=re.DOTALL)

# Replace Buttons
buttons_pattern = r'<div class="flex flex-wrap gap-4 mt-8">\s*<a class="bg-white text-primary[^"]*"[^>]*>Đặt Lịch Hẹn</a>\s*<a class="bg-accent text-on-accent[^"]*"[^>]*>Tư Vấn AI 24/7</a>\s*</div>'
new_buttons = '''<div class="flex flex-wrap gap-4 mt-8">
            <a class="bg-primary text-white h-12 px-6 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center shadow-lg"
              href="pages/appointment.html">Đặt Lịch Hẹn</a>
            <a class="bg-accent text-white h-12 px-6 rounded font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center shadow-lg"
              href="pages/ai-chatbot.html">Tư Vấn AI 24/7</a>
          </div>'''
content = re.sub(buttons_pattern, new_buttons, content, flags=re.DOTALL)

with open('c:/webluat/DemoWebLuat/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated hero section styles.")
