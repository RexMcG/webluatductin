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
   \`\`\`;

6. QUY ĐỊNH HẠN MỨC HỎI ĐÁP (RATE LIMIT & CHÍNH SÁCH):
   - Website Hãng luật Đức Tín áp dụng chính sách: **Tối đa 8 lượt hỏi/ngày** cho mỗi người dùng (Quý khách) để hỗ trợ tư vấn định hướng ban đầu.
   - TUYỆT ĐỐI KHÔNG BAO GIỜ được trả lời là "không giới hạn câu hỏi", "hỏi bao nhiêu cũng được", hoặc "không có giới hạn".
   - Khi Quý khách hỏi: "còn bao nhiêu câu", "hỏi được mấy câu nữa", "có bị giới hạn không", "hạn mức thế nào", v.v.:
     + BẮT BUỘC PHẢI khẳng định rõ: Hệ thống có áp dụng chính sách hỗ trợ tối đa 8 lượt hỏi miễn phí/ngày để đảm bảo chất lượng phản hồi chuyên sâu và chống quá tải.
     + Thông báo số lượt còn lại hiện tại của Quý khách (nhắc Quý khách quan sát số lượt hiển thị ngay dưới chân câu hỏi của Quý khách).
     + Nếu có vụ việc phức tạp hoặc khi hết 8 lượt hỏi trong ngày, hướng dẫn Quý khách liên hệ trực tiếp **Luật sư Phan Đức Tín** qua Hotline/Zalo: **093 786 32 63** hoặc Đặt lịch hẹn tư vấn chuyên sâu.`;

const getGeminiKey = () => {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  try {
    return Buffer.from('QVEuQWI4Uk42SndHaGQ5ajQ5ZWJzMkV4U2JDd0FmNFZsdDItZjVuYkYtZmJ6ejlycWh1SHc=', 'base64').toString('utf-8');
  } catch {
    return '';
  }
};

const CANDIDATE_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.7-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-pro-latest',
];

async function callGeminiDirectly(message: string, remainingQuestions: number): Promise<string> {
  const apiKey = getGeminiKey();
  const contents = [
    {
      role: 'user',
      parts: [
        { text: `[HƯỚNG DẪN HỆ THỐNG]:\n${SYSTEM_PROMPT}\n\n[HẠN MỨC HỎI ĐÁP HÔM NAY]: Quý khách hiện còn ${remainingQuestions}/8 lượt hỏi miễn phí trong ngày hôm nay. Nếu Quý khách hỏi còn bao nhiêu câu hoặc hỏi về giới hạn, hãy thông báo rõ con số này và tuyệt đối KHÔNG ĐƯỢC trả lời là không giới hạn.\n\n[CÂU HỎI THÂN CHỦ]:\n${message}` }
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

// ============================================================================
// CHỐNG SPAM & BẢO VỆ TOKEN (RATE LIMITING THEO PHÚT, NGÀY & ĐỘ DÀI)
// ============================================================================
const MAX_PER_MINUTE = 4;        // Tối đa 4 câu hỏi / phút cho mỗi IP
const MAX_PER_DAY = 8;           // Tối đa 8 câu hỏi / ngày cho mỗi IP
const MIN_INTERVAL_MS = 2500;    // Tối thiểu 2.5 giây giữa 2 câu hỏi liên tiếp
const MAX_MESSAGE_LENGTH = 1500; // Giới hạn tối đa 1.500 ký tự mỗi câu hỏi

interface RateLimitRecord {
  lastTime: number;
  minuteCount: number;
  minuteReset: number;
  dayCount: number;
  dayReset: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Dọn dẹp bộ nhớ mỗi 10 phút
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.dayReset) {
        rateLimitMap.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return '127.0.0.1';
}

const LAWYER_CONTACT = {
  name: "Ls. Phan Đức Tín",
  role: "Luật sư Trưởng - Giám đốc Điều hành",
  phone: "093 786 32 63",
  phoneClean: "0937863263",
  zaloUrl: "https://zalo.me/0937863263",
  avatar: "/img/avatar1.webp",
  experience: "Nhiều năm kinh nghiệm tranh tụng & tư vấn pháp lý chuyên sâu",
  firm: "Công ty Luật TNHH Đức Tín & Cộng Sự"
};

const QUICK_ACTIONS = [
  { label: "Đặt Lịch Tư Vấn", action: "appointment", icon: "calendar_month", type: "appointment" },
  { label: "Gọi Hotline Ls. Tín", action: "tel:0937863263", icon: "call", type: "call" },
  { label: "Chat Zalo Luật sư", action: "https://zalo.me/0937863263", icon: "chat", type: "zalo" }
];

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseCookieUsage(req: NextRequest): number {
  try {
    const val = req.cookies.get('dt_daily_count')?.value;
    if (!val) return 0;
    const parsed = JSON.parse(val);
    if (parsed.date === getTodayString() && typeof parsed.count === 'number') {
      return parsed.count;
    }
  } catch {}
  return 0;
}

function withUsageCookie(res: NextResponse, count: number): NextResponse {
  res.cookies.set('dt_daily_count', JSON.stringify({ date: getTodayString(), count }), {
    path: '/',
    maxAge: 86400,
    sameSite: 'lax',
  });
  return res;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Tin nhắn không được để trống' }, { status: 400 });
    }

    const trimmedMsg = message.trim();
    const now = Date.now();
    const clientIp = getClientIp(req);
    const cookieCount = parseCookieUsage(req);

    // 1. Kiểm tra độ dài tin nhắn (chống spam văn bản khổng lồ đốt token)
    if (trimmedMsg.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({
        sessionId: sessionId || Math.floor(now / 1000),
        reply: `Câu hỏi của Quý khách vượt quá giới hạn độ dài cho phép (tối đa **${MAX_MESSAGE_LENGTH} ký tự**). Quý khách vui lòng tóm tắt ngắn gọn các tình tiết mấu chốt, hoặc liên hệ trực tiếp **Luật sư Phan Đức Tín** qua Hotline/Zalo **093 786 32 63** để gửi toàn bộ hồ sơ chi tiết.`,
        lawyer: LAWYER_CONTACT,
        quickActions: QUICK_ACTIONS,
      });
    }

    // 2. Kiểm tra Rate Limit theo IP và Cookie
    let record = rateLimitMap.get(clientIp);
    if (!record) {
      record = {
        lastTime: 0,
        minuteCount: 0,
        minuteReset: now + 60 * 1000,
        dayCount: cookieCount,
        dayReset: now + 24 * 60 * 60 * 1000,
      };
      rateLimitMap.set(clientIp, record);
    } else if (cookieCount > record.dayCount) {
      record.dayCount = cookieCount;
    }

    // Reset chu kỳ phút nếu hết hạn
    if (now > record.minuteReset) {
      record.minuteCount = 0;
      record.minuteReset = now + 60 * 1000;
    }

    // Reset chu kỳ ngày nếu hết hạn
    if (now > record.dayReset) {
      record.dayCount = 0;
      record.dayReset = now + 24 * 60 * 60 * 1000;
    }

    // Chặn gửi quá dồn dập (dưới 2.5 giây)
    if (record.lastTime > 0 && (now - record.lastTime) < MIN_INTERVAL_MS) {
      return withUsageCookie(NextResponse.json({
        sessionId: sessionId || Math.floor(now / 1000),
        reply: 'Quý khách vui lòng đợi giây lát để Trợ lý AI hoàn tất xử lý trước khi gửi câu hỏi tiếp theo.',
        lawyer: LAWYER_CONTACT,
        quickActions: QUICK_ACTIONS,
        remainingQuestions: Math.max(0, MAX_PER_DAY - record.dayCount),
        maxQuestions: MAX_PER_DAY,
      }), record.dayCount);
    }

    // Chặn vượt quá giới hạn theo phút (tối đa 4 câu / phút)
    if (record.minuteCount >= MAX_PER_MINUTE) {
      const waitSeconds = Math.max(1, Math.ceil((record.minuteReset - now) / 1000));
      return withUsageCookie(NextResponse.json({
        sessionId: sessionId || Math.floor(now / 1000),
        reply: `Hệ thống AI đang nhận nhiều yêu cầu. Quý khách vui lòng đợi **${waitSeconds} giây** trước khi đặt câu hỏi tiếp theo để được phục vụ chu đáo nhất, hoặc gọi ngay Hotline **093 786 32 63** để trao đổi trực tiếp với Luật sư.`,
        lawyer: LAWYER_CONTACT,
        quickActions: QUICK_ACTIONS,
        remainingQuestions: Math.max(0, MAX_PER_DAY - record.dayCount),
        maxQuestions: MAX_PER_DAY,
      }), record.dayCount);
    }

    // Chặn vượt quá giới hạn theo ngày (tối đa 8 câu / ngày)
    if (record.dayCount >= MAX_PER_DAY) {
      return withUsageCookie(NextResponse.json({
        sessionId: sessionId || Math.floor(now / 1000),
        reply: `Quý khách đã sử dụng hết hạn mức tư vấn AI miễn phí trong ngày (**${MAX_PER_DAY} câu hỏi/ngày**). Để bảo vệ tối đa quyền lợi và thẩm định hồ sơ chuyên sâu, Quý khách vui lòng liên hệ trực tiếp **Luật sư Phan Đức Tín** qua Hotline/Zalo: **093 786 32 63**.`,
        lawyer: LAWYER_CONTACT,
        quickActions: QUICK_ACTIONS,
        remainingQuestions: 0,
        maxQuestions: MAX_PER_DAY,
      }), record.dayCount);
    }

    // Cập nhật bộ đếm
    record.lastTime = now;
    record.minuteCount++;
    record.dayCount++;

    const remainingQuestions = Math.max(0, MAX_PER_DAY - record.dayCount);

    // 3. Phản hồi nhanh & chuẩn xác nếu Quý khách hỏi về hạn mức / số câu còn lại
    const isAskingAboutLimit = /(bao nhiêu câu|mấy câu|giới hạn.*câu|còn.*lượt|còn.*hỏi.*được|hạn mức.*hỏi|hỏi được bao nhiêu|hỏi bao nhiêu|hết lượt|bao nhiêu lượt|có bị giới hạn|bạn có biết không)/i.test(trimmedMsg);
    if (isAskingAboutLimit) {
      const limitReply = `Kính chào Quý khách,

Về thắc mắc của Quý khách, tôi xin phản hồi như sau:

Trên hệ thống Trợ lý Pháp lý AI của Hãng luật Đức Tín & Cộng Sự, mỗi Quý khách được hỗ trợ **tối đa 8 lượt hỏi miễn phí trong ngày** (áp dụng theo chu kỳ 24 giờ).

Hiện tại, sau câu hỏi này, Quý khách còn **${remainingQuestions}/8 lượt hỏi miễn phí** trong ngày hôm nay (Quý khách cũng có thể dễ dàng theo dõi số lượt đếm lùi ở ngay dưới chân mỗi câu hỏi của mình).

Nếu Quý khách có vụ việc tranh chấp phức tạp, nhiều tài liệu hồ sơ cần nghiên cứu chuyên sâu hoặc muốn trao đổi không giới hạn, Quý khách vui lòng liên hệ trực tiếp **Luật sư Phan Đức Tín** qua:
- **Hotline trực tiếp:** [093 786 32 63](tel:0937863263)
- **Chat Zalo Luật sư:** [093 786 32 63](https://zalo.me/0937863263)
- **Đặt lịch tư vấn:** Điền phiếu hẹn tại nút Đặt lịch tư vấn bên dưới.`;

      return withUsageCookie(NextResponse.json({
        sessionId: sessionId || Math.floor(Date.now() / 1000),
        reply: limitReply,
        lawyer: LAWYER_CONTACT,
        quickActions: QUICK_ACTIONS,
        remainingQuestions,
        maxQuestions: MAX_PER_DAY,
      }), record.dayCount);
    }

    // 4. Gửi tới Backend API nếu khả dụng
    const backendBase = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, '') 
      : 'https://webluat-backend.onrender.com';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const backendRes = await fetch(`${backendBase}/api/v1/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId, remainingQuestions }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        if (backendData && backendData.reply) {
          return withUsageCookie(NextResponse.json({
            ...backendData,
            remainingQuestions,
            maxQuestions: MAX_PER_DAY,
          }), record.dayCount);
        }
      }
    } catch {
      // Backend unavailable or timed out, fallback gracefully to direct Gemini
    }

    // 5. Direct High-Speed Gemini Fallback (Zero-downtime, always answers)
    const reply = await callGeminiDirectly(message.trim(), remainingQuestions);

    return withUsageCookie(NextResponse.json({
      sessionId: sessionId || Math.floor(Date.now() / 1000),
      reply,
      lawyer: LAWYER_CONTACT,
      quickActions: QUICK_ACTIONS,
      remainingQuestions,
      maxQuestions: MAX_PER_DAY,
    }), record.dayCount);
  } catch (error: any) {
    console.error('API chatbot route error:', error);
    return NextResponse.json({
      sessionId: Math.floor(Date.now() / 1000),
      reply: 'Chào Quý khách, tôi là Trợ lý Pháp lý AI của Công ty Luật TNHH Đức Tín & Cộng Sự. Để được tư vấn chi tiết và thẩm định hồ sơ chính xác nhất, Quý khách vui lòng liên hệ trực tiếp Luật sư Phan Đức Tín qua Hotline/Zalo: 093 786 32 63.',
      lawyer: LAWYER_CONTACT,
      quickActions: QUICK_ACTIONS,
      remainingQuestions: 0,
      maxQuestions: MAX_PER_DAY,
    });
  }
}

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req);
  const cookieCount = parseCookieUsage(req);
  const now = Date.now();
  let record = rateLimitMap.get(clientIp);

  const effectiveCount = Math.max(
    cookieCount,
    record && now <= record.dayReset ? record.dayCount : 0
  );

  return NextResponse.json({
    remainingQuestions: Math.max(0, MAX_PER_DAY - effectiveCount),
    maxQuestions: MAX_PER_DAY,
  });
}
