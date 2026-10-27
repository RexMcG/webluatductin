const fs = require('fs');

async function postArticle() {
  console.log('Logging in to live backend...');
  const loginRes = await fetch('https://webluat-backend.onrender.com/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'Ductin@2026!Secured' })
  });
  const loginData = await loginRes.json();
  if (!loginData.accessToken) {
    console.error('Login failed:', loginData);
    process.exit(1);
  }
  const token = loginData.accessToken;
  console.log('Logged in successfully, token received.');

  const articlePayload = {
    title: 'Quy Trình 5 Bước Khởi Kiện Tranh Chấp Đất Đai Tại Tòa Án Nhân Dân Chi Tiết Nhất 2026',
    slug: 'quy-trinh-5-buoc-khoi-kien-tranh-chap-dat-dai-toa-an-2026',
    category: 'Đất đai & Hợp đồng',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Hướng dẫn chuyên sâu toàn bộ quy trình khởi kiện tranh chấp đất đai theo Luật Đất đai 2024 và Bộ luật Tố tụng Dân sự 2015: từ thủ tục hòa giải bắt buộc tại UBND cấp xã, chuẩn bị Đơn khởi kiện chuẩn Mẫu 23-DS, thu thập hợp đồng giao dịch, nộp tạm ứng án phí đến các phiên thẩm định đo vẽ và xét xử tại Tòa án.',
    content: '<p>Tranh chấp đất đai là một trong những dạng tranh chấp dân sự phổ biến và phức tạp nhất hiện nay. Quy trình khởi kiện yêu cầu đương sự phải tuân thủ nghiêm ngặt các quy định về điều kiện tiền khởi kiện, hòa giải bắt buộc và thời hạn tố tụng theo Luật Đất đai 2024 và Bộ luật Tố tụng Dân sự 2015.</p>',
    layoutStyle: 'word-navigation',
    diagramType: 'flowchart',
    flowchart: `Quy trình: 5 Bước Khởi Kiện Tranh Chấp Đất Đai Tại Tòa Án Nhân Dân Chi Tiết Nhất 2026
1. Hòa Giải Bắt Buộc Tại UBND Cấp Xã | Điều kiện tiền khởi kiện bắt buộc theo Điều 236 Luật Đất đai 2024 | Nộp Đơn yêu cầu hòa giải tranh chấp đất đai tại UBND cấp xã/phường, UBND thành lập Hội đồng hòa giải trong thời hạn 30 ngày, Nhận Biên bản hòa giải không thành làm điều kiện nộp đơn khởi kiện Tòa án
2. Xác Định Tòa Án Thẩm Quyền & Soạn Đơn | Thẩm quyền theo lãnh thổ nơi có bất động sản tọa lạc | TAND cấp huyện nơi có đất thụ lý giải quyết sơ thẩm, Soạn thảo Đơn khởi kiện chuẩn Mẫu số 23-DS theo Nghị quyết 01/2017/NQ-HĐTP, Nêu rõ thông tin đương sự và yêu cầu buộc tháo dỡ công trình lấn chiếm
3. Thu Thập Trọn Bộ Chứng Cứ Pháp Lý | Nghĩa vụ chứng minh quyền sử dụng đất theo Điều 91 BLTTDS | Bản chính Đơn khởi kiện & Biên bản hòa giải không thành UBND, Bản sao chứng thực CCCD & Giấy chứng nhận quyền sử dụng đất (Sổ đỏ), Trích lục bản đồ địa chính thửa đất & trích đo ranh giới hiện trạng, Cung cấp Hợp đồng đặt cọc hoặc Hợp đồng chuyển nhượng nhà đất liên quan
4. Nộp Đơn Khởi Kiện & Tạm Ứng Án Phí | Quy trình thụ lý vụ án dân sự theo Điều 191 BLTTDS 2015 | Nộp đơn trực tiếp tại bộ phận Một cửa hoặc qua đường bưu điện TAND, Thẩm phán xem xét hồ sơ và ban hành Thông báo nộp tạm ứng án phí, Nộp tiền tạm ứng án phí tại Chi cục Thi hành án dân sự trong 7 ngày, Nhận Thông báo thụ lý vụ án dân sự chính thức
5. Thẩm Định Tại Chỗ, Hòa Giải & Xét Xử | Quá trình chuẩn bị xét xử kéo dài từ 4 đến 6 tháng | Tòa án phối hợp cơ quan địa chính đo vẽ hiện trạng & định giá đất tranh chấp, Mở phiên họp kiểm tra việc giao nộp công khai chứng cứ và hòa giải tại Tòa, Tòa ra Quyết định công nhận sự thỏa thuận nếu hòa giải thành, Mở Phiên tòa sơ thẩm xét xử công khai và tuyên Bản án dân sự nếu không hòa giải được`,
    sections: [
      {
        id: 'sec-1',
        number: '01',
        title: 'Bước 01: Điều kiện bắt buộc - Thực hiện thủ tục hòa giải tranh chấp đất đai tại UBND cấp xã',
        summary: 'Tranh chấp xác định ai là người có quyền sử dụng đất bắt buộc phải qua hòa giải cơ sở tại UBND cấp xã/phường nơi có đất trước khi nộp đơn khởi kiện ra Tòa án theo Điều 236 Luật Đất đai 2024.',
        content: `<p>Theo quy định tại <strong>Điều 236 Luật Đất đai 2024</strong> (có hiệu lực từ ngày 01/08/2024), Nhà nước khuyến khích các bên tranh chấp đất đai tự hòa giải hoặc giải quyết thông qua hòa giải ở cơ sở. Đối với tranh chấp đất đai mà các bên không hòa giải được nhưng không tự thương lượng được:</p>

<ul>
  <li><strong>Trường hợp bắt buộc hòa giải tại UBND cấp xã:</strong> Tranh chấp xác định ai là người có quyền sử dụng đất (như tranh chấp ranh giới liền kề, tranh chấp quyền sử dụng toàn bộ hoặc một phần thửa đất) <em>bắt buộc phải được hòa giải tại Ủy ban nhân dân cấp xã/phường nơi có đất</em> trước khi khởi kiện ra Tòa án nhân dân.</li>
  <li><strong>Trường hợp không bắt buộc hòa giải tại UBND:</strong> Tranh chấp phát sinh từ giao dịch hợp đồng liên quan đến quyền sử dụng đất (hợp đồng chuyển nhượng, hợp đồng đặt cọc, hợp đồng thuê quyền sử dụng đất) hoặc tranh chấp về thừa kế quyền sử dụng đất thì đương sự được quyền nộp đơn khởi kiện trực tiếp ra Tòa án mà không bắt buộc phải qua hòa giải tại UBND xã.</li>
</ul>

<p>Để bắt đầu thủ tục này, người yêu cầu cần chuẩn bị và nộp <a href="/ai-form-library?formId=10&q=Đơn yêu cầu hòa giải tranh chấp đất đai tại UBND cấp xã/phường&preview=1" class="legal-form-link" target="_blank" rel="noopener noreferrer"><strong>Đơn yêu cầu hòa giải tranh chấp đất đai tại UBND cấp xã/phường</strong></a> gửi trực tiếp hoặc qua đường bưu điện đến Chủ tịch UBND cấp xã nơi tọa lạc thửa đất tranh chấp.</p>

<p><strong>Thời hạn hòa giải:</strong> Trong thời hạn không quá <strong>30 ngày</strong> kể từ ngày nhận được đơn yêu cầu hợp lệ, UBND cấp xã có trách nhiệm thành lập Hội đồng hòa giải và tổ chức phiên hòa giải với sự tham gia của các bên đương sự, cán bộ địa chính và các tổ chức đoàn thể cơ sở.</p>

<p>Kết quả hòa giải phải được lập thành <strong>Biên bản hòa giải</strong>. Nếu hòa giải không thành, UBND sẽ xác nhận và bàn giao Biên bản hòa giải không thành cho các bên. Đây là <em>điều kiện tiền khởi kiện</em> tối quan trọng mà Tòa án sẽ kiểm tra đầu tiên khi tiếp nhận hồ sơ thụ lý vụ án.</p>`
      },
      {
        id: 'sec-2',
        number: '02',
        title: 'Bước 02: Xác định Tòa án có thẩm quyền & Soạn thảo Đơn khởi kiện chuẩn Mẫu số 23-DS',
        summary: 'Xác định đúng Tòa án có thẩm quyền theo lãnh thổ nơi có bất động sản và soạn thảo Đơn khởi kiện theo đúng Mẫu số 23-DS ban hành kèm theo Nghị quyết số 01/2017/NQ-HĐTP của Hội đồng Thẩm phán TANDTC.',
        content: `<p>Sau khi có Biên bản hòa giải không thành tại UBND cấp xã, người khởi kiện cần xác định chính xác cơ quan Tòa án có thẩm quyền xét xử sơ thẩm theo quy định của <strong>Bộ luật Tố tụng Dân sự 2015</strong>:</p>

<ul>
  <li><strong>Thẩm quyền theo loại việc (Điều 26):</strong> Tranh chấp về quyền sử dụng đất và tài sản gắn liền với đất thuộc thẩm quyền giải quyết vụ án dân sự của Tòa án nhân dân.</li>
  <li><strong>Thẩm quyền theo cấp (Điều 35, Điều 37):</strong> Tòa án nhân dân cấp huyện (quận, thị xã, thành phố thuộc tỉnh) nơi có bất động sản giải quyết theo thủ tục sơ thẩm. Nếu vụ án có đương sự hoặc tài sản ở nước ngoài thì thuộc thẩm quyền của Tòa án nhân dân cấp tỉnh.</li>
  <li><strong>Thẩm quyền theo lãnh thổ (Điều 39):</strong> Đối với đối tượng tranh chấp là bất động sản (quyền sử dụng đất, nhà ở), <em>chỉ Tòa án nơi có bất động sản tọa lạc</em> mới có thẩm quyền giải quyết, không phụ thuộc vào nơi cư trú hay nơi làm việc của nguyên đơn hay bị đơn.</li>
</ul>

<p>Về mặt hình thức, đơn khởi kiện không được viết tự do mà bắt buộc phải tuân thủ thể thức chuẩn của Hội đồng Thẩm phán Tòa án nhân dân Tối cao. Bạn cần tải và soạn thảo theo đúng <a href="/ai-form-library?formId=16&q=Đơn khởi kiện vụ án dân sự chuẩn mẫu Nghị quyết số 01/2017/NQ-HĐTP&preview=1" class="legal-form-link" target="_blank" rel="noopener noreferrer"><strong>Đơn khởi kiện vụ án dân sự chuẩn mẫu Nghị quyết số 01/2017/NQ-HĐTP</strong></a> (Mẫu số 23-DS ban hành kèm theo Nghị quyết số 01/2017/NQ-HĐTP).</p>

<p>Trong đơn khởi kiện, người khởi kiện phải trình bày trung thực, mạch lạc: nguồn gốc thửa đất, quá trình sử dụng thực tế, thời điểm phát sinh hành vi lấn chiếm hoặc tranh chấp ranh giới, nội dung yêu cầu Tòa án buộc bị đơn phải tháo dỡ công trình lấn chiếm, trả lại hiện trạng đất hoặc công nhận ranh giới hợp pháp.</p>`
      },
      {
        id: 'sec-3',
        number: '03',
        title: 'Bước 03: Thu thập trọn bộ chứng cứ pháp lý, tài liệu trích đo & Hợp đồng giao dịch',
        summary: 'Thu thập đầy đủ các tài liệu chứng cứ chứng minh quyền sử dụng đất hợp pháp: Giấy chứng nhận (Sổ đỏ), bản đồ trích lục địa chính, hợp đồng đặt cọc hoặc hợp đồng chuyển nhượng liên quan.',
        content: `<p>Theo nguyên tắc tố tụng dân sự tại <strong>Điều 91 Bộ luật Tố tụng Dân sự 2015</strong>, bên nào đưa ra yêu cầu khởi kiện thì bên đó có nghĩa vụ giao nộp tài liệu, chứng cứ để chứng minh cho yêu cầu của mình là có căn cứ và hợp pháp. Một bộ hồ sơ khởi kiện tranh chấp đất đai hoàn chỉnh bao gồm:</p>

<ul>
  <li><strong>Bản chính Đơn khởi kiện</strong> đã ký tên hoặc điểm chỉ hợp lệ;</li>
  <li><strong>Biên bản hòa giải không thành</strong> có đóng dấu xác nhận của UBND cấp xã/phường nơi có đất tranh chấp;</li>
  <li><strong>Bản sao có chứng thực Căn cước công dân gắn chip</strong>, giấy xác nhận nơi cư trú của người khởi kiện;</li>
  <li><strong>Giấy tờ chứng minh quyền sử dụng đất:</strong> Bản sao chứng thực Giấy chứng nhận quyền sử dụng đất (Sổ đỏ / Sổ hồng) hoặc một trong các giấy tờ về quyền sử dụng đất quy định tại Điều 137 Luật Đất đai 2024;</li>
  <li><strong>Tài liệu địa chính:</strong> Bản trích lục bản đồ địa chính thửa đất, trích đo hiện trạng ranh giới đất do cơ quan có thẩm quyền đo đạc lập.</li>
</ul>

<p>Trong các tranh chấp liên quan đến việc một bên bội tín, không chịu tiếp tục công chứng chuyển nhượng hoặc vi phạm thỏa thuận giao dịch nhà đất, người khởi kiện cần cung cấp đầy đủ bản sao chứng thực của <a href="/ai-form-library?formId=8&q=Hợp đồng đặt cọc mua bán, chuyển nhượng nhà đất chuẩn pháp lý&preview=1" class="legal-form-link" target="_blank" rel="noopener noreferrer"><strong>Hợp đồng đặt cọc mua bán, chuyển nhượng nhà đất chuẩn pháp lý</strong></a> hoặc văn bản thỏa thuận <a href="/ai-form-library?formId=7&q=Hợp đồng chuyển nhượng quyền sử dụng đất và tài sản gắn liền với đất&preview=1" class="legal-form-link" target="_blank" rel="noopener noreferrer"><strong>Hợp đồng chuyển nhượng quyền sử dụng đất và tài sản gắn liền với đất</strong></a> cùng các sao kê chuyển khoản ngân hàng để Tòa án làm căn cứ xem xét chế tài phạt cọc hoặc buộc tiếp tục thực hiện hợp đồng.</p>

<p>Nếu trong quá trình chuẩn bị hồ sơ, bạn phát hiện Giấy chứng nhận quyền sử dụng đất bị thất lạc hoặc hư hỏng nặng, bạn có thể thực hiện thủ tục nộp <a href="/ai-form-library?formId=9&q=Đơn đề nghị cấp đổi, cấp lại Giấy chứng nhận quyền sử dụng đất (Sổ đỏ)&preview=1" class="legal-form-link" target="_blank" rel="noopener noreferrer"><strong>Đơn đề nghị cấp đổi, cấp lại Giấy chứng nhận quyền sử dụng đất (Sổ đỏ)</strong></a> tại Chi nhánh Văn phòng Đăng ký đất đai để đảm bảo tính pháp lý nguyên vẹn cho khối tài sản.</p>`
      },
      {
        id: 'sec-4',
        number: '04',
        title: 'Bước 04: Nộp hồ sơ khởi kiện, nộp tiền tạm ứng án phí & Tòa án thụ lý vụ án',
        summary: 'Trình tự gửi đơn khởi kiện đến Tòa án, Thẩm phán xem xét thụ lý trong 8 ngày làm việc và thực hiện nghĩa vụ nộp tạm ứng án phí sơ thẩm tại Chi cục Thi hành án dân sự.',
        content: `<p>Người khởi kiện có thể nộp đơn khởi kiện kèm toàn bộ hồ sơ chứng cứ đến Tòa án nhân dân có thẩm quyền bằng một trong ba phương thức:</p>

<ol>
  <li><strong>Nộp trực tiếp</strong> tại bộ phận tiếp nhận đơn của Tòa án nhân dân (Bộ phận Một cửa);</li>
  <li><strong>Gửi qua dịch vụ bưu chính</strong> bằng hình thức thư bảo đảm có báo phát;</li>
  <li><strong>Gửi trực tuyến</strong> qua Cổng thông tin điện tử của Tòa án (nếu Tòa án nơi khởi kiện đã triển khai tố tụng điện tử).</li>
</ol>

<p>Theo quy định tại <strong>Điều 191 Bộ luật Tố tụng Dân sự 2015</strong>, trong thời hạn <strong>03 ngày làm việc</strong> kể từ ngày nhận được đơn, Chánh án Tòa án phân công một Thẩm phán xem xét đơn. Trong thời hạn <strong>05 ngày làm việc</strong> tiếp theo, Thẩm phán ra một trong các quyết định: yêu cầu sửa đổi bổ sung đơn, chuyển đơn, trả lại đơn hoặc tiến hành thủ tục thụ lý vụ án.</p>

<p><strong>Nộp tiền tạm ứng án phí:</strong> Khi xét thấy vụ án thuộc thẩm quyền và hồ sơ đầy đủ, Thẩm phán sẽ ban hành <em>Thông báo nộp tiền tạm ứng án phí sơ thẩm</em>. Trong thời hạn <strong>07 ngày làm việc</strong> kể từ ngày nhận được thông báo, người khởi kiện phải đến Chi cục Thi hành án dân sự (cùng cấp với Tòa án thụ lý) để nộp tiền tạm ứng án phí và nộp lại Biên lai thu tiền tạm ứng án phí cho Tòa án.</p>

<p>Ngay sau khi nhận được biên lai tạm ứng án phí, Thẩm phán chính thức vào sổ thụ lý vụ án và ban hành <em>Thông báo thụ lý vụ án dân sự</em> gửi cho Viện kiểm sát cùng cấp và các đương sự liên quan trong vòng 03 ngày làm việc.</p>`
      },
      {
        id: 'sec-5',
        number: '05',
        title: 'Bước 05: Quá trình chuẩn bị xét xử, định giá đo đạc hiện trạng, hòa giải tại Tòa & Phiên tòa sơ thẩm',
        summary: 'Giai đoạn Tòa án tiến hành thẩm định tại chỗ, định giá tài sản, tổ chức phiên họp kiểm tra việc giao nộp, tiếp cận chứng cứ và mở phiên tòa xét xử sơ thẩm công khai.',
        content: `<p>Thời hạn chuẩn bị xét xử vụ án tranh chấp đất đai theo quy định tại <strong>Điều 203 Bộ luật Tố tụng Dân sự 2015</strong> thường kéo dài từ <strong>04 đến 06 tháng</strong> (đối với vụ án có tính chất phức tạp hoặc có trở ngại khách quan). Trong giai đoạn này, Thẩm phán được phân công giải quyết sẽ tiến hành các hoạt động tố tụng sau:</p>

<ul>
  <li><strong>Lấy lời khai của các đương sự:</strong> Bị đơn có thời hạn 15 ngày kể từ ngày nhận thông báo thụ lý để nộp văn bản ý kiến phản tố hoặc Bản tự khai;</li>
  <li><strong>Xem xét, thẩm định tại chỗ & Đo vẽ hiện trạng:</strong> Tòa án phối hợp cùng Phòng Tài nguyên Môi trường, Chi nhánh Văn phòng Đăng ký đất đai và UBND cấp xã tiến hành kiểm tra mốc giới, ranh giới thực tế, đo vẽ diện tích đất đang có tranh chấp;</li>
  <li><strong>Định giá tài sản tranh chấp:</strong> Thành lập Hội đồng định giá tài sản theo yêu cầu của đương sự để làm căn cứ tính án phí và xác định giá trị quyền sử dụng đất;</li>
  <li><strong>Mở phiên họp kiểm tra việc giao nộp, tiếp cận, công khai chứng cứ và hòa giải:</strong> Đây là giai đoạn bắt buộc để Thẩm phán công bố công khai toàn bộ chứng cứ thu thập được và tạo điều kiện cho các bên thỏa thuận giải quyết dứt điểm mâu thuẫn.</li>
</ul>

<p><strong>Kết quả giải quyết tại giai đoạn này:</strong></p>
<ul>
  <li>Nếu các bên hòa giải thành: Tòa án lập biên bản hòa giải thành và sau 07 ngày sẽ ra <em>Quyết định công nhận sự thỏa thuận của các đương sự</em>. Quyết định này có hiệu lực pháp luật thi hành ngay và không bị kháng cáo, kháng nghị theo thủ tục phúc thẩm.</li>
  <li>Nếu hòa giải không thành: Thẩm phán ban hành <em>Quyết định đưa vụ án ra xét xử</em> và mở Phiên tòa sơ thẩm công khai trong vòng 01 tháng tiếp theo để Hội đồng xét xử đánh giá toàn diện chứng cứ và tuyên Bản án dân sự bảo vệ quyền lợi hợp pháp cho đương sự có căn cứ.</li>
</ul>

<div class="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
  <p class="text-sm font-bold text-[#641D06] mb-1">⚖️ Lời khuyên từ Luật sư Công ty Luật TNHH Đức Tín & Cộng Sự:</p>
  <p class="text-xs text-slate-700 leading-relaxed">
    Tranh chấp đất đai là dạng tranh chấp có tính chất phức tạp cao, hồ sơ lưu trữ qua nhiều thời kỳ lịch sử và giá trị tài sản rất lớn. Việc chuẩn bị đơn khởi kiện đúng chuẩn mẫu của TANDTC, thu thập đủ chứng cứ nguồn gốc đất và nắm chắc trình tự đo vẽ hiện trạng là chìa khóa then chốt để bảo vệ trọn vẹn quyền sử dụng đất của bạn trước Tòa án.
  </p>
</div>`
      }
    ],
    status: 'published'
  };

  console.log('Sending full update request for article 19...');
  const updateRes = await fetch('https://webluat-backend.onrender.com/api/v1/news/19', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(articlePayload)
  });
  const updateData = await updateRes.json();
  console.log('Update result status:', updateData?.data?.id ? 'SUCCESS' : 'FAILED');
  console.log('Updated sections count:', updateData?.data?.sections?.length);
  console.log('Updated flowchart length:', updateData?.data?.flowchart?.length);
}

postArticle().catch(err => console.error('Error:', err));
