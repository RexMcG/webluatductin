import os
import re

html_files = [
    "c:\\webluat\\DemoWebLuat\\index.html",
    "c:\\webluat\\DemoWebLuat\\pages\\ai-chatbot.html",
    "c:\\webluat\\DemoWebLuat\\pages\\ai-form-library.html",
    "c:\\webluat\\DemoWebLuat\\pages\\appointment.html",
    "c:\\webluat\\DemoWebLuat\\pages\\court-fee-calculator.html",
    "c:\\webluat\\DemoWebLuat\\pages\\pit-calculator.html",
    "c:\\webluat\\DemoWebLuat\\pages\\salary-calculator.html",
    "c:\\webluat\\DemoWebLuat\\pages\\services.html"
]

contact_widget_template = """  <!-- Floating Contact Bubbles (Left) -->
  <div class="fixed bottom-margin-mobile left-margin-mobile z-50 flex flex-col gap-3">
    <!-- Booking Bubble -->
    <a class="bg-primary text-on-primary rounded-full h-12 w-12 border border-border-neutral shadow-elegant hover:bg-secondary hover:text-accent transition-all flex items-center justify-center relative group"
      href="{booking_path}">
      <span class="material-symbols-outlined">calendar_month</span>
      <span class="absolute left-full ml-3 bg-secondary text-on-primary text-xs whitespace-nowrap px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">Đặt lịch hẹn</span>
    </a>
    <!-- SMS Bubble -->
    <a class="bg-surface-main text-primary rounded-full h-12 w-12 border border-border-neutral shadow-elegant hover:bg-surface-alt transition-all flex items-center justify-center relative group"
      href="sms:09xxxxxxxx">
      <span class="material-symbols-outlined">sms</span>
      <span class="absolute left-full ml-3 bg-secondary text-on-primary text-xs whitespace-nowrap px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">Gửi SMS</span>
    </a>
    <!-- Zalo Bubble -->
    <a class="bg-[#0068FF] text-white rounded-full h-12 w-12 border border-[#0068FF] shadow-elegant hover:opacity-90 transition-all flex items-center justify-center relative group"
      href="https://zalo.me/09xxxxxxxx" target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" alt="Zalo" class="w-6 h-6 object-contain" />
      <span class="absolute left-full ml-3 bg-secondary text-on-primary text-xs whitespace-nowrap px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">Chat Zalo</span>
    </a>
  </div>
"""

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already injected
    if "<!-- Floating Contact Bubbles (Left) -->" in content:
        continue

    is_index = filepath.endswith("index.html")
    booking_path = "pages/appointment.html" if is_index else "appointment.html"

    widget_code = contact_widget_template.format(booking_path=booking_path)
    
    # Try inserting before Floating AI Widget
    if "<!-- Floating AI Widget -->" in content:
        content = content.replace("<!-- Floating AI Widget -->", widget_code + "\n  <!-- Floating AI Widget -->")
    else:
        # Fallback to before footer
        content = content.replace("<!-- ========== FOOTER ========== -->", widget_code + "\n  <!-- ========== FOOTER ========== -->")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected contact bubbles successfully!")
