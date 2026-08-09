import glob
import re
import os

html_files = glob.glob('c:/webluat/DemoWebLuat/**/*.html', recursive=True)

def center_heading(match):
    inner_text = match.group(2).strip()
    return f'''<div class="text-center mb-10 w-full flex flex-col items-center justify-center">
  <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase text-center mb-2">{inner_text}</h2>
  <div class="text-accent flex items-center justify-center mt-1">
    <span class="tracking-widest">— o —</span>
  </div>
</div>'''

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fonts update - replace specialized fonts with just Inter
    content = content.replace('"Breymont", "\'Playfair Display\'", "serif"', '"Inter", "sans-serif"')
    
    # 2. Rename Công cụ -> Tính năng in header and footer
    content = content.replace('>Công cụ <span class="material-symbols-outlined', '>Tính năng <span class="material-symbols-outlined')
    content = content.replace('uppercase mt-2">Công cụ</div>', 'uppercase mt-2">Tính năng</div>')
    content = content.replace('>Công cụ</p>', '>Tính năng</p>')
    
    # 3. Update Footer to be minimalist
    new_footer_links = """<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
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
    
    # Replace bulky footer
    footer_pattern = r'<div class="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-[^>]+>.*?(?=\s*</div\s*>\s*</div\s*>\s*<div class="col-span-1 mt-stack-lg|\s*</div\s*>\s*</div\s*>\s*</footer)'
    content = re.sub(footer_pattern, new_footer_links, content, flags=re.DOTALL)
    
    # 4. For index.html, inject the lost sections and format headings
    if 'index.html' in os.path.basename(file_path):
        # We need to inject after <!-- Floating Sub-Nav Pill Bar --> ... </div>\n    </div>
        # Let's find the exact insertion point.
        insertion_marker = '        <a class="bg-surface-main text-text-secondary hover:text-primary rounded-full px-6 py-2 font-label-sm text-label-sm transition-colors"\n          href="pages/ai-chatbot.html">Hỏi đáp AI</a>\n      </div>\n    </div>'
        
        # Read the recovered sections
        try:
            with open('recovered_sections.html', 'r', encoding='utf-8') as r_f:
                recovered_html = r_f.read()
            
            # The recovered HTML likely has multiple code blocks, we just need the HTML.
            # Let's write the HTML manually below to avoid parsing errors.
            new_sections = """
    <!-- About Us & Why Choose Us -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-padding">
      <div class="flex flex-col gap-12">
        <!-- About Us -->
        <div>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 border-b border-border-neutral pb-4">Về Chúng Tôi</h2>
          <div class="prose prose-lg text-text-secondary leading-relaxed space-y-4 text-justify">
            <p>
              <strong>Luật sư Phan Đức Tín</strong> là người sáng lập Công ty Luật TNHH Đức Tín và Cộng sự. Hãng luật đã tham gia tư vấn, giải quyết thành công nhiều vụ việc chuyên về các lĩnh vực như: đầu tư, lập dự án và xin giấy chứng nhận đầu tư cho các doanh nhân đến từ Nhật, Hàn Quốc, Mỹ, Singapore, Đức...
            </p>
            <p>
              Tư vấn, soạn thảo hợp đồng mua, bán doanh nghiệp, góp vốn, chuyển nhượng vốn, hợp đồng hợp tác kinh doanh; tham gia giải quyết tranh chấp tại tòa án, trọng tài thương mại.
            </p>
          </div>
        </div>
        
        <!-- Why Choose Us -->
        <div>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4 border-b border-border-neutral pb-4">Tại Sao Lại Chọn Chúng Tôi</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">1. Đội ngũ luật sư vững chuyên môn</h3>
              <p class="text-sm text-text-secondary">Đội ngũ Luật sư của DucTin & Partners năng động, giàu kinh nghiệm, vững chuyên môn, am hiểu về công nghệ, tận tâm và luôn tuân thủ pháp luật, đạo đức nghề nghiệp.</p>
            </div>
            <div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">2. Giải quyết vấn đề triệt để</h3>
              <p class="text-sm text-text-secondary">Giúp giải quyết vấn đề của khách hàng nhanh chóng, hiệu quả với chi phí hợp lý. "Chất lượng dịch vụ là Danh dự của Luật sư".</p>
            </div>
            <div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">3. Đảm bảo bí mật tuyệt đối</h3>
              <p class="text-sm text-text-secondary">Giữ bí mật tuyệt đối thông tin, tài liệu của khách hàng. Chúng tôi cam kết bảo vệ quyền lợi tối đa cho bạn.</p>
            </div>
            <div class="bg-surface-main p-4 border border-border-neutral rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 class="font-bold text-primary mb-2 text-sm uppercase">4. Tư vấn chính xác</h3>
              <p class="text-sm text-text-secondary">Nhận định, đánh giá đúng bản chất vấn đề, đưa ra giải pháp toàn diện và tối ưu nhất cho từng trường hợp cụ thể.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Form & FAQ -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <!-- FAQ Accordion -->
        <div class="bg-[#1a1a1a] p-8 rounded-xl text-white shadow-xl">
          <h2 class="text-[#a37b2c] font-bold text-2xl uppercase mb-1 text-center">CÂU HỎI &amp; TRẢ LỜI</h2>
          <div class="text-gray-400 mb-6 flex items-center justify-center">
            <span class="tracking-widest">— o —</span>
          </div>

          <div class="space-y-4">
            <!-- FAQ 1 -->
            <div class="faq-item shadow-sm">
              <button class="w-full text-left bg-[#4a1208] text-white font-semibold py-3 px-4 flex items-center gap-3 transition-colors">
                <span class="text-[#a37b2c] text-xl font-bold">+</span>
                Luật sư sẽ hỗ trợ tôi như thế nào?
              </button>
              <div class="hidden bg-white text-gray-800 p-4 border-l-4 border-[#a37b2c] text-sm leading-relaxed">
                <p>Luật sư sẽ đồng hành cùng bạn trong mọi giai đoạn của vụ việc, từ việc tư vấn ban đầu, soạn thảo tài liệu đến đại diện bảo vệ quyền lợi hợp pháp tại cơ quan chức năng.</p>
              </div>
            </div>
            
            <!-- FAQ 2 -->
            <div class="faq-item shadow-sm">
              <button class="w-full text-left bg-[#4a1208] text-white font-semibold py-3 px-4 flex items-center gap-3 transition-colors">
                <span class="text-[#a37b2c] text-xl font-bold">+</span>
                Chi phí thuê luật sư là bao nhiêu?
              </button>
              <div class="hidden bg-white text-gray-800 p-4 border-l-4 border-[#a37b2c] text-sm leading-relaxed">
                <p>Chi phí sẽ phụ thuộc vào mức độ phức tạp của từng vụ việc. Chúng tôi luôn cam kết minh bạch về chi phí và sẽ báo giá chi tiết sau khi tư vấn đánh giá hồ sơ ban đầu của bạn.</p>
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="faq-item shadow-sm">
              <button class="w-full text-left bg-[#4a1208] text-white font-semibold py-3 px-4 flex items-center gap-3 transition-colors">
                <span class="text-[#a37b2c] text-xl font-bold">+</span>
                Hồ sơ tôi cung cấp có được bảo mật không?
              </button>
              <div class="hidden bg-white text-gray-800 p-4 border-l-4 border-[#a37b2c] text-sm leading-relaxed">
                <p>Tuyệt đối bảo mật. Theo nguyên tắc đạo đức hành nghề, mọi thông tin và tài liệu khách hàng cung cấp đều được chúng tôi bảo mật nghiêm ngặt và chỉ sử dụng cho mục đích giải quyết vụ việc của bạn.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Consultation Form -->
        <div class="bg-white p-8 rounded-xl shadow-xl border border-gray-100 relative">
          <div class="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full opacity-10 blur-2xl"></div>
          <h2 class="text-3xl font-bold text-[#641d06] mb-2 uppercase">Gửi câu hỏi</h2>
          <p class="text-gray-500 mb-6 text-sm">Gửi thắc mắc của bạn cho luật sư</p>
          
          <form class="space-y-4">
            <div>
              <input type="text" placeholder="Họ và tên..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#a37b2c] focus:ring-1 focus:ring-[#a37b2c] transition-colors">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="tel" placeholder="Số điện thoại..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#a37b2c] focus:ring-1 focus:ring-[#a37b2c] transition-colors">
              <input type="email" placeholder="Email..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#a37b2c] focus:ring-1 focus:ring-[#a37b2c] transition-colors">
            </div>
            <div>
              <textarea placeholder="Nội dung câu hỏi..." rows="4" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#a37b2c] focus:ring-1 focus:ring-[#a37b2c] transition-colors resize-none"></textarea>
            </div>
            <button type="submit" class="w-full bg-[#641d06] text-white font-bold uppercase py-3 rounded hover:bg-[#a37b2c] transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">send</span> Gửi yêu cầu
            </button>
          </form>
        </div>

      </div>
    </section>
"""
            
            # Inject it if not already present
            if 'Về Chúng Tôi' not in content:
                content = content.replace(insertion_marker, insertion_marker + '\n' + new_sections)

        except Exception as e:
            print("Failed to inject HTML:", e)
        
        # Center ALL headings:
        # Match <h2 class="... text-primary ...">Text</h2>
        h2_pattern = r'<h2\s+class="([^"]*text-primary[^"]*)"\s*>([^<]+)</h2>'
        content = re.sub(h2_pattern, center_heading, content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Final reconstruction complete!")
