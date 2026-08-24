import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, appointmentDate, appointmentTime, service, notes, consultType, attorney } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'rexmcg12345678@gmail.com',
        pass: 'pfvykjiufdkurseu',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #641D06; padding: 18px; border-radius: 8px; text-align: center; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; color: #fef08a;">⚖️ THÔNG BÁO ĐẶT LỊCH HẸN TƯ VẤN MỚI</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #fde68a;">Công ty Luật TNHH Đức Tín và Cộng sự</p>
        </div>

        <div style="padding: 20px 0;">
          <p style="font-size: 15px; color: #1e293b;">Kính gửi <strong>Luật sư Phan Đức Tín & Ban Thư ký</strong>,</p>
          <p style="font-size: 14px; color: #475569;">Hệ thống vừa tiếp nhận một yêu cầu đặt lịch hẹn tư vấn mới từ khách hàng qua Website:</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155; width: 35%;">👤 Họ và tên:</td>
              <td style="padding: 10px; color: #0f172a; font-weight: bold;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">📞 Số điện thoại:</td>
              <td style="padding: 10px; color: #047857; font-weight: bold;"><a href="tel:${phone}" style="color: #047857; text-decoration: none;">${phone}</a></td>
            </tr>
            ${email ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">✉️ Email:</td>
              <td style="padding: 10px; color: #0f172a;">${email}</td>
            </tr>` : ''}
            ${consultType ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">🌐 Hình thức:</td>
              <td style="padding: 10px; color: #0f172a;">${consultType === 'offline' ? 'Tư vấn tại Văn phòng' : 'Tư vấn Online từ xa'}</td>
            </tr>` : ''}
            ${service ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">📂 Lĩnh vực / Dịch vụ:</td>
              <td style="padding: 10px; color: #0f172a; font-weight: bold;">${service}</td>
            </tr>` : ''}
            ${attorney ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">👨‍⚖️ Luật sư yêu cầu:</td>
              <td style="padding: 10px; color: #0f172a;">${attorney}</td>
            </tr>` : ''}
            ${appointmentDate ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">📅 Ngày hẹn:</td>
              <td style="padding: 10px; color: #0f172a; font-weight: bold;">${appointmentDate}</td>
            </tr>` : ''}
            ${appointmentTime ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">⏰ Giờ hẹn:</td>
              <td style="padding: 10px; color: #0f172a; font-weight: bold;">${appointmentTime}</td>
            </tr>` : ''}
            ${notes ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #334155;">📝 Ghi chú / Vụ việc:</td>
              <td style="padding: 10px; color: #334155; font-style: italic;">${notes}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 25px; text-align: center;">
            <a href="tel:${phone}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px; margin-right: 10px;">
              📞 Gọi Cho Khách Hàng Ngay
            </a>
            <a href="https://zalo.me/${phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #0284c7; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px;">
              💬 Chat Zalo Khách Hàng
            </a>
          </div>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; text-align: center; font-size: 12px; color: #94a3b8;">
          Email này được gửi tự động từ Website Công ty Luật TNHH Đức Tín và Cộng sự.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"Website Luật Đức Tín" <rexmcg12345678@gmail.com>',
      to: 'rexmcg12345678@gmail.com',
      subject: `🔥 [LỊCH HẸN MỚI] Khách hàng ${name} (${phone}) - Luật Đức Tín`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Error sending appointment email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
