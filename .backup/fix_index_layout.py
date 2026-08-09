import re

with open('c:/webluat/DemoWebLuat/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add the missing 2 items to "Tại Sao Lại Chọn Chúng Tôi"
why_choose_us_replacement = """<div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">4. Tư vấn chính xác</h3>
              <p class="text-sm text-text-secondary">Nhận định, đánh giá đúng bản chất vấn đề, đưa ra giải pháp toàn diện và tối ưu nhất cho từng trường hợp cụ thể.</p>
            </div>
            <div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">5. Chi phí hợp lý</h3>
              <p class="text-sm text-text-secondary">Cung cấp dịch vụ pháp lý với mức chi phí hợp lý, rõ ràng và minh bạch, phù hợp với tính chất của từng vụ việc.</p>
            </div>
            <div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">6. Tận tâm, chuyên nghiệp</h3>
              <p class="text-sm text-text-secondary">Luôn đặt quyền lợi của khách hàng lên hàng đầu, chăm sóc và hỗ trợ tận tâm trong mọi giai đoạn của vụ việc.</p>
            </div>"""

content = content.replace(
    """<div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">4. Tư vấn chính xác</h3>
              <p class="text-sm text-text-secondary">Nhận định, đánh giá đúng bản chất vấn đề, đưa ra giải pháp toàn diện và tối ưu nhất cho từng trường hợp cụ thể.</p>
            </div>""",
    why_choose_us_replacement
)

# 2. Move "Consultation Form & FAQ" to the correct position (Above Expert Attorneys)
# First, extract the FAQ section block
faq_pattern = r'\s*<!-- Consultation Form & FAQ -->[\s\S]*?</section>\s*'
faq_match = re.search(faq_pattern, content)
if faq_match:
    faq_html = faq_match.group(0)
    # Remove it from the current position
    content = content.replace(faq_html, '\n\n')
    
    # Inject it above Expert Attorneys
    expert_pattern = r'(\s*<!-- Expert Attorneys -->)'
    content = re.sub(expert_pattern, faq_html + r'\1', content, count=1)


with open('c:/webluat/DemoWebLuat/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html layout and added missing items.")
