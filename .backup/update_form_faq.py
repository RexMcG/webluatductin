import re

with open('c:/webluat/DemoWebLuat/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_form_and_faq = """<!-- Consultation Form & FAQ -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <!-- Consultation Form (Left) -->
        <div class="bg-[#c29837] p-8 md:p-12 text-white h-full flex flex-col justify-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 uppercase leading-snug">ĐẶT CÂU HỎI VỚI ĐỘI NGŨ LUẬT SƯ CỦA CHÚNG TÔI</h2>
          <p class="mb-8 text-lg">Điền vào thông tin bên dưới đây</p>
          
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Họ và tên" class="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm">
              <input type="email" placeholder="Địa chỉ Email" class="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="tel" placeholder="Điện thoại" class="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm">
              <div class="relative">
                <select class="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm appearance-none text-sm cursor-pointer">
                  <option value="" disabled selected>Lĩnh vực</option>
                  <option value="1">Dân sự</option>
                  <option value="2">Hình sự</option>
                  <option value="3">Doanh nghiệp</option>
                  <option value="4">Đất đai</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div>
              <input type="text" placeholder="Tiêu đề" class="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm text-sm">
            </div>
            <div>
              <textarea placeholder="Mô tả về vấn đề của bạn" rows="6" class="w-full px-4 py-4 bg-white text-gray-800 border-none focus:outline-none shadow-sm resize-none text-sm"></textarea>
            </div>
            <button type="submit" class="bg-white text-[#c29837] font-bold uppercase px-8 py-3 hover:bg-gray-100 transition-colors shadow-sm text-sm">
              GỬI
            </button>
          </form>
        </div>

        <!-- FAQ Accordion (Right) -->
        <div class="p-4 md:p-8">
          <h2 class="text-[#c29837] font-bold text-3xl uppercase mb-2">CÂU HỎI &amp; TRẢ LỜI</h2>
          <div class="text-[#c29837] mb-8 flex items-center">
            <span class="tracking-widest">— o —</span>
          </div>

          <div class="space-y-6">
            <!-- FAQ 1 (Expanded) -->
            <div class="faq-item">
              <button class="w-full text-left bg-[#641d06] text-white font-semibold py-4 px-6 flex items-center gap-4 transition-colors">
                <span class="text-white text-xl font-bold">+</span>
                Khi giấy chứng nhận quyền sử dụng đất hết thời hạn
              </button>
              <div class="bg-white text-gray-600 p-6 text-sm leading-relaxed border border-gray-100 shadow-sm">
                <p class="mb-4">Thắc mắc của bạn tôi xin đưa ra ý kiến giải đáp như sau:</p>
                <p class="mb-4">Về thời hạn sử dụng đất, căn cứ quy định tại Điều 126 Luật đất đai 2013:</p>
                <p class="mb-4">1. Thời hạn giao đất, công nhận quyền sử dụng đất nông nghiệp đối với hộ gia đình, cá nhân trực tiếp sản xuất nông nghiệp theo quy định tại khoản 1, khoản 2, điểm b khoản 3, khoản 4 và khoản 5 Điều 129 của Luật này là 50 năm. Khi hết thời hạn, hộ gia đình, cá nhân trực tiếp sản xuất nông nghiệp nếu có nhu cầu thì được tiếp tục sử dụng đất...</p>
                <a href="#" class="text-blue-500 hover:underline">Xem thêm</a>
              </div>
            </div>
            
            <!-- FAQ 2 (Collapsed) -->
            <div class="faq-item">
              <button class="w-full text-left bg-gray-50 text-gray-700 font-semibold py-4 px-6 flex items-center gap-4 transition-colors hover:bg-gray-100">
                <span class="text-gray-500 text-xl font-bold">+</span>
                Chế độ thai sản
              </button>
              <div class="hidden bg-white text-gray-600 p-6 text-sm leading-relaxed border border-gray-100 shadow-sm">
                <p>Nội dung tư vấn về chế độ thai sản theo quy định mới nhất.</p>
              </div>
            </div>

          </div>
          
          <div class="mt-8">
            <a href="#" class="inline-block bg-[#c29837] text-white font-bold uppercase px-8 py-3 hover:bg-[#a37b2c] transition-colors shadow-sm text-sm">
              XEM TẤT CẢ
            </a>
          </div>
        </div>

      </div>
    </section>"""

# Find the existing Consultation Form & FAQ section
# It currently has: <section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 my-8">
#   <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
#     ...
#   </div>
# </section>
pattern = r'\s*<!-- Consultation Form & FAQ -->[\s\S]*?</section>\s*'
content = re.sub(pattern, '\n' + new_form_and_faq + '\n', content, count=1)

with open('c:/webluat/DemoWebLuat/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Form and FAQ layout.")
