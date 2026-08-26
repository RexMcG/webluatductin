import { FormItem } from "@/services/form-library.service";

/**
 * Generates an official Vietnamese legal Word Document (.doc) and triggers instant download in browser.
 */
export function exportFormToDoc(form: FormItem, leadInfo?: { name: string; phone: string }) {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  // Clean formatting for content paragraphs
  const formattedContent = form.content
    ? form.content
        .split("\n")
        .map((p) => {
          const trimmed = p.trim();
          if (!trimmed) return "<p style='margin-bottom: 12pt;'>&nbsp;</p>";
          if (trimmed.startsWith("Kính gửi:") || trimmed.startsWith("Tên tôi là:") || trimmed.startsWith("Tôi là:")) {
            return `<p style='margin-bottom: 8pt; text-indent: 1.27cm; line-height: 1.5;'><strong>${trimmed}</strong></p>`;
          }
          if (trimmed.startsWith("Điều ") || trimmed.startsWith("Mục ")) {
            return `<p style='margin-top: 14pt; margin-bottom: 6pt; line-height: 1.5;'><strong>${trimmed}</strong></p>`;
          }
          return `<p style='margin-bottom: 8pt; text-indent: 1.27cm; line-height: 1.5; text-align: justify;'>${trimmed}</p>`;
        })
        .join("")
    : `
      <p style='text-indent: 1.27cm; line-height: 1.5;'>Kính gửi: Tòa án nhân dân / Cơ quan có thẩm quyền ................................................................</p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>Tên tôi là: ${leadInfo?.name || "........................................................................"} Sinh năm: ........................</p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>Số CCCD/CMND: ........................................ Cấp ngày: .................... Nơi cấp: ........................................</p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>Địa chỉ thường trú: ........................................................................................................................</p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>Số điện thoại liên hệ: ${leadInfo?.phone || "........................................................................"}</p>
      <p style='text-indent: 1.27cm; line-height: 1.5; margin-top: 14pt;'><strong>NỘI DUNG YÊU CẦU:</strong></p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>................................................................................................................................................................</p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>................................................................................................................................................................</p>
      <p style='text-indent: 1.27cm; line-height: 1.5;'>Kính mong Quý cơ quan xem xét và giải quyết theo đúng quy định của pháp luật.</p>
    `;

  const htmlDoc = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${form.title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: A4;
      margin: 2cm 2cm 2cm 2.5cm;
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13pt;
      line-height: 1.4;
      color: #000000;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24pt;
    }
    .header-table td {
      vertical-align: top;
      text-align: center;
      padding: 0;
    }
    .motto-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 3pt;
    }
    .motto-sub {
      font-size: 12pt;
      font-weight: bold;
      margin-bottom: 4pt;
    }
    .doc-title {
      text-align: center;
      font-size: 16pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 18pt;
      margin-bottom: 18pt;
    }
    .sign-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30pt;
      page-break-inside: avoid;
    }
    .sign-table td {
      vertical-align: top;
      text-align: center;
      font-size: 13pt;
      width: 50%;
    }
    .footer-note {
      margin-top: 40pt;
      font-size: 10pt;
      font-style: italic;
      color: #555555;
      border-top: 1px dashed #cccccc;
      padding-top: 8pt;
      text-align: center;
    }
  </style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td style="width: 40%;">
        ${form.category ? `<div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">LĨNH VỰC: ${form.category}</div>` : ""}
      </td>
      <td style="width: 60%;">
        <div class="motto-title">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div class="motto-sub">Độc lập - Tự do - Hạnh phúc</div>
        <div style="font-size: 10pt; letter-spacing: 2px;">---------o0o---------</div>
        <div style="font-size: 12pt; font-style: italic; margin-top: 8pt;">
          ..., ngày ${day} tháng ${month} năm ${year}
        </div>
      </td>
    </tr>
  </table>

  <div class="doc-title">${form.title}</div>

  <div class="doc-body">
    ${formattedContent}
  </div>

  <table class="sign-table">
    <tr>
      <td>
        <p style="margin-bottom: 4pt;">&nbsp;</p>
        <p style="font-weight: bold; text-transform: uppercase;">XÁC NHẬN CỦA CƠ QUAN / ĐẠI DIỆN</p>
        <p style="font-style: italic; font-size: 11pt;">(Ký, ghi rõ họ tên và đóng dấu)</p>
        <div style="height: 80pt;"></div>
      </td>
      <td>
        <p style="font-style: italic; margin-bottom: 4pt;">Ngày ..... tháng ..... năm 20...</p>
        <p style="font-weight: bold; text-transform: uppercase;">NGƯỜI LÀM ĐƠN / ĐẠI DIỆN</p>
        <p style="font-style: italic; font-size: 11pt;">(Ký và ghi rõ họ tên)</p>
        <div style="height: 80pt;"></div>
        <p style="font-weight: bold;">${leadInfo?.name || ""}</p>
      </td>
    </tr>
  </table>

  <div class="footer-note">
    Biểu mẫu chuẩn hóa và phát hành bởi <strong>Công ty Luật TNHH Đức Tín &amp; Cộng sự</strong> • Hotline: 093 786 32 63 • https://webluatductin.vercel.app
  </div>
</body>
</html>
  `;

  // Create Blob with Word Document MIME
  const blob = new Blob(["\ufeff" + htmlDoc], {
    type: "application/msword;charset=utf-8",
  });

  // Slugify title for clean filename
  const cleanName = form.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const fileName = `Bieu_Mau_${cleanName || "Phap_Ly"}.doc`;

  // Trigger browser download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 300);
}
