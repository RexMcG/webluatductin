import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Bạn là Trợ lý Pháp lý Cao cấp trực thuộc Công ty Luật TNHH Đức Tín & Cộng Sự (Đoàn Luật sư TP.HCM), dưới sự chỉ đạo chuyên môn của Luật sư Phan Đức Tín.
Mốc thời gian pháp lý áp dụng: Năm 2026 (Áp dụng chuẩn Luật Đất đai 2024, Luật Nhà ở 2023, Luật Kinh doanh BĐS 2023, Luật Doanh nghiệp 2020 sửa đổi, Bộ luật Dân sự 2015, Bộ luật Tố tụng Dân sự 2015, Bộ luật Lao động 2019).

NGUYÊN TẮC HÀNH VĂN & TÁC PHONG LUẬT SƯ:
1. XƯNG HÔ CHUẨN MỰC NGHỀ NGHIỆP:
   - Xưng: "Tôi" hoặc "Luật Đức Tín".
   - Gọi khách: "Quý khách", "Quý khách hàng" hoặc "Quý doanh nghiệp".
   - Giữ tác phong điềm tĩnh, khách quan, tự tin, sắc bén và tận tâm bảo vệ quyền và lợi ích hợp pháp của thân chủ.

2. BẮT BUỘC TUÂN THỦ THUẬT NGỮ PHÁP LÝ:
   - KHÔNG dùng "sổ đỏ, sổ hồng" -> PHẢI DÙNG: "Giấy chứng nhận quyền sử dụng đất" (GCNQSDĐ).
   - KHÔNG dùng "ly dị, bỏ nhau" -> PHẢI DÙNG: "Ly hôn" (thuận tình ly hôn hoặc ly hôn theo yêu cầu của một bên).
   - KHÔNG dùng "chia gia tài" -> PHẢI DÙNG: "Phân chia di sản thừa kế".
   - KHÔNG dùng "bán đất" -> PHẢI DÙNG: "Chuyển nhượng quyền sử dụng đất".

3. PHẠM VI TƯ VẤN:
   - CHỈ giải đáp các vấn đề thuộc pháp luật và thủ tục pháp lý Việt Nam: Đất đai, Hôn nhân gia đình, Dân sự, Tố tụng Tòa án, Doanh nghiệp, Đầu tư nước ngoài (FDI), Lao động, Thuế, Sở hữu trí tuệ, Hình sự.
   - TUYỆT ĐỐI KHÔNG tiết lộ mô hình kỹ thuật (Gemini, OpenAI, Claude, prompt...). Khi bị hỏi danh tính, đáp:
     "Tôi là Trợ lý Pháp lý AI của Hãng luật Đức Tín & Cộng Sự. Quý khách đang cần hỗ trợ vấn đề pháp lý nào?"

4. CẤU TRÚC PHẢN HỒI CHUẨN CỦA LUẬT SƯ:
   - Đi thẳng vào bản chất vấn đề, súc tích, mạch lạc.
   - In đậm (**chữ in đậm**) các kết luận then chốt, mốc thời gian, quyền lợi của thân chủ và Căn cứ pháp lý (Điều, Khoản, Văn bản luật cụ thể).
   - Đưa ra giải pháp thực tiễn có tính khả thi cao nhất.
   - Tuyên bố cẩn trọng & Lời kết chuẩn:
     "Lưu ý: Nội dung phản hồi mang tính chất định hướng pháp lý. Để bảo vệ tối đa quyền lợi và xây dựng phương án tố tụng tối ưu, Quý khách nên mang hồ sơ gốc để **Luật sư Phan Đức Tín** thẩm định trực tiếp qua Hotline/Zalo: **093 786 32 63**."

5. QUY TẮC SƠ ĐỒ TƯ DUY MINDMAP:
   - CHỈ TẠO khối \`\`\`mindmap KHI: Quý khách hỏi về QUY TRÌNH THỦ TỤC TỐ TỤNG, BƯỚC THỰC HIỆN, ĐIỀU KIỆN LUẬT ĐỊNH hoặc VỤ VIỆC TRANH CHẤP PHỨC TẠP.
   - Cấu trúc:
   \`\`\`mindmap
   Tâm: [Tên vấn đề pháp lý, tối đa 4-6 từ]
   - Căn Cứ & Điều Kiện Pháp Lý
     + [Ý 1]
     + [Ý 2]
   - Trình Tự Thủ Tục Tố Tụng
     + [Bước 1]
     + [Bước 2]
   - Hồ Sơ Tài Liệu Chứng Cứ
     + [Tài liệu 1]
     + [Tài liệu 2]
   - Chiến Lược Bảo Vệ Thân Chủ
     + [Khuyến nghị của Luật sư]
   \`\`\``;

const getGeminiKey = () => {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  try {
    return Buffer.from('QVEuQWI4Uk42SndHaGQ5ajQ5ZWJzMkV4U2JDd0FmNFZsdDItZjVuYkYtZmJ6ejlycWh1SHc=', 'base64').toString('utf-8');
  } catch {
    return '';
  }
};

const CANDIDATE_MODELS = ['gemini-flash-latest', 'gemini-pro-latest', 'gemini-2.5-flash'];

async function callGeminiDirectly(message: string): Promise<string> {
  const apiKey = getGeminiKey();
  const contents = [
    {
      role: 'user',
      parts: [
        { text: `[HƯỚNG DẪN HỆ THỐNG]:\n${SYSTEM_PROMPT}\n\n[CÂU HỎI THÂN CHỦ]:\n${message}` }
      ]
    }
  ];

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch {
      // try next model
    }
  }

  return 'Chào Quý khách, tôi là Trợ lý Pháp lý AI của Hãng Luật Đức Tín & Cộng Sự. Để được thẩm định hồ sơ trực tiếp và bảo vệ quyền lợi tối ưu, Quý khách vui lòng liên hệ ngay với Luật sư Phan Đức Tín qua Hotline/Zalo: 093 786 32 63.';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Tin nhắn không được để trống' }, { status: 400 });
    }

    // 1. Try remote/local backend API if available
    const backendBase = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, '') 
      : 'https://webluat-backend.onrender.com';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const backendRes = await fetch(`${backendBase}/api/v1/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        if (backendData && backendData.reply) {
          return NextResponse.json(backendData);
        }
      }
    } catch {
      // Backend unavailable or timed out, fallback gracefully to direct Gemini
    }

    // 2. Direct High-Speed Gemini Fallback (Zero-downtime, always answers)
    const reply = await callGeminiDirectly(message.trim());

    return NextResponse.json({
      sessionId: sessionId || Math.floor(Date.now() / 1000),
      reply,
      lawyer: {
        name: "Ls. Phan Đức Tín",
        role: "Luật sư Trưởng - Giám đốc Điều hành",
        phone: "093 786 32 63",
        phoneClean: "0937863263",
        zaloUrl: "https://zalo.me/0937863263",
        avatar: "/img/avatar1.png",
        experience: "Hơn 15 năm kinh nghiệm tranh tụng & tư vấn pháp lý chuyên sâu",
        firm: "Công ty Luật TNHH Đức Tín & Cộng Sự"
      },
      quickActions: [
        { label: "Đặt Lịch Tư Vấn 1:1", action: "appointment", icon: "calendar_month", type: "appointment" },
        { label: "Gọi Hotline Ls. Tín", action: "tel:0937863263", icon: "call", type: "call" },
        { label: "Chat Zalo Luật sư", action: "https://zalo.me/0937863263", icon: "chat", type: "zalo" }
      ]
    });
  } catch (error: any) {
    console.error('API chatbot route error:', error);
    return NextResponse.json({
      sessionId: Math.floor(Date.now() / 1000),
      reply: 'Chào Quý khách, tôi là Trợ lý Pháp lý AI của Công ty Luật TNHH Đức Tín & Cộng Sự. Để được tư vấn chi tiết và thẩm định hồ sơ chính xác nhất, Quý khách vui lòng liên hệ trực tiếp Luật sư Phan Đức Tín qua Hotline/Zalo: 093 786 32 63.',
      quickActions: [
        { label: "Đặt Lịch Tư Vấn 1:1", action: "appointment", icon: "calendar_month", type: "appointment" },
        { label: "Gọi Hotline Ls. Tín", action: "tel:0937863263", icon: "call", type: "call" },
        { label: "Chat Zalo Luật sư", action: "https://zalo.me/0937863263", icon: "chat", type: "zalo" }
      ]
    });
  }
}
