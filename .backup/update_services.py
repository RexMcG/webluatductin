import re

with open('c:/webluat/DemoWebLuat/pages/services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hero section
hero_pattern = r'<!-- Premium Hero Section -->.*?</section>'
hero_replacement = '''<!-- Hero Section -->
<section class="relative w-full bg-cover bg-[center_25%] bg-no-repeat" style="background-image: url('../img/herobanner.png');">
  <div class="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-32 md:py-48 flex items-center justify-end min-h-[500px] md:min-h-[650px]">
    <div class="max-w-3xl space-y-6 md:space-y-8 flex flex-col items-end text-right">
      <div class="rounded-full px-4 py-1.5 bg-white/20 text-[10px] uppercase tracking-[0.2em] font-medium text-white border border-white/30">Tầm nhìn &amp; Sứ mệnh</div>
      <h1 class="font-headline-xl-mobile md:text-[80px] leading-[1.1] text-white tracking-tighter">
        Giải pháp pháp lý <br/> <span class="italic text-accent">toàn diện</span>
      </h1>
      <p class="font-body-md text-xl text-white/90 max-w-2xl leading-relaxed">
        Bảo vệ quyền lợi hợp pháp, kiến tạo giá trị bền vững cho doanh nghiệp và cá nhân thông qua đội ngũ chuyên gia dày dặn kinh nghiệm.
      </p>
    </div>
  </div>
</section>'''

content = re.sub(hero_pattern, hero_replacement, content, flags=re.DOTALL)

# Replace 'Hỏi ngay AI' button styles
# Original: bg-surface-main border border-border-neutral text-primary rounded-full px-6 py-3 hover:bg-surface-alt
# New: bg-accent border-accent text-on-accent rounded-full px-6 py-3 hover:opacity-90

btn_pattern = r'bg-surface-main border border-border-neutral text-primary (rounded-full px-6 py-3) hover:bg-surface-alt'
btn_replacement = r'bg-accent border-accent text-on-accent \1 hover:opacity-90'
content = re.sub(btn_pattern, btn_replacement, content)

# Change the icon color from text-accent to text-on-accent
icon_pattern = r'<span class="material-symbols-outlined text-base text-accent">smart_toy</span>'
icon_replacement = r'<span class="material-symbols-outlined text-base text-on-accent">smart_toy</span>'
content = re.sub(icon_pattern, icon_replacement, content)

with open('c:/webluat/DemoWebLuat/pages/services.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated services.html')
