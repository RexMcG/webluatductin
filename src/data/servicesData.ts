export interface ServiceDetail {
  slug: string;
  title: string;
  category: string;
  badge: string;
  heroDesc: string;
  about: {
    overview: string[];
    keyHighlights: { title: string; desc: string; icon: string }[];
    scopes: { title: string; items: string[] }[];
    workflow: { step: string; title: string; desc: string }[];
  };
  experience: {
    title: string;
    clientType: string;
    result: string;
    year: string;
    summary: string;
  }[];
  articles: {
    slug: string;
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
  }[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  // 1. NỘI BỘ DOANH NGHIỆP
  "hop-tac-doanh-nghiep": {
    slug: "hop-tac-doanh-nghiep",
    title: "NỘI BỘ DOANH NGHIỆP",
    category: "Doanh nghiệp",
    badge: "Cố Vấn Toàn Diện",
    heroDesc: "Tư vấn Luật thường xuyên, quản trị doanh nghiệp, xây dựng điều lệ và quy chế nội bộ, soạn thảo và rà soát hợp đồng kinh tế, giải quyết tranh chấp nội bộ và kinh doanh thương mại.",
    about: {
      overview: [
        "Việc hiểu rõ cả khuôn khổ pháp lý doanh nghiệp và thực tiễn thương mại ở Việt Nam cho phép các luật sư của Đức Tín & Cộng sự đưa ra lời khuyên thiết thực, sát sườn với từng mô hình hoạt động kinh doanh, gia tăng tối đa giá trị cho doanh nghiệp trong mọi giai đoạn phát triển.",
        "Không chỉ tập trung vào các giao dịch mua bán, sáp nhập hay huy động vốn, chúng tôi còn đồng hành cùng khách hàng trong toàn bộ hoạt động thường nhật: quản trị nội bộ, rà soát hợp đồng kinh tế, quản lý lao động, sở hữu trí tuệ và tuân thủ pháp lý. Mục tiêu cốt lõi của chúng tôi là phòng ngừa rủi ro ngay từ đầu và triệt tiêu mầm mống tranh chấp.",
        "Đức Tín & Cộng sự cung cấp bức tranh pháp lý toàn cảnh cùng phương pháp tiếp cận chủ động, giúp Hội đồng Quản trị và Ban Tổng Giám đốc tự tin triển khai các kế hoạch kinh doanh chiến lược một cách hợp pháp và tối ưu nhất."
      ],
      keyHighlights: [
        {
          title: "Phòng ngừa Rủi ro Chủ động",
          desc: "Soát xét định kỳ, phát hiện và bịt kín các lỗ hổng pháp lý trước khi phát sinh tranh chấp hoặc bị xử phạt.",
          icon: "security"
        },
        {
          title: "Đồng hành Như Bộ phận Pháp chế",
          desc: "Phản hồi nhanh chóng trong vòng 2-4 giờ cho mọi văn bản, hợp đồng và câu hỏi phát sinh của doanh nghiệp.",
          icon: "support_agent"
        },
        {
          title: "Bảo mật & Tối ưu Chi phí",
          desc: "Cam kết bảo mật tuyệt đối bí mật kinh doanh, chi phí gói cố vấn trọn gói tối ưu hơn nhiều so với việc duy trì phòng pháp chế cồng kềnh.",
          icon: "verified_user"
        }
      ],
      scopes: [
        {
          title: "1. Quản trị Nội bộ & Cơ cấu Cổ đông",
          items: [
            "Xây dựng và hoàn thiện Điều lệ công ty, Quy chế hoạt động HĐQT/Ban Tổng Giám đốc.",
            "Tư vấn tổ chức Đại hội đồng cổ đông / Hội đồng thành viên, lập biên bản và nghị quyết chuẩn mực.",
            "Giải quyết mâu thuẫn nội bộ giữa các nhóm cổ đông, bảo vệ quyền lợi cổ đông sáng lập và cổ đông thiểu số."
          ]
        },
        {
          title: "2. Rà soát & Soạn thảo Hợp đồng Thương mại",
          items: [
            "Soạn thảo và rà soát các hợp đồng kinh tế: Hợp tác kinh doanh (BCC), Mua bán hàng hóa, Phân phối độc quyền, Nhượng quyền thương mại.",
            "Thẩm định tính pháp lý các giao dịch lớn, điều khoản phạt vi phạm, bồi thường thiệt hại và điều khoản tài phán giải quyết tranh chấp."
          ]
        },
        {
          title: "3. Pháp chế Lao động & Tiền lương Doanh nghiệp",
          items: [
            "Soạn thảo Nội quy lao động, Thỏa ước lao động tập thể và đăng ký với cơ quan quản lý lao động.",
            "Xây dựng hệ thống Hợp đồng lao động, Thỏa thuận bảo mật thông tin (NDA) và Thỏa thuận không cạnh tranh (NCA).",
            "Tư vấn xử lý kỷ luật lao động, chấm dứt hợp đồng đúng trình tự pháp luật tránh nguy cơ bồi thường."
          ]
        },
        {
          title: "4. Tuân thủ Pháp luật & Giấy phép Hoạt động",
          items: [
            "Tư vấn tuân thủ quy định về cạnh tranh, bảo vệ quyền lợi người tiêu dùng và an toàn dữ liệu cá nhân (Nghị định 13/2023).",
            "Đại diện thực hiện các thủ tục thay đổi nội dung đăng ký kinh doanh, chia tách, hợp nhất và tái cơ cấu vốn."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Khảo sát Hiện trạng", desc: "Luật sư trực tiếp tiếp nhận mô hình doanh nghiệp, rà soát hệ thống tài liệu và văn bản hiện hành." },
        { step: "02", title: "Báo cáo Đánh giá Rủi ro", desc: "Chỉ rõ các điểm xung đột pháp lý tiềm ẩn và đề xuất lộ trình chuẩn hóa chi tiết." },
        { step: "03", title: "Triển khai & Chuẩn hóa", desc: "Soạn thảo, hiệu chỉnh toàn bộ hợp đồng mẫu, quy chế nội bộ và biểu mẫu vận hành." },
        { step: "04", title: "Cố vấn Thường xuyên", desc: "Hỗ trợ giải đáp hàng ngày, tham gia các buổi đàm phán quan trọng cùng ban điều hành." }
      ]
    },
    experience: [
      {
        title: "Tư vấn Tái cấu trúc Toàn diện & Quản trị Nội bộ cho Tập đoàn Bán lẻ F&B",
        clientType: "Doanh nghiệp Chuỗi F&B (hơn 45 chi nhánh)",
        result: "Chuẩn hóa 100% hợp đồng nhượng quyền và thỏa thuận cổ đông, phòng ngừa tranh chấp nội bộ trước vòng gọi vốn Series A.",
        year: "2025 - 2026",
        summary: "Đức Tín & Cộng sự trực tiếp đại diện rà soát lại toàn bộ điều lệ, thỏa thuận quyền chọn mua cổ phần (ESOP) và tái cấu trúc hệ thống công ty mẹ - con."
      },
      {
        title: "Soát xét Hợp đồng Cung ứng và Phân phối Độc quyền Đa quốc gia",
        clientType: "Doanh nghiệp Sản xuất Linh kiện Cơ khí chính xác",
        result: "Bảo vệ thành công quyền lợi pháp lý, loại bỏ điều khoản miễn trừ trách nhiệm bất lợi từ đối tác nước ngoài trị giá 12 triệu USD.",
        year: "2025",
        summary: "Đàm phán sửa đổi 18 điều khoản trọng yếu về bảo hành, chậm thanh toán và lựa chọn Trung tâm Trọng tài Quốc tế Việt Nam (VIAC)."
      },
      {
        title: "Tư vấn Giải quyết Bất đồng Cổ đông và Chuyển nhượng Cổ phần Sáng lập",
        clientType: "Công ty Cổ phần Công nghệ Fintech",
        result: "Dàn xếp thành công việc thoái vốn trong êm đẹp mà không phải đưa vụ việc ra Tòa án, bảo toàn danh tiếng và hoạt động kinh doanh liên tục.",
        year: "2024",
        summary: "Thiết kế cấu trúc thanh toán nhiều giai đoạn kèm điều khoản khóa chuyển giao công nghệ bí mật độc quyền."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Cẩm nang Pháp lý Doanh nghiệp 2026: Rà soát Hợp đồng & Phòng ngừa Rủi ro Nội bộ",
        date: "15/08/2026",
        readTime: "7 phút đọc",
        excerpt: "Những sai sót phổ biến trong điều khoản phạt vi phạm, thẩm quyền ký kết và cách thức xây dựng quy chế bảo mật thông tin nội bộ vững chắc."
      },
      {
        slug: "quy-dinh-moi-ve-thue-thu-nhap-ca-nhan-nam-2024",
        title: "Quy định Mới về Thuế và Chính sách Khấu trừ Chi phí Doanh nghiệp",
        date: "10/08/2026",
        readTime: "5 phút đọc",
        excerpt: "Hướng dẫn tối ưu hóa chi phí lương thưởng, phúc lợi người lao động hợp lệ được trừ khi tính thuế TNDN."
      }
    ]
  },

  // 2. TƯ VẤN ĐẦU TƯ
  "tu-van-dau-tu": {
    slug: "tu-van-dau-tu",
    title: "TƯ VẤN ĐẦU TƯ",
    category: "Đầu tư",
    badge: "Chuyên Gia FDI & M&A",
    heroDesc: "Tư vấn đầu tư, thành lập doanh nghiệp có vốn đầu tư nước ngoài (FDI), chuyển nhượng cổ phần, vốn góp, mua bán và sáp nhập doanh nghiệp (M&A), cấp phép dự án đầu tư.",
    about: {
      overview: [
        "Đức Tín & Cộng sự tự hào là đối tác pháp lý tin cậy của nhiều nhà đầu tư FDI đến từ Nhật Bản, Hàn Quốc, Singapore, Hoa Kỳ và Châu Âu khi bước chân vào thị trường Việt Nam.",
        "Chúng tôi tham gia cố vấn ngay từ giai đoạn tiền khả thi: phân tích điều kiện gia nhập thị trường, lựa chọn địa bàn đầu tư, thẩm định pháp lý dự án (Due Diligence) cho đến đàm phán hợp đồng liên doanh và hoàn tất thủ tục xin cấp Giấy chứng nhận đăng ký đầu tư (IRC) và Giấy chứng nhận đăng ký doanh nghiệp (ERC).",
        "Chúng tôi mang đến giải pháp trọn gói, bảo đảm tiến độ cấp phép nhanh nhất và giúp nhà đầu tư hưởng trọn vẹn các gói ưu đãi đầu tư cao nhất theo quy định hiện hành."
      ],
      keyHighlights: [
        {
          title: "Thấu hiểu Rào cản Thị trường",
          desc: "Nắm vững biểu cam kết WTO và các hiệp định thương mại thế hệ mới (CPTPP, EVFTA) để gỡ bỏ hạn chế tỷ lệ sở hữu nước ngoài.",
          icon: "public"
        },
        {
          title: "Thẩm định Dự án Toàn diện (Legal DD)",
          desc: "Đánh giá chính xác tình trạng pháp lý đất đai, môi trường, quy hoạch và nghĩa vụ thuế trước khi rót vốn.",
          icon: "fact_check"
        },
        {
          title: "Mạng lưới Làm việc Chuyên nghiệp",
          desc: "Kinh nghiệm làm việc hiệu quả với các Ban Quản lý Khu Công nghiệp, Sở KH&ĐT và Bộ Kế hoạch Đầu tư.",
          icon: "hub"
        }
      ],
      scopes: [
        {
          title: "1. Tư vấn Đầu tư Thành lập Tổ chức Kinh tế (FDI)",
          items: [
            "Tư vấn cơ cấu vốn, ngành nghề đầu tư có điều kiện và tỷ lệ sở hữu của nhà đầu tư nước ngoài.",
            "Soạn thảo hồ sơ đề xuất dự án đầu tư, xin cấp IRC, ERC cho doanh nghiệp 100% vốn FDI hoặc liên doanh."
          ]
        },
        {
          title: "2. Góp vốn, Mua cổ phần / Phần vốn góp (M&A Đầu tư)",
          items: [
            "Thực hiện thẩm định pháp lý (Due Diligence) đối với doanh nghiệp mục tiêu tại Việt Nam.",
            "Xin chấp thuận góp vốn/mua phần vốn góp của nhà đầu tư nước ngoài tại Sở Kế hoạch và Đầu tư.",
            "Soạn thảo Hợp đồng chuyển nhượng cổ phần (SPA) và Thỏa thuận cổ đông (SHA)."
          ]
        },
        {
          title: "3. Thuê đất Khu Công nghiệp & Pháp lý Xây dựng",
          items: [
            "Rà soát Hợp đồng thuê lại đất, thỏa thuận nguyên tắc với chủ đầu tư hạ tầng KCN.",
            "Tư vấn xin phê duyệt Báo cáo đánh giá tác động môi trường (ĐTM), Giấy phép PCCC và Giấy phép xây dựng nhà máy."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tư vấn Tiền Khả thi", desc: "Phân tích điều kiện thị trường, địa điểm, ngành nghề và ưu đãi thuế áp dụng." },
        { step: "02", title: "Thẩm định Pháp lý (DD)", desc: "Kiểm tra rủi ro đất đai, giấy phép, lao động và tài chính của đối tác liên doanh." },
        { step: "03", title: "Xin Cấp Phép Đầu Tư", desc: "Soạn thảo hồ sơ chuẩn mực và đại diện làm việc với các cơ quan quản lý đầu tư." },
        { step: "04", title: "Hỗ trợ Hậu Cấp phép", desc: "Mở tài khoản vốn đầu tư, đăng ký giao dịch ngoại hối tại Ngân hàng Nhà nước và hoàn tất đi vào hoạt động." }
      ]
    },
    experience: [
      {
        title: "Tư vấn Cấp phép Dự án Nhà máy Sản xuất Công nghệ Cao 15 Triệu USD",
        clientType: "Tập đoàn Điện tử Hàn Quốc",
        result: "Hoàn tất thủ tục cấp IRC và ERC trong 25 ngày làm việc tại Khu Công nghiệp Bình Dương, hưởng ưu đãi thuế TNDN 4 năm miễn 9 năm giảm 50%.",
        year: "2025",
        summary: "Đức Tín & Cộng sự đại diện đàm phán hợp đồng thuê đất 30.000 m2 và xin phê duyệt quy hoạch tổng mặt bằng."
      },
      {
        title: "Tư vấn M&A Thâu tóm 70% Cổ phần Công ty Chế biến Nông sản Xuất khẩu",
        clientType: "Quỹ Đầu tư Singapore",
        result: "Thực hiện Báo cáo Thẩm định Pháp lý (Legal DD) phát hiện 3 rủi ro về đất nông nghiệp, giúp đàm phán giảm giá mua 1.2 triệu USD.",
        year: "2024 - 2025",
        summary: "Hoàn tất thủ tục chấp thuận M&A và thay đổi người đại diện theo pháp luật an toàn."
      }
    ],
    articles: [
      {
        slug: "quy-dinh-moi-ve-thue-thu-nhap-ca-nhan-nam-2024",
        title: "Cập nhật Chính sách Ưu đãi Đầu tư Mới Nhất 2026 cho Doanh nghiệp FDI",
        date: "05/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Tổng hợp các địa bàn và ngành nghề được hưởng mức thuế suất TNDN ưu đãi 10% trong 15 năm."
      }
    ]
  },

  // 3. THỦ TỤC PHÁP LÝ - GIẤY PHÉP
  "thu-tuc-phap-ly-giay-phep": {
    slug: "thu-tuc-phap-ly-giay-phep",
    title: "THỦ TỤC PHÁP LÝ - GIẤY PHÉP",
    category: "Hành chính",
    badge: "Cấp Phép Nhanh Chóng",
    heroDesc: "Thành lập và thay đổi nội dung đăng ký doanh nghiệp, giấy phép đầu tư, giấy phép con các ngành nghề kinh doanh có điều kiện (VSATTP, PCCC, An ninh trật tự, công bố sản phẩm).",
    about: {
      overview: [
        "Đối với các ngành nghề kinh doanh có điều kiện, việc sở hữu đầy đủ giấy phép con là điều kiện tiên quyết để doanh nghiệp hoạt động hợp pháp và tránh các chế tài đình chỉ hoạt động hoặc xử phạt nặng nề.",
        "Đức Tín & Cộng sự hỗ trợ trọn gói từ khâu khảo sát thực tế cơ sở, tư vấn hoàn thiện cơ sở vật chất đáp ứng tiêu chuẩn kỹ thuật cho đến soạn thảo hồ sơ và đại diện làm việc với các Bộ, Sở ban ngành.",
        "Chúng tôi tối ưu hóa quy trình giúp khách hàng nhận được giấy phép trong thời gian ngắn nhất với chi phí minh bạch và cam kết không phát sinh."
      ],
      keyHighlights: [
        {
          title: "Xử lý Hồ sơ Nhanh Gọn",
          desc: "Đúng hẹn cam kết, rút ngắn từ 30-50% thời gian chờ đợi cấp phép so với tự thực hiện.",
          icon: "timer"
        },
        {
          title: "Khảo sát Hiện trường Tận nơi",
          desc: "Luật sư trực tiếp đến thẩm định cơ sở, hướng dẫn sửa đổi trang thiết bị đạt chuẩn trước khi đoàn kiểm tra đến.",
          icon: "location_on"
        },
        {
          title: "Cam kết Trọn gói - Không Phát sinh",
          desc: "Báo giá rõ ràng một lần, bao gồm toàn bộ lệ phí nhà nước và phí dịch vụ pháp lý.",
          icon: "payments"
        }
      ],
      scopes: [
        {
          title: "1. Thành lập Doanh nghiệp & Thay đổi ĐKKD",
          items: [
            "Thành lập công ty TNHH, Công ty Cổ phần, Doanh nghiệp tư nhân, Hộ kinh doanh cá thể.",
            "Thay đổi ngành nghề, tăng giảm vốn điều lệ, thay đổi người đại diện theo pháp luật, chuyển đổi loại hình doanh nghiệp."
          ]
        },
        {
          title: "2. Giấy phép Con các Ngành nghề Đặc thù",
          items: [
            "Giấy chứng nhận Cơ sở đủ điều kiện An toàn Vệ sinh Thực phẩm (ATTP).",
            "Giấy phép Kinh doanh Rượu, Thuốc lá, Dịch vụ Lưu trú (Khách sạn), Dịch vụ Massage/Spa.",
            "Giấy chứng nhận Đủ điều kiện An ninh Trật tự (ANTT) và Giấy phép Phòng cháy Chữa cháy (PCCC)."
          ]
        },
        {
          title: "3. Đăng ký Sở hữu Trí tuệ & Mã số Mã vạch",
          items: [
            "Tra cứu khả năng bảo hộ và nộp đơn đăng ký Nhãn hiệu (Logo), Kiểu dáng công nghiệp, Bản quyền tác giả tại Cục SHTT.",
            "Đăng ký Mã số mã vạch sản phẩm, Công bố tiêu chuẩn chất lượng sản phẩm thực phẩm, mỹ phẩm."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tư vấn & Thẩm tra Điều kiện", desc: "Kiểm tra điều kiện kinh doanh theo quy định mới nhất của ngành nghề khách hàng dự kiến." },
        { step: "02", title: "Hoàn thiện Hồ sơ & Cơ sở", desc: "Soạn thảo toàn bộ hồ sơ, hướng dẫn chuẩn bị mặt bằng đáp ứng tiêu chuẩn kiểm định." },
        { step: "03", title: "Nộp Hồ sơ & Tiếp đoàn Kiểm tra", desc: "Đại diện nộp hồ sơ và đồng hành cùng khách hàng khi cơ quan nhà nước kiểm tra thực địa." },
        { step: "04", title: "Bàn giao Giấy phép", desc: "Nhận Giấy phép chính thức và tư vấn các nghĩa vụ cần duy trì sau cấp phép." }
      ]
    },
    experience: [
      {
        title: "Cấp phép Trọn gói Chuỗi 15 Cửa hàng Tiện lợi Trong 20 Ngày",
        clientType: "Doanh nghiệp Bán lẻ Thực phẩm",
        result: "Hoàn tất Giấy chứng nhận ATTP và Giấy phép bán lẻ rượu, thuốc lá đồng loạt cho 15 điểm bán đúng ngày khai trương.",
        year: "2025",
        summary: "Đội ngũ chuyên viên Đức Tín trực tiếp khảo sát và hoàn thiện hồ sơ cho từng quận huyện tại TP.HCM."
      },
      {
        title: "Đăng ký Thành công Bảo hộ Nhãn hiệu Độc quyền Nhóm Dược Mỹ phẩm",
        clientType: "Công ty Dược phẩm",
        result: "Vượt qua phản đối đơn của đối thủ cạnh tranh, Cục SHTT cấp văn bằng bảo hộ nhãn hiệu độc quyền 10 năm trên toàn quốc.",
        year: "2024",
        summary: "Soạn thảo văn bản phản biện pháp lý chứng minh tính phân biệt rõ ràng của nhãn hiệu thân chủ."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "56 Ngành Nghề Đầu Tư Kinh Doanh Có Điều Kiện Được Cắt Giảm Thủ Tục 2026",
        date: "12/08/2026",
        readTime: "5 phút đọc",
        excerpt: "Cập nhật các ngành nghề được bãi bỏ giấy phép con, giúp doanh nghiệp tiết kiệm hàng tháng thời gian chờ đợi."
      }
    ]
  },

  // 4. DI CHÚC - THỪA KẾ
  "di-chuc-thua-ke": {
    slug: "di-chuc-thua-ke",
    title: "DI CHÚC - THỪA KẾ",
    category: "Thừa kế",
    badge: "Bảo Toàn Di Sản",
    heroDesc: "Tư vấn lập di chúc hợp pháp, lưu giữ công chứng di chúc, thủ tục khai nhận di sản, thỏa thuận phân chia di sản thừa kế, xác định thừa kế thế vị và giải quyết tranh chấp thừa kế tại Tòa án.",
    about: {
      overview: [
        "Di chúc và thừa kế là lĩnh vực pháp lý mang tính nhạy cảm cao, liên quan trực tiếp đến tài sản gia tộc và mối quan hệ giữa những người thân trong gia đình. Thiếu sót về mặt hình thức hoặc nội dung di chúc dễ dẫn đến nguy cơ bị Tòa án tuyên vô hiệu, gây mâu thuẫn kéo dài qua nhiều thế hệ.",
        "Đức Tín & Cộng sự đồng hành tư vấn thiết lập di chúc chuẩn xác về mặt pháp lý, bảo đảm trọn vẹn ý chí của người để lại di sản và ngăn ngừa mọi nguy cơ tranh chấp về sau.",
        "Chúng tôi hỗ trợ trọn gói từ khâu soạn thảo di chúc, chứng nhận công chứng, khai nhận di sản, thỏa thuận phân chia di sản đến đại diện bảo vệ quyền lợi hợp pháp tại Tòa án khi có tranh chấp phát sinh."
      ],
      keyHighlights: [
        {
          title: "Di Chúc Hợp Pháp 100%",
          desc: "Bảo đảm chặt chẽ điều kiện có hiệu lực của di chúc theo Bộ luật Dân sự, phòng ngừa triệt để nguy cơ bị khiếu kiện vô hiệu.",
          icon: "verified_user"
        },
        {
          title: "Phân Chia Di Sản Minh Bạch",
          desc: "Hỗ trợ thủ tục khai nhận, thỏa thuận phân chia di sản thừa kế nhà đất và cổ phần doanh nghiệp nhanh chóng, đúng quy trình.",
          icon: "assignment"
        },
        {
          title: "Bảo Mật & Nhân Văn",
          desc: "Cam kết bảo mật tuyệt đối nội dung di chúc và giải quyết mâu thuẫn gia đình trên tinh thần gắn kết, thấu tình đạt lý.",
          icon: "family_restroom"
        }
      ],
      scopes: [
        {
          title: "1. Tư Vấn & Soạn Thảo Di Chúc",
          items: [
            "Soạn thảo di chúc bằng văn bản có công chứng, chứng thực hợp pháp theo đúng quy định.",
            "Tư vấn chỉ định người thừa kế, phân định tài sản chung - riêng, di tặng và nghĩa vụ tài sản.",
            "Hỗ trợ thủ tục lập di chúc tại nhà hoặc tại bệnh viện cho người cao tuổi, người hạn chế khả năng đi lại."
          ]
        },
        {
          title: "2. Khai Nhận & Phân Chia Di Sản Thừa Kế",
          items: [
            "Thực hiện thủ tục khai nhận di sản thừa kế theo di chúc và theo pháp luật tại tổ chức hành nghề công chứng.",
            "Soạn thảo và công chứng Văn bản thỏa thuận phân chia di sản thừa kế giữa các đồng thừa kế.",
            "Đại diện thực hiện thủ tục đăng bộ sang tên quyền sử dụng đất, nhà ở và chuyển nhượng cổ phần thừa kế."
          ]
        },
        {
          title: "3. Giải Quyết Tranh Chấp Thừa Kế Tại Tòa Án",
          items: [
            "Yêu cầu Tòa án hủy bỏ di chúc giả mạo, di chúc bị ép buộc hoặc di chúc vi phạm điều kiện có hiệu lực.",
            "Khởi kiện chia di sản thừa kế, xác định công sức đóng góp quản lý, gìn giữ, tôn tạo khối di sản.",
            "Bảo vệ quyền lợi của người thừa kế không phụ thuộc vào nội dung di chúc (cha mẹ, vợ chồng, con chưa thành niên)."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Thẩm Định Pháp Lý Tài Sản", desc: "Kiểm tra toàn bộ giấy tờ chứng minh quyền sở hữu tài sản và xác định phạm vi di sản hợp pháp." },
        { step: "02", title: "Soạn Thảo Di Chúc Chuẩn Mực", desc: "Soạn thảo văn bản di chúc chặt chẽ, thể hiện đầy đủ, chính xác ý nguyện của người để lại di sản." },
        { step: "03", title: "Công Chứng & Niêm Phong", desc: "Hỗ trợ thủ tục công chứng, niêm phong và gửi lưu giữ di chúc an toàn bảo mật tuyệt đối." },
        { step: "04", title: "Thực Thi & Sang Tên Di Sản", desc: "Đại diện công bố di chúc, hoàn tất thủ tục khai nhận và sang tên giấy chứng nhận tài sản cho người thừa kế." }
      ]
    },
    experience: [
      {
        title: "Tư Vấn Lập Di Chúc Khối Tài Sản Nhà Đất & Doanh Nghiệp Trị Giá Hơn 120 Tỷ Đồng",
        clientType: "Doanh nhân Bất động sản tại TP.HCM",
        result: "Hoàn tất lập và công chứng di chúc phân chia tài sản cho các con, phòng ngừa tranh chấp quyền điều hành công ty.",
        year: "2025 - 2026",
        summary: "Thiết lập cấu trúc ủy thác điều hành và quy chế biểu quyết cổ phần doanh nghiệp đi kèm di chúc."
      },
      {
        title: "Giải Quyết Tranh Chấp Di Sản Thừa Kế Đất Đai Cho Thân Chủ Định Cư Nước Ngoài",
        clientType: "Việt kiều Canada",
        result: "Tòa án công nhận quyền thừa kế hợp pháp 1/3 giá trị bất động sản 25 tỷ đồng tại Quận 3, TP.HCM.",
        year: "2025",
        summary: "Thu thập hồ sơ hộ tịch lịch sử và chứng cứ gửi kiều hối xây dựng nhà đất để bảo vệ trọn vẹn kỷ phần thừa kế."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Điều Kiện Để Di Chúc Có Hiệu Lực Pháp Luật & 4 Sai Lầm Khiến Di Chúc Vô Hiệu",
        date: "15/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Hướng dẫn chi tiết các hình thức lập di chúc hợp pháp và cách chỉ định người thừa kế không phụ thuộc nội dung di chúc."
      }
    ]
  },

  // 5. DÂN SỰ
  "dan-su": {
    slug: "dan-su",
    title: "DÂN SỰ",
    category: "Dân sự",
    badge: "Bảo Vệ Quyền Dân Sự",
    heroDesc: "Tư vấn và giải quyết tranh chấp đất đai, tranh chấp hợp đồng mua bán, hợp đồng vay mượn tài sản, yêu cầu bồi thường thiệt hại ngoài hợp đồng, xác định quan hệ nhân thân và các giao dịch dân sự khác.",
    about: {
      overview: [
        "Quan hệ pháp luật dân sự hiện diện trong mọi mặt đời sống thường nhật từ giao dịch mua bán, vay mượn tài sản, bồi thường thiệt hại, ủy quyền, cầm cố thế chấp cho đến các quyền nhân thân cơ bản của mỗi cá nhân.",
        "Khi quyền và lợi ích hợp pháp bị xâm phạm, sự am hiểu sâu sắc về Bộ luật Dân sự và kỹ năng thu thập chứng cứ của luật sư là chìa khóa để bảo vệ tối đa tài sản và danh dự của thân chủ.",
        "Đức Tín & Cộng sự cung cấp giải pháp toàn diện từ tư vấn phòng ngừa rủi ro hợp đồng, thương lượng hòa giải đến đại diện khởi kiện và thi hành án dân sự."
      ],
      keyHighlights: [
        {
          title: "Bảo Vệ Quyền Lợi Toàn Diện",
          desc: "Đại diện giải quyết nhanh chóng mọi tranh chấp về hợp đồng, tài sản, nghĩa vụ trả nợ và bồi thường thiệt hại.",
          icon: "balance"
        },
        {
          title: "Thương Lượng Hòa Giải Hiệu Quả",
          desc: "Ưu tiên giải pháp đối thoại, thương lượng văn minh giúp thu hồi tài sản và giữ gìn quan hệ đối tác, xã hội.",
          icon: "handshake"
        },
        {
          title: "Luận Cứ Tranh Tụng Sắc Bén",
          desc: "Trực tiếp tham gia tố tụng tại Tòa án các cấp, đảm bảo phán quyết công bằng và quyền lợi cao nhất cho thân chủ.",
          icon: "gavel"
        }
      ],
      scopes: [
        {
          title: "1. Tranh Chấp Hợp Đồng Dân Sự & Nghĩa Vụ Trả Nợ",
          items: [
            "Hợp đồng vay mượn tiền, hợp đồng mua bán tài sản, hợp đồng tặng cho, hợp đồng thuê mượn tài sản.",
            "Yêu cầu thanh toán nợ gốc, lãi suất hợp pháp và tiền bồi thường do vi phạm nghĩa vụ hợp đồng.",
            "Soạn thảo thư cảnh báo pháp lý (Legal Notice) và trực tiếp đàm phán lộ trình thanh toán có tài sản bảo đảm."
          ]
        },
        {
          title: "2. Bồi Thường Thiệt Hại Ngoài Hợp Đồng",
          items: [
            "Bồi thường thiệt hại do tính mạng, sức khỏe, danh dự, nhân phẩm, uy tín bị xâm phạm.",
            "Bồi thường thiệt hại do tài sản bị xâm phạm, sự cố công trình xây dựng hoặc tai nạn giao thông.",
            "Thu thập chứng cứ chứng minh tổn thất thực tế, chi phí cứu chữa, phục hồi và thu nhập thực tế bị mất."
          ]
        },
        {
          title: "3. Quyền Nhân Thân & Quan Hệ Dân Sự Khác",
          items: [
            "Yêu cầu công nhận hoặc bác bỏ quan hệ cha mẹ con; thay đổi, cải chính hộ tịch, nơi cư trú.",
            "Thủ tục tuyên bố một người mất tích, đã chết hoặc mất/hạn chế năng lực hành vi dân sự.",
            "Tư vấn và soạn thảo các giao dịch dân sự, hợp đồng ủy quyền và thỏa thuận bồi thường hợp pháp."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Nghiên Cứu Hồ Sơ & Đánh Giá", desc: "Thẩm định tài liệu, hợp đồng, xác định thời hiệu khởi kiện và căn cứ pháp lý bảo vệ thân chủ." },
        { step: "02", title: "Thương Lượng & Gửi Khuyến Cáo", desc: "Phát hành văn bản pháp lý chính thức, đại diện đối thoại hòa giải nhằm thu hồi tài sản nhanh nhất." },
        { step: "03", title: "Khởi Kiện & Phong Tỏa Tài Sản", desc: "Soạn đơn khởi kiện, đề nghị Tòa áp dụng biện pháp khẩn cấp tạm thời ngăn chặn tẩu tán tài sản." },
        { step: "04", title: "Đại Diện Tranh Tụng & Thi Hành Án", desc: "Tham gia các buổi hòa giải, tranh tụng tại phiên tòa xét xử và hỗ trợ cưỡng chế thi hành án." }
      ]
    },
    experience: [
      {
        title: "Buộc Hoàn Trả Khoản Tiền Vay 5.8 Tỷ Đồng Kèm Lãi Suất Chậm Trả",
        clientType: "Khách hàng Cá nhân tại TP.HCM",
        result: "Tòa án chấp nhận toàn bộ yêu cầu khởi kiện, áp dụng biện pháp phong tỏa tài khoản ngân hàng bên vay.",
        year: "2025",
        summary: "Thu thập sao kê ngân hàng và tin nhắn cam kết trả nợ làm chứng cứ vững chắc trước Tòa."
      },
      {
        title: "Đòi Bồi Thường Thiệt Hại Do Thi Công Xây Dựng Làm Lún Nứt Nhà Liền Kề",
        clientType: "Chủ sở hữu nhà ở Quận Bình Thạnh",
        result: "Buộc đơn vị thi công bồi thường 850 triệu đồng chi phí sửa chữa và hỗ trợ tiền thuê nhà tạm thời.",
        year: "2024 - 2025",
        summary: "Thực hiện giám định độc lập mức độ tổn thất kết cấu công trình để yêu cầu bồi thường thỏa đáng."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Tranh Chấp Hợp Đồng Vay Tiền Không Có Giấy Biên Nhận: Làm Thế Nào Để Đòi Lại Tiền?",
        date: "20/08/2026",
        readTime: "7 phút đọc",
        excerpt: "Những nguồn chứng cứ hợp pháp thay thế hợp đồng bằng văn bản được Tòa án chấp thuận khi giải quyết tranh chấp."
      }
    ]
  },

  // 6. LAO ĐỘNG
  "lao-dong": {
    slug: "lao-dong",
    title: "LAO ĐỘNG",
    category: "Lao động",
    badge: "Pháp Lý Nhân Sự Chuẩn Mực",
    heroDesc: "Tư vấn hợp đồng lao động, chế độ tiền lương, bảo hiểm xã hội, xây dựng nội quy lao động, quy chế thưởng, kỷ luật lao động và giải quyết tranh chấp liên quan lao động.",
    about: {
      overview: [
        "Mối quan hệ lao động hài hòa và đúng luật là nền tảng sống còn cho sự ổn định của mọi tổ chức. Những vi phạm về sa thải sai luật, chậm đóng BHXH hay thiếu sót trong thỏa ước lao động có thể dẫn đến các vụ kiện tụng kéo dài và đình công gây tê liệt sản xuất.",
        "Đức Tín & Cộng sự hỗ trợ doanh nghiệp xây dựng toàn bộ quy trình nhân sự từ tuyển dụng, ký kết hợp đồng, đánh giá KPI, bảo mật bí mật công nghệ cho đến xử lý kỷ luật lao động đúng luật.",
        "Đồng thời, chúng tôi đại diện bảo vệ quyền lợi hợp pháp cho người lao động, cán bộ quản lý cấp cao trong các vụ việc chấm dứt hợp đồng lao động trái pháp luật hoặc đòi quyền lợi bảo hiểm, trợ cấp thôi việc."
      ],
      keyHighlights: [
        {
          title: "Chuẩn Hóa Văn Bản Nhân Sự",
          desc: "Nội quy lao động, Thỏa ước lao động tập thể và Quy chế lương thưởng được đăng ký hợp pháp với Sở LĐ-TB&XH.",
          icon: "badge"
        },
        {
          title: "Xử lý Sa thải Đúng Luật 100%",
          desc: "Tư vấn quy trình họp kỷ luật, lập biên bản chuẩn mực tránh nguy cơ bị Tòa án tuyên sa thải trái pháp luật.",
          icon: "how_to_reg"
        },
        {
          title: "Thỏa thuận Bảo mật & Chống Cạnh tranh (NDA/NCA)",
          desc: "Bảo vệ bí quyết công nghệ và tệp khách hàng khi nhân sự chủ chốt nghỉ việc.",
          icon: "lock"
        }
      ],
      scopes: [
        {
          title: "1. Soát xét & Đăng ký Quy chế Lao động Doanh nghiệp",
          items: [
            "Soạn thảo Nội quy lao động, Thỏa ước lao động tập thể, Thang bảng lương và đăng ký với cơ quan quản lý.",
            "Xây dựng Thỏa thuận bảo mật thông tin (NDA) và Thỏa thuận cam kết không cạnh tranh (NCA) cho nhân sự cấp cao."
          ]
        },
        {
          title: "2. Tư vấn Giấy phép Lao động cho Người Nước ngoài (Work Permit)",
          items: [
            "Xin chấp thuận nhu cầu sử dụng lao động nước ngoài tại UBND cấp tỉnh.",
            "Làm thủ tục cấp mới, gia hạn Giấy phép lao động và Thẻ tạm trú (TRC) cho chuyên gia, nhà quản lý nước ngoài."
          ]
        },
        {
          title: "3. Giải quyết Tranh chấp Lao động Cá nhân & Tập thể",
          items: [
            "Hòa giải và đại diện tranh tụng tại Tòa án về tranh chấp sa thải, đơn phương chấm dứt hợp đồng lao động.",
            "Đòi tiền lương, trợ cấp mất việc làm, tiền đóng BHXH, BHYT, BHTN theo quy định."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Đánh giá Rủi ro Nhân sự", desc: "Rà soát toàn bộ hệ thống hợp đồng lao động và quy chế hiện tại của doanh nghiệp." },
        { step: "02", title: "Chuẩn hóa & Ban hành", desc: "Soạn thảo mới hoặc hiệu chỉnh các văn bản tuân thủ Bộ luật Lao động mới nhất." },
        { step: "03", title: "Tập huấn Trưởng Bộ phận", desc: "Hướng dẫn phòng Nhân sự cách thức lập biên bản vi phạm và xử lý kỷ luật đúng quy trình." },
        { step: "04", title: "Cố vấn & Dàn xếp Vụ việc", desc: "Trực tiếp đại diện đối thoại, thương lượng với người lao động khi có bất đồng phát sinh." }
      ]
    },
    experience: [
      {
        title: "Tái cơ cấu Cắt giảm Nhân sự Hợp pháp cho Nhà máy May Mặc 1.200 Công nhân",
        clientType: "Doanh nghiệp Dệt may FDI",
        result: "Lập Phương án Sử dụng Lao động đúng luật, chi trả trợ cấp đầy đủ mà không xảy ra bất kỳ vụ đình công hay khiếu kiện nào.",
        year: "2025",
        summary: "Làm việc chặt chẽ với Công đoàn cơ sở và Phòng Lao động địa phương để giám sát quy trình minh bạch."
      },
      {
        title: "Bảo vệ Giám đốc Vận hành trong Vụ việc Sa thải Trái luật Đòi bồi thường 1.8 Tỷ Đồng",
        clientType: "Cán bộ Quản lý Cấp cao",
        result: "Tòa án tuyên hủy quyết định sa thải, buộc công ty bồi thường toàn bộ tiền lương trong thời gian không được làm việc và 2 tháng lương thỏa thuận.",
        year: "2024",
        summary: "Chỉ rõ công ty đã vi phạm nghiêm trọng về thời hiệu xử lý kỷ luật và không chứng minh được lỗi vi phạm của nhân sự."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Quy trình 5 Bước Xử lý Kỷ luật Sa thải Đúng Luật để Không Bị Kiện",
        date: "20/07/2026",
        readTime: "6 phút đọc",
        excerpt: "Chi tiết các mốc thời gian thông báo, thành phần tham dự họp bắt buộc và cách lập biên bản có giá trị chứng cứ."
      }
    ]
  },

  // 7. TRANH TỤNG
  "tranh-tung": {
    slug: "tranh-tung",
    title: "TRANH TỤNG",
    category: "Tố tụng",
    badge: "Bảo Vệ Quyền Lợi Tuyệt Đối",
    heroDesc: "Tham gia tố tụng tại Tòa án hoặc Trọng tài đối với các tranh chấp có liên quan đến kinh doanh thương mại, nợ khó đòi, đất đai, thừa kế, sở hữu trí tuệ, lao động và dân sự.",
    about: {
      overview: [
        "Tranh chấp kinh doanh, thương mại, dân sự và đất đai luôn mang lại nhiều căng thẳng và rủi ro tài chính nặng nề cho các bên liên quan. Tại Đức Tín & Cộng sự, chúng tôi tiếp cận từng vụ việc với tư duy chiến lược: Ưu tiên thương lượng hòa giải có lợi nhất trước khi bước vào cuộc chiến pháp lý.",
        "Khi thương lượng không thành, đội ngũ luật sư tranh tụng do Luật sư Phan Đức Tín trực tiếp dẫn dắt sẽ xây dựng bản luận cứ bảo vệ đanh thép, thu thập chứng cứ chặt chẽ và đại diện tham gia tố tụng tại Tòa án Nhân dân các cấp (Sơ thẩm, Phúc thẩm, Giám đốc thẩm) và Trung tâm Trọng tài Quốc tế Việt Nam (VIAC).",
        "Chúng tôi cam kết kiên định đồng hành cùng thân chủ đến cùng, từ giai đoạn thụ lý khởi kiện cho đến khi bản án có hiệu lực pháp luật và thi hành án thu hồi tài sản thành công."
      ],
      keyHighlights: [
        {
          title: "Chiến Lược Tố Tụng Sắc Bén",
          desc: "Đánh giá xác suất thắng kiện trung thực, lập kế hoạch thu thập chứng cứ và áp dụng biện pháp khẩn cấp tạm thời bảo toàn tài sản.",
          icon: "gavel"
        },
        {
          title: "Kinh Nghiệm Thực Chiến 15+ Năm",
          desc: "Tham gia bảo vệ thành công hàng trăm vụ án phức tạp tại Tòa án Cấp cao và Tòa án các tỉnh thành trọng điểm.",
          icon: "military_tech"
        },
        {
          title: "Đồng Hành Đến Khâu Thi Hành Án",
          desc: "Không chỉ dừng lại ở bản án thắng kiện, chúng tôi hỗ trợ xác minh điều kiện thi hành án và thu hồi tiền bạc/tài sản thực tế.",
          icon: "account_balance"
        }
      ],
      scopes: [
        {
          title: "1. Tranh chấp Kinh doanh Thương mại & Hợp đồng",
          items: [
            "Tranh chấp hợp đồng mua bán hàng hóa, xây dựng, dịch vụ logistics, hợp đồng vay tài chính.",
            "Tranh chấp giữa các thành viên công ty, cổ đông về quyền điều hành, phân chia lợi nhuận và chuyển nhượng cổ phần."
          ]
        },
        {
          title: "2. Tranh chấp Đất đai & Bất động sản",
          items: [
            "Tranh chấp quyền sử dụng đất, ranh giới thửa đất, hợp đồng đặt cọc mua bán chuyển nhượng nhà đất.",
            "Khiếu kiện quyết định hành chính về thu hồi đất, bồi thường tái định cư không thỏa đáng."
          ]
        },
        {
          title: "3. Tranh chấp Dân sự, Hôn nhân & Thừa kế",
          items: [
            "Phân chia di sản thừa kế theo di chúc và theo pháp luật đối với bất động sản giá trị lớn.",
            "Tranh chấp tài sản chung vợ chồng khi ly hôn, phân định nợ chung và quyền nuôi con."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Thẩm định Hồ sơ", desc: "Nghiên cứu tài liệu chứng cứ, đánh giá cơ sở pháp lý và dự báo các tình huống bất lợi." },
        { step: "02", title: "Thương lượng & Hòa giải", desc: "Soạn thảo thư cảnh báo pháp lý (Legal Notice), đại diện đàm phán giải pháp dứt điểm." },
        { step: "03", title: "Khởi kiện & Tranh tụng", desc: "Soạn đơn khởi kiện, yêu cầu áp dụng BPKCTT phong tỏa tài sản, trực tiếp tranh tụng tại phiên tòa." },
        { step: "04", title: "Thi hành án", desc: "Hỗ trợ làm việc với Cơ quan Thi hành án dân sự để cưỡng chế thi hành, thu hồi trọn vẹn tài sản." }
      ]
    },
    experience: [
      {
        title: "Bảo vệ Thành công Vụ án Tranh chấp Hợp đồng Thi công Xây dựng 45 Tỷ Đồng",
        clientType: "Nhà thầu Xây dựng Công nghiệp",
        result: "Tòa án chấp nhận toàn bộ yêu cầu khởi kiện, buộc chủ đầu tư thanh toán đủ nợ gốc và tiền lãi phạt chậm trả 5.2 tỷ đồng.",
        year: "2025",
        summary: "Ls. Phan Đức Tín trực tiếp chỉ ra các điểm vi phạm nghiệm thu và bảo lưu chứng cứ giám định khối lượng công trình chuẩn xác."
      },
      {
        title: "Hòa giải Thành công Tranh chấp Chia Thừa kế Nhà đất Trung tâm Quận 1",
        clientType: "Thân chủ cá nhân định cư tại Mỹ",
        result: "Dàn xếp thỏa thuận phân chia công bằng phần tài sản trị giá hơn 80 tỷ đồng mà không phải kéo dài xét xử qua nhiều cấp Tòa.",
        year: "2024",
        summary: "Thiết lập biên bản hòa giải có công chứng và hoàn tất thủ tục đăng bộ sang tên quyền sử dụng đất trong 30 ngày."
      }
    ],
    articles: [
      {
        slug: "luat-dat-dai-sua-doi-co-hieu-luc-tu-thang-7",
        title: "Kinh nghiệm Thực chiến Áp dụng Biện pháp Phong tỏa Tài sản khi Khởi kiện",
        date: "02/08/2026",
        readTime: "8 phút đọc",
        excerpt: "Hướng dẫn các bước nộp đơn phong tỏa tài khoản ngân hàng và kê biên nhà đất ngay khi Tòa án thụ lý vụ án."
      }
    ]
  },

  // 8. NHÀ ĐẤT - BẤT ĐỘNG SẢN
  "bat-dong-san": {
    slug: "bat-dong-san",
    title: "NHÀ ĐẤT - BẤT ĐỘNG SẢN",
    category: "Bất động sản",
    badge: "Pháp Lý Đất Đai Vững Vàng",
    heroDesc: "Tư vấn hồ sơ, thủ tục cấp giấy chứng nhận QSDĐ, hợp thức hoá QSDĐ, tư vấn và thẩm tra hồ sơ pháp lý chuyển nhượng QSDĐ, giải quyết tranh chấp liên quan BĐS.",
    about: {
      overview: [
        "Thị trường bất động sản luôn tiềm ẩn nhiều rủi ro pháp lý phức tạp về quy hoạch, nguồn gốc đất, tính hợp pháp của hợp đồng mua bán và thủ tục cấp sổ hồng/sổ đỏ.",
        "Đức Tín & Cộng sự cung cấp dịch vụ rà soát tính pháp lý bất động sản trước giao dịch, hỗ trợ đàm phán hợp đồng đặt cọc, chuyển nhượng và thực hiện trọn gói thủ tục công chứng, sang tên đăng bộ.",
        "Bên cạnh đó, chúng tôi chuyên sâu giải quyết các tranh chấp đất đai qua nhiều thế hệ, tranh chấp mua bán nhà ở hình thành trong tương lai và khiếu nại bồi thường giải tỏa theo Luật Đất Đai 2024 mới nhất."
      ],
      keyHighlights: [
        {
          title: "Kiểm tra Quy hoạch & Pháp lý Nhanh",
          desc: "Tra cứu chính xác tình trạng quy hoạch, thế chấp ngân hàng, tranh chấp ngăn chặn chỉ trong 24 giờ.",
          icon: "home_work"
        },
        {
          title: "Soạn thảo Hợp đồng Chống Bẫy",
          desc: "Loại bỏ hoàn toàn các điều khoản đơn phương chấm dứt, tiền cọc bất lợi và chậm giao sổ.",
          icon: "assignment"
        },
        {
          title: "Am hiểu Luật Đất Đai Mới",
          desc: "Áp dụng các điểm mới về bảng giá đất thị trường, cấp sổ đỏ đất không giấy tờ và bồi thường tái định cư.",
          icon: "balance"
        }
      ],
      scopes: [
        {
          title: "1. Thẩm định Pháp lý & Soạn Hợp đồng Giao dịch",
          items: [
            "Kiểm tra tính pháp lý của Bất động sản (sổ đỏ, quy hoạch 1/500, giấy phép xây dựng, tình trạng thế chấp).",
            "Soạn thảo và thẩm định hợp đồng đặt cọc, hợp đồng mua bán, chuyển nhượng, tặng cho, cho thuê nhà xưởng."
          ]
        },
        {
          title: "2. Dịch vụ Đăng bộ Sang tên & Cấp Giấy chứng nhận",
          items: [
            "Thực hiện thủ tục cấp mới, cấp đổi, tách thửa, hợp thửa và chuyển mục đích sử dụng đất sang đất ở.",
            "Đại diện kê khai nghĩa vụ tài chính: Thuế thu nhập cá nhân, Lệ phí trước bạ và tiền sử dụng đất."
          ]
        },
        {
          title: "3. Giải quyết Tranh chấp Bất động sản",
          items: [
            "Tranh chấp ranh giới đất liền kề, lối đi chung, hủy hợp đồng chuyển nhượng quyền sử dụng đất có yếu tố lừa dối.",
            "Khởi kiện yêu cầu chủ đầu tư bàn giao nhà và cấp sổ hồng đúng cam kết."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tiếp nhận & Thẩm tra", desc: "Kiểm tra toàn bộ hồ sơ nhà đất, lịch sử giao dịch và quy hoạch tại địa phương." },
        { step: "02", title: "Thiết kế Giao dịch", desc: "Soạn thảo bộ hợp đồng chặt chẽ bảo đảm an toàn dòng tiền và tiến độ thanh toán." },
        { step: "03", title: "Thực hiện Thủ tục", desc: "Đồng hành tại phòng công chứng và nộp hồ sơ tại Văn phòng Đăng ký Đất đai." },
        { step: "04", title: "Bàn giao Sổ hồng", desc: "Nhận kết quả Giấy chứng nhận hoàn chỉnh và bàn giao tận tay khách hàng." }
      ]
    },
    experience: [
      {
        title: "Tư vấn Thẩm định Pháp lý Mua gom 12 Hecta Đất Dự án Kho vận Logistics",
        clientType: "Nhà đầu tư Bất động sản Công nghiệp",
        result: "Phát hiện 2 thửa đất vướng quy hoạch hành lang an toàn điện, giúp khách hàng tránh thiệt hại hơn 20 tỷ đồng.",
        year: "2025",
        summary: "Hỗ trợ thương lượng lại ranh giới và hoàn tất chuyển đổi mục đích sử dụng sang đất sản xuất phi nông nghiệp."
      },
      {
        title: "Đòi lại Thành công 100% Tiền Cọc 8 Tỷ Đồng từ Dự án Chưa Đủ Điều Kiện Mở Bán",
        clientType: "Nhà đầu tư Cá nhân",
        result: "Gửi thư cảnh báo pháp lý và đối thoại trực tiếp, buộc Chủ đầu tư thanh lý hợp đồng và hoàn tiền kèm lãi suất cam kết trong 15 ngày.",
        year: "2024",
        summary: "Vận dụng Luật Kinh doanh Bất động sản mới để chứng minh chủ đầu tư vi phạm nghĩa vụ huy động vốn."
      }
    ],
    articles: [
      {
        slug: "luat-dat-dai-sua-doi-co-hieu-luc-tu-thang-7",
        title: "Luật Đất Đai 2024: 5 Thay đổi Cốt lõi về Bảng giá Đất & Bồi thường Giải tỏa",
        date: "01/08/2026",
        readTime: "10 phút đọc",
        excerpt: "Phân tích chi tiết quy định bỏ khung giá đất, điều kiện cấp sổ đỏ cho đất không giấy tờ và cơ chế bồi thường thỏa đáng."
      }
    ]
  },

  // 9. HÔN NHÂN GIA ĐÌNH
  "hon-nhan-gia-dinh": {
    slug: "hon-nhan-gia-dinh",
    title: "HÔN NHÂN GIA ĐÌNH",
    category: "Gia đình",
    badge: "Thấu Cảm & Bảo Mật",
    heroDesc: "Thoả thuận tiền hôn nhân, kết hôn với người nước ngoài, ly hôn thuận tình và đơn phương nhanh, phân chia tài sản chung vợ chồng, giành quyền nuôi con và cấp dưỡng nuôi con.",
    about: {
      overview: [
        "Vấn đề hôn nhân và gia đình không chỉ đơn thuần là các quy định pháp luật khô khan, mà còn gắn liền với tình cảm, danh dự và tương lai của con cái. Đức Tín & Cộng sự tiếp cận mỗi vụ việc với tinh thần lắng nghe, thấu cảm và giữ gìn sự riêng tư tuyệt đối cho thân chủ.",
        "Chúng tôi ưu tiên hỗ trợ các bên đạt được thỏa thuận Thuận tình Ly hôn văn minh, thống nhất phân chia tài sản và nghĩa vụ cấp dưỡng một cách êm đẹp, tránh tổn thương cho con trẻ.",
        "Trong trường hợp phải giải quyết tranh chấp Đơn phương Ly hôn hoặc tranh chấp tài sản phức tạp, Luật sư Phan Đức Tín sẽ kiên quyết bảo vệ quyền lợi tài chính chính đáng và giành quyền nuôi con tốt nhất cho thân chủ."
      ],
      keyHighlights: [
        {
          title: "Bảo Mật Thông Tin Tuyệt Đối",
          desc: "Toàn bộ thông tin đời tư, tài sản và thỏa thuận được cam kết bảo mật bằng văn bản pháp lý.",
          icon: "vpn_key"
        },
        {
          title: "Thủ Tục Nhanh Gọn, Tối Giản",
          desc: "Hỗ trợ trọn gói ly hôn thuận tình nhanh, hạn chế tối đa số lần khách hàng phải có mặt tại Tòa án.",
          icon: "speed"
        },
        {
          title: "Phân Định Tài Sản & Quyền Nuôi Con Vững Chắc",
          desc: "Chứng minh nguồn gốc tài sản riêng trước hôn nhân và điều kiện chăm sóc con vượt trội để giành quyền nuôi con.",
          icon: "family_restroom"
        }
      ],
      scopes: [
        {
          title: "1. Dịch vụ Ly hôn Thuận tình & Đơn phương",
          items: [
            "Tư vấn và đại diện nộp đơn Ly hôn Thuận tình trọn gói giải quyết nhanh.",
            "Đại diện tham gia phiên tòa giải quyết Đơn phương Ly hôn có yếu tố phức tạp hoặc có yếu tố nước ngoài."
          ]
        },
        {
          title: "2. Phân chia Tài sản Chung / Nợ Chung Vợ Chồng",
          items: [
            "Thu thập chứng cứ chứng minh tài sản riêng do được tặng cho, thừa kế riêng hoặc hình thành trước hôn nhân.",
            "Phân chia cổ phần doanh nghiệp, bất động sản, tiền gửi tiết kiệm và làm rõ các khoản nợ riêng của một bên."
          ]
        },
        {
          title: "3. Giành Quyền Trực tiếp Nuôi con & Cấp dưỡng",
          items: [
            "Thu thập tài liệu chứng minh năng lực tài chính, thời gian chăm sóc và môi trường giáo dục tốt nhất cho con.",
            "Yêu cầu mức cấp dưỡng nuôi con thỏa đáng và xử lý các hành vi cản trở quyền thăm nom con sau ly hôn."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Lắng nghe & Tư vấn Giải pháp", desc: "Trao đổi bảo mật, lắng nghe nguyện vọng về tài sản, quyền nuôi con và đề xuất hướng xử lý nhân văn nhất." },
        { step: "02", title: "Chuẩn bị Hồ sơ Chuẩn mực", desc: "Soạn thảo đơn khởi kiện/đơn thuận tình, trích lục khai sinh, giấy tờ nhà đất và tài liệu chứng minh." },
        { step: "03", title: "Làm việc tại Tòa án", desc: "Đồng hành cùng thân chủ trong các buổi hòa giải và phiên tòa xét xử." },
        { step: "04", title: "Bàn giao Bản án/Quyết định", desc: "Nhận quyết định công nhận ly hôn có hiệu lực pháp luật và hỗ trợ sang tên tài sản được chia." }
      ]
    },
    experience: [
      {
        title: "Giải quyết Thành công Vụ án Ly hôn Phân chia Khối Tài sản 60 Tỷ Đồng",
        clientType: "Nữ Doanh nhân Sáng lập Chuỗi Spa",
        result: "Chứng minh thành công 75% giá trị công ty là tài sản riêng hình thành trước hôn nhân, bảo toàn quyền sở hữu doanh nghiệp cho thân chủ.",
        year: "2025",
        summary: "Ls. Phan Đức Tín truy vết sao kê tài chính và đối chiếu dòng tiền góp vốn chi tiết từ nhiều năm trước."
      },
      {
        title: "Giành Quyền Nuôi 2 Con Nhỏ và Mức Cấp Dưỡng 30 Triệu/Tháng",
        clientType: "Người Mẹ Đơn thân",
        result: "Tòa án chấp thuận trao quyền trực tiếp nuôi 2 con cho người mẹ và buộc người cha cấp dưỡng định kỳ minh bạch.",
        year: "2024",
        summary: "Thu thập chứng cứ về thời gian thực tế mẹ dành cho con và điều kiện sinh hoạt gia đình ổn định vượt trội."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Phân Chia Cổ Phần Doanh Nghiệp Khi Ly Hôn: Những Điều Cần Biết Để Tránh Mất Công Ty",
        date: "18/07/2026",
        readTime: "7 phút đọc",
        excerpt: "Hướng dẫn lập Thỏa thuận tài sản tiền hôn nhân và định giá phần vốn góp cổ đông chuẩn mực."
      }
    ]
  },

  // --- DỊCH VỤ BỔ TRỢ & ĐƯỜNG DẪN KẾ THỪA ---
  "thu-hoi-no": {
    slug: "thu-hoi-no",
    title: "THU HỒI NỢ KHÓ ĐÒI",
    category: "Thu hồi nợ",
    badge: "Hiệu Quả & Đúng Pháp Luật",
    heroDesc: "Cung cấp lộ trình xử lý công nợ chuyên nghiệp thông qua biện pháp hòa giải và các thủ tục tố tụng hợp pháp. Hỗ trợ khách hàng thu hồi tối đa tài sản, tối ưu hóa thời gian và giảm thiểu rủi ro tài chính.",
    about: {
      overview: [
        "Nợ khó đòi, nợ tồn đọng kéo dài từ các hợp đồng mua bán, xây dựng, vay mượn thương mại luôn gây tắc nghẽn dòng vốn và đe dọa trực tiếp sự tồn vong của doanh nghiệp và sự ổn định tài chính của cá nhân.",
        "Đức Tín & Cộng sự cam kết thu hồi nợ bằng các biện pháp pháp lý chính quy 100%, tuân thủ nghiêm ngặt chuẩn mực đạo đức nghề nghiệp và quy định của pháp luật Việt Nam. Tuyệt đối không sử dụng các biện pháp trái pháp luật gây ảnh hưởng đến uy tín và an toàn của thân chủ.",
        "Với quy trình bài bản từ xác minh khả năng thanh toán, tài sản tẩu tán, gửi thư khuyến cáo pháp lý (Legal Notice), đàm phán thương lượng cho đến khởi kiện Tòa án, áp dụng biện pháp khẩn cấp tạm thời phong tỏa tài khoản/kê biên tài sản và cưỡng chế thi hành án dứt điểm."
      ],
      keyHighlights: [
        {
          title: "100% Biện Pháp Hợp Pháp",
          desc: "Bảo đảm quy trình pháp lý chuẩn mực, bảo vệ uy tín thương hiệu và an toàn pháp lý tuyệt đối cho thân chủ.",
          icon: "verified_user"
        },
        {
          title: "Xác Minh Tài Sản Chuyên Nghiệp",
          desc: "Truy vết dòng tiền, bất động sản, cổ phần và nguồn thu nhập thực tế của bên có nghĩa vụ trả nợ.",
          icon: "search"
        },
        {
          title: "Áp Dụng Phong Tỏa Kịp Thời",
          desc: "Đề nghị Tòa án phong tỏa tài khoản ngân hàng, tạm dừng xuất cảnh và kê biên tài sản ngăn chặn tẩu tán.",
          icon: "lock"
        }
      ],
      scopes: [
        {
          title: "1. Thẩm định Hồ sơ Nợ & Khả năng Thu hồi",
          items: [
            "Kiểm tra tính pháp lý của hồ sơ công nợ: Hợp đồng, Biên bản đối chiếu công nợ, Hóa đơn VAT, Giấy vay tiền.",
            "Xác minh nhân thân, tình trạng cư trú, tình trạng hoạt động doanh nghiệp và tài sản hiện có của bên nợ."
          ]
        },
        {
          title: "2. Thương lượng, Hòa giải & Gửi Thư Cảnh báo Pháp lý",
          items: [
            "Soạn thảo và gửi Thư khuyến cáo pháp lý (Legal Notice) ấn định thời hạn thanh toán dứt điểm.",
            "Trực tiếp đại diện khách hàng gặp gỡ đối thoại, đàm phán lộ trình trả nợ có bảo đảm bằng tài sản."
          ]
        },
        {
          title: "3. Khởi kiện Tòa án & Yêu cầu Phong tỏa Tài sản",
          items: [
            "Soạn đơn khởi kiện yêu cầu Tòa án hoặc Trung tâm Trọng tài buộc bên nợ trả nợ gốc và lãi chậm thanh toán.",
            "Yêu cầu áp dụng biện pháp khẩn cấp tạm thời: Phong tỏa tài khoản ngân hàng, kê biên tài sản, cấm chuyển dịch tài sản."
          ]
        },
        {
          title: "4. Đại diện Thi hành án Dân sự Thu hồi Tiền",
          items: [
            "Nộp đơn yêu cầu thi hành án và thúc đẩy Cơ quan Thi hành án dân sự tiến hành cưỡng chế, bán đấu giá tài sản bên nợ.",
            "Giám sát việc thu hồi dòng tiền và hoàn trả trực tiếp vào tài khoản của khách hàng."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Thẩm Định & Báo Phí", desc: "Luật sư nghiên cứu hồ sơ công nợ, đánh giá khả năng thu hồi và báo chi phí minh bạch." },
        { step: "02", title: "Gửi Thư Cảnh Báo", desc: "Phát hành văn bản pháp lý chính thức, tạo sức ép pháp lý buộc bên nợ chủ động hợp tác trả tiền." },
        { step: "03", title: "Khởi Kiện & Phong Tỏa", desc: "Nộp đơn khởi kiện, yêu cầu Tòa án phong tỏa tài sản ngăn chặn hành vi tẩu tán tài sản của bên nợ." },
        { step: "04", title: "Thi Hành Án & Thu Tiền", desc: "Phối hợp cùng cơ quan thi hành án kê biên tài sản, hoàn tất thu hồi tối đa công nợ cho thân chủ." }
      ]
    },
    experience: [
      {
        title: "Thu Hồi Thành Công 18 Tỷ Đồng Nợ Khó Đòi Cho Doanh Nghiệp Cung Ứng Vật Liệu Xây Dựng",
        clientType: "Doanh nghiệp Sản xuất Thép",
        result: "Đàm phán và áp dụng biện pháp ngăn chặn kịp thời, thu hồi 100% nợ gốc và 70% tiền lãi sau 45 ngày làm việc.",
        year: "2025",
        summary: "Luật sư Đức Tín phát hiện bên nợ đang chuẩn bị tẩu tán 2 bất động sản và nhanh chóng yêu cầu phong tỏa tài sản bảo đảm."
      },
      {
        title: "Xử Lý Thu Hồi Khoản Vay Thương Mại 6.5 Tỷ Đồng Dây Dưa Qua 3 Năm",
        clientType: "Nhà đầu tư Cá nhân",
        result: "Buộc bên vay ký thỏa thuận chuyển nhượng quyền sử dụng đất để cấn trừ toàn bộ khoản nợ tại phòng công chứng.",
        year: "2024",
        summary: "Tổ chức đàm phán quyết liệt trên cơ sở các chứng cứ vi phạm hợp đồng và nguy cơ bị khởi tố hình sự nếu cố tình lừa đảo."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Quy trình Thu Hồi Nợ Doanh Nghiệp Hợp Pháp & Hiệu Quả Không Vướng Lao Lý",
        date: "25/08/2026",
        readTime: "7 phút đọc",
        excerpt: "Hướng dẫn các bước hợp pháp để thu hồi công nợ quá hạn và thủ tục đề nghị Tòa án phong tỏa tài sản bên nợ."
      }
    ]
  },

  "hinh-su-bao-chua": {
    slug: "hinh-su-bao-chua",
    title: "LUẬT SƯ HÌNH SỰ - BÀO CHỮA",
    category: "Hình sự",
    badge: "Bào Chữa Chuyên Nghiệp 24/7",
    heroDesc: "Tham gia bảo vệ thân chủ ngay từ giai đoạn điều tra, hỏi cung đến khi xét xử. Phân tích chứng cứ, tìm kiếm tình tiết giảm nhẹ để gỡ tội và bảo vệ sự tự do, danh dự của khách hàng.",
    about: {
      overview: [
        "Trong lĩnh vực hình sự, sự tham gia kịp thời của Luật sư ngay từ giai đoạn tạm giữ, lấy lời khai ban đầu có ý nghĩa quyết định đối với số phận pháp lý của bị can, bị cáo.",
        "Đức Tín & Cộng sự quy tụ các luật sư hình sự bản lĩnh, am hiểu sâu sắc quy trình tố tụng hình sự, kiên quyết bác bỏ các chứng cứ buộc tội thiếu căn cứ và bảo vệ tối đa nguyên tắc 'Bất khả xâm phạm về thân thể' và 'Suy đoán vô tội'.",
        "Chúng tôi đại diện tham gia làm việc với Cơ quan Điều tra, Viện Kiểm sát và trực tiếp bào chữa tại Tòa án các cấp để giảm nhẹ trách nhiệm hình sự hoặc minh oan cho thân chủ."
      ],
      keyHighlights: [
        {
          title: "Tham gia Ngay Từ Đầu",
          desc: "Có mặt trong vòng 2 giờ khi nhận thông báo tạm giữ, có mặt trong các buổi hỏi cung để chống bức cung, nhục hình.",
          icon: "gavel"
        },
        {
          title: "Bào chữa Kinh tế & Chức vụ",
          desc: "Chuyên sâu các vụ án kinh tế, quản lý tài sản, thuế, ngân hàng và tội phạm chức vụ.",
          icon: "balance"
        },
        {
          title: "Bảo lãnh & Tại ngoại",
          desc: "Thực hiện thủ tục xin bảo lãnh, thay đổi biện pháp ngăn chặn từ tạm giam sang cấm đi khỏi nơi cư trú.",
          icon: "verified_user"
        }
      ],
      scopes: [
        {
          title: "1. Bào chữa Giai đoạn Điều tra & Truy tố",
          items: [
            "Tham gia các buổi lấy lời khai, hỏi cung bị can cùng Điều tra viên và Kiểm sát viên.",
            "Soạn đơn xin bảo lãnh cho bị can được tại ngoại, đơn khiếu nại hành vi tố tụng vi phạm pháp luật."
          ]
        },
        {
          title: "2. Bào chữa Phiên tòa Sơ thẩm & Phúc thẩm",
          items: [
            "Nghiên cứu sao chụp hồ sơ vụ án, thu thập chứng cứ gỡ tội và giảm nhẹ trách nhiệm hình sự.",
            "Tranh luận phản biện luận cứ buộc tội của Viện Kiểm sát tại phiên tòa xét xử công khai."
          ]
        },
        {
          title: "3. Hỗ trợ Người bị hại & Nguyên đơn Dân sự",
          items: [
            "Đại diện người bị hại yêu cầu khởi tố vụ án, thu thập chứng cứ đòi bồi thường thiệt hại về sức khỏe, tính mạng, tài sản."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tiếp nhận Thông tin 24/7", desc: "Luật sư trực tiếp làm việc với gia đình, tiếp nhận thông tin giam giữ khẩn cấp." },
        { step: "02", title: "Đăng ký Bào chữa", desc: "Nộp thủ tục đăng ký người bào chữa tại Cơ quan điều tra / Viện kiểm sát." },
        { step: "03", title: "Tham gia Tố tụng", desc: "Trực tiếp gặp bị giam, tham gia hỏi cung và thu thập tài liệu chứng cứ gỡ tội." },
        { step: "04", title: "Tranh tụng tại Tòa", desc: "Trình bày bản luận cứ bào chữa đanh thép tại Tòa án bảo vệ thân chủ." }
      ]
    },
    experience: [
      {
        title: "Bào chữa Thành công Chuyển Tội danh Vụ án Kinh tế 30 Tỷ Đồng",
        clientType: "Giám đốc Doanh nghiệp XNK",
        result: "Hội đồng xét xử chấp nhận luận cứ của Luật sư Đức Tín, chuyển khung hình phạt và tuyên án treo cho thân chủ.",
        year: "2025",
        summary: "Chứng minh thân chủ không có ý thức chiếm đoạt mà do rủi ro dòng tiền thương mại."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Quyền của Bị can, Bị cáo và Vai trò của Luật sư Bào chữa Hình sự",
        date: "14/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Những điều cần biết về quyền giữ im lặng, quyền yêu cầu luật sư có mặt khi lấy lời khai."
      }
    ]
  },

  "so-huu-tri-tue": {
    slug: "so-huu-tri-tue",
    title: "SỞ HỮU TRÍ TUỆ",
    category: "Sở hữu trí tuệ",
    badge: "Bảo Hộ Độc Quyền Brand 2026",
    heroDesc: "Tra cứu, đăng ký độc quyền Nhãn hiệu, Logo, Sáng chế, Kiểu dáng công nghiệp. Xử lý triệt để các hành vi xâm phạm, làm nhái thương hiệu, giúp khách hàng an tâm xây dựng tài sản trí tuệ.",
    about: {
      overview: [
        "Thương hiệu, kiểu dáng sản phẩm, phần mềm và bí mật kinh doanh là những tài sản vô hình vô giá của doanh nghiệp trong kỷ nguyên số.",
        "Đức Tín & Cộng sự là Tổ chức Đại diện Sở hữu Trí tuệ uy tín, cung cấp chiến lược bảo hộ toàn diện từ việc đăng ký nhãn hiệu nội địa, đăng ký quốc tế theo Hệ thống Madrid, đến việc giám sát thị trường và phát hiện hàng giả, hàng nhái.",
        "Chúng tôi đại diện cho các tập đoàn thương hiệu bảo vệ độc quyền thương hiệu trước Cục Sở hữu Trí tuệ và khởi kiện hành vi xâm phạm bản quyền tại Tòa án."
      ],
      keyHighlights: [
        {
          title: "Tra cứu Khả năng Bảo hộ Tốc độ",
          desc: "Đánh giá khả năng đăng ký nhãn hiệu chính xác 95% trước khi nộp đơn chính thức.",
          icon: "search"
        },
        {
          title: "Bảo hộ Quốc tế Đa quốc gia",
          desc: "Đăng ký nhãn hiệu toàn cầu tại Mỹ, EU, Nhật Bản, Trung Quốc và Đông Nam Á.",
          icon: "public"
        },
        {
          title: "Xử lý Xâm phạm Thương hiệu",
          desc: "Phối hợp với Quản lý thị trường, Thanh tra Khoa học Công nghệ thu hồi và tiêu hủy hàng giả.",
          icon: "security"
        }
      ],
      scopes: [
        {
          title: "1. Đăng ký Nhãn hiệu, Logo & Kiểu dáng Công nghiệp",
          items: [
            "Tra cứu sơ bộ và tra cứu chuyên sâu khả năng bảo hộ của Nhãn hiệu/Logo.",
            "Soạn hồ sơ và đại diện nộp đơn đăng ký nhãn hiệu, kiểu dáng công nghiệp, bằng sáng chế tại Cục SHTT."
          ]
        },
        {
          title: "2. Đăng ký Bản quyền Tác giả & Phần mềm",
          items: [
            "Đăng ký bản quyền tác giả cho phần mềm máy tính, giao diện website, tác phẩm mỹ thuật ứng dụng, sách và bài viết."
          ]
        },
        {
          title: "3. Xử lý Vi phạm & Tranh chấp Sở hữu Trí tuệ",
          items: [
            "Gửi Thư khuyến cáo (Cease & Desist Letter) yêu cầu bên vi phạm chấm dứt sử dụng nhãn hiệu trùng/tương tự.",
            "Yêu cầu xử phạt hành chính hoặc khởi kiện ra Tòa án đòi bồi thường thiệt hại vi phạm bản quyền."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tra cứu & Đánh giá", desc: "Tra cứu khả năng trùng lặp nhãn hiệu trên cơ sở dữ liệu của Cục SHTT và WIPO." },
        { step: "02", title: "Nộp Đơn & Lấy Số Đơn", desc: "Nộp đơn chính thức và bàn giao Giấy tiếp nhận đơn có ngày ưu tiên cho khách hàng." },
        { step: "03", title: "Theo dõi & Phản hồi", desc: "Theo dõi thẩm định hình thức, thẩm định nội dung và phản hồi các ý kiến của Cục SHTT." },
        { step: "04", title: "Bàn giao Văn bằng", desc: "Nhận Giấy chứng nhận Đăng ký Nhãn hiệu độc quyền 10 năm và tư vấn gia hạn." }
      ]
    },
    experience: [
      {
        title: "Bảo hộ Độc quyền Thành công Nhãn hiệu Chuỗi Mỹ phẩm 50 Chi nhánh",
        clientType: "Thương hiệu Dược mỹ phẩm",
        result: "Nhận Bằng bảo hộ độc quyền nhóm 03 và nhóm 35 sau 12 tháng thẩm định nghiêm ngặt.",
        year: "2025",
        summary: "Vượt qua 2 thông báo dự định từ chối do tương tự với nhãn hiệu đã bảo hộ."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Kinh nghiệm Đăng ký Bảo hộ Nhãn hiệu và Bảo vệ Thương hiệu Trên Nền tảng Số",
        date: "16/08/2026",
        readTime: "5 phút đọc",
        excerpt: "Các bước xử lý khi bị đối thủ gỡ logo, làm giả sản phẩm bán trên các sàn TMĐT."
      }
    ]
  }
};
