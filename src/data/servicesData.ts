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
    badge: "Cố vấn pháp lý thường xuyên",
    heroDesc: "Tư vấn pháp luật thường xuyên, quản trị doanh nghiệp, xây dựng điều lệ và quy chế nội bộ, soạn thảo và rà soát hợp đồng kinh doanh thương mại, giải quyết tranh chấp nội bộ doanh nghiệp.",
    about: {
      overview: [
        "Am hiểu cả khung pháp lý về doanh nghiệp lẫn thực tiễn kinh doanh tại Việt Nam giúp các luật sư của Đức Tín & Cộng sự đưa ra ý kiến tư vấn sát với mô hình hoạt động của từng doanh nghiệp, ở mọi giai đoạn phát triển.",
        "Bên cạnh các giao dịch mua bán, sáp nhập và huy động vốn, chúng tôi đồng hành cùng Quý doanh nghiệp trong hoạt động thường nhật: quản trị nội bộ, rà soát hợp đồng, quản lý lao động, sở hữu trí tuệ và tuân thủ pháp luật. Trọng tâm là nhận diện và phòng ngừa rủi ro pháp lý từ sớm, hạn chế khả năng phát sinh tranh chấp.",
        "Đức Tín & Cộng sự cung cấp góc nhìn pháp lý tổng thể và cách tiếp cận chủ động, giúp Hội đồng quản trị, Hội đồng thành viên và Ban điều hành triển khai kế hoạch kinh doanh đúng quy định pháp luật."
      ],
      keyHighlights: [
        {
          title: "Phòng ngừa rủi ro chủ động",
          desc: "Rà soát định kỳ hồ sơ pháp lý, phát hiện và khắc phục điểm chưa phù hợp trước khi phát sinh tranh chấp hoặc bị xử phạt.",
          icon: "security"
        },
        {
          title: "Đồng hành như bộ phận pháp chế",
          desc: "Tiếp nhận và phản hồi văn bản, hợp đồng, câu hỏi pháp lý của doanh nghiệp theo thời hạn thỏa thuận trong hợp đồng dịch vụ.",
          icon: "support_agent"
        },
        {
          title: "Bảo mật & chi phí hợp lý",
          desc: "Bảo mật thông tin kinh doanh theo quy định nghề nghiệp luật sư; chi phí cố vấn theo gói, phù hợp với quy mô doanh nghiệp.",
          icon: "verified_user"
        }
      ],
      scopes: [
        {
          title: "1. Quản trị nội bộ & cơ cấu cổ đông, thành viên",
          items: [
            "Xây dựng, sửa đổi Điều lệ công ty; Quy chế hoạt động của Hội đồng quản trị, Hội đồng thành viên và Ban điều hành.",
            "Tư vấn trình tự triệu tập, tổ chức họp Đại hội đồng cổ đông, Hội đồng thành viên; soạn thảo biên bản và nghị quyết, quyết định.",
            "Tư vấn giải quyết bất đồng giữa các cổ đông, thành viên; bảo vệ quyền lợi hợp pháp của cổ đông sáng lập và cổ đông thiểu số."
          ]
        },
        {
          title: "2. Soạn thảo & rà soát hợp đồng thương mại",
          items: [
            "Soạn thảo, rà soát hợp đồng hợp tác kinh doanh (BCC), mua bán hàng hóa, phân phối, nhượng quyền thương mại.",
            "Đánh giá tính pháp lý của giao dịch có giá trị lớn, các điều khoản phạt vi phạm, bồi thường thiệt hại và cơ quan giải quyết tranh chấp."
          ]
        },
        {
          title: "3. Pháp chế lao động trong doanh nghiệp",
          items: [
            "Soạn thảo Nội quy lao động, Thỏa ước lao động tập thể và thực hiện thủ tục đăng ký với cơ quan quản lý nhà nước về lao động.",
            "Xây dựng mẫu hợp đồng lao động, thỏa thuận bảo mật thông tin (NDA) và thỏa thuận không cạnh tranh.",
            "Tư vấn xử lý kỷ luật lao động, chấm dứt hợp đồng lao động đúng trình tự, hạn chế rủi ro phải bồi thường."
          ]
        },
        {
          title: "4. Tuân thủ pháp luật & giấy phép hoạt động",
          items: [
            "Tư vấn tuân thủ pháp luật về cạnh tranh, bảo vệ quyền lợi người tiêu dùng và bảo vệ dữ liệu cá nhân.",
            "Đại diện thực hiện thủ tục thay đổi nội dung đăng ký doanh nghiệp, chia, tách, hợp nhất, sáp nhập và tái cơ cấu vốn."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Khảo sát hiện trạng", desc: "Luật sư tìm hiểu mô hình hoạt động, rà soát hệ thống tài liệu và văn bản nội bộ hiện hành." },
        { step: "02", title: "Báo cáo đánh giá rủi ro", desc: "Chỉ rõ các điểm chưa phù hợp với quy định pháp luật và đề xuất lộ trình chuẩn hóa." },
        { step: "03", title: "Triển khai & chuẩn hóa", desc: "Soạn thảo, hiệu chỉnh hợp đồng mẫu, quy chế nội bộ và biểu mẫu vận hành." },
        { step: "04", title: "Cố vấn thường xuyên", desc: "Giải đáp vướng mắc phát sinh, tham gia các buổi đàm phán quan trọng cùng Ban điều hành." }
      ]
    },
    experience: [
      {
        title: "Tư vấn tái cấu trúc và chuẩn hóa quản trị nội bộ cho chuỗi nhà hàng",
        clientType: "Doanh nghiệp chuỗi F&B",
        result: "Chuẩn hóa hệ thống hợp đồng nhượng quyền và thỏa thuận cổ đông trước khi doanh nghiệp gọi vốn.",
        year: "2025 - 2026",
        summary: "Rà soát Điều lệ, chương trình phát hành cổ phần cho người lao động (ESOP) và tư vấn cơ cấu công ty mẹ - công ty con."
      },
      {
        title: "Rà soát hợp đồng cung ứng và phân phối với đối tác nước ngoài",
        clientType: "Doanh nghiệp sản xuất linh kiện cơ khí",
        result: "Đàm phán sửa đổi các điều khoản miễn trừ trách nhiệm bất lợi cho thân chủ trong hợp đồng có giá trị lớn.",
        year: "2025",
        summary: "Tư vấn sửa đổi các điều khoản trọng yếu về bảo hành, chậm thanh toán và lựa chọn trọng tài thương mại."
      },
      {
        title: "Tư vấn giải quyết bất đồng cổ đông và chuyển nhượng cổ phần sáng lập",
        clientType: "Công ty cổ phần công nghệ tài chính",
        result: "Các bên thỏa thuận được phương án thoái vốn mà không cần đưa vụ việc ra Tòa án.",
        year: "2024",
        summary: "Thiết kế lộ trình thanh toán nhiều giai đoạn kèm cam kết bảo mật và chuyển giao công nghệ."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Cẩm nang Pháp lý Doanh nghiệp 2026: Rà soát Hợp đồng & Phòng ngừa Rủi ro Nội bộ",
        date: "15/09/2026",
        readTime: "7 phút đọc",
        excerpt: "Năm trọng điểm pháp lý giúp ban lãnh đạo doanh nghiệp rà soát hợp đồng, phòng ngừa tranh chấp cổ đông và bảo vệ bí mật kinh doanh."
      },
      {
        slug: "cam-nang-tranh-chap-hop-dong-va-thu-hoi-no-doanh-nghiep-2026",
        title: "Cẩm Nang Pháp Lý Toàn Diện Về Tranh Chấp Hợp Đồng Kinh Tế & Thu Hồi Nợ Doanh Nghiệp 2026",
        date: "25/08/2026",
        readTime: "10 phút đọc",
        excerpt: "Mười giai đoạn từ thẩm định công nợ, gửi thư yêu cầu thanh toán, áp dụng biện pháp khẩn cấp tạm thời đến thi hành án."
      }
    ]
  },

  // 2. TƯ VẤN ĐẦU TƯ
  "tu-van-dau-tu": {
    slug: "tu-van-dau-tu",
    title: "TƯ VẤN ĐẦU TƯ",
    category: "Đầu tư",
    badge: "Đầu tư nước ngoài & M&A",
    heroDesc: "Tư vấn đầu tư, thành lập tổ chức kinh tế có vốn đầu tư nước ngoài, chuyển nhượng cổ phần, phần vốn góp, mua bán và sáp nhập doanh nghiệp (M&A), thủ tục cấp phép dự án đầu tư.",
    about: {
      overview: [
        "Đức Tín & Cộng sự đồng hành cùng các nhà đầu tư nước ngoài đến từ Nhật Bản, Hàn Quốc, Singapore, Hoa Kỳ và châu Âu khi đầu tư vào thị trường Việt Nam.",
        "Chúng tôi tham gia từ giai đoạn chuẩn bị đầu tư: phân tích điều kiện tiếp cận thị trường, lựa chọn địa điểm, thẩm định pháp lý dự án (Due Diligence), đàm phán hợp đồng liên doanh, cho đến hoàn tất thủ tục cấp Giấy chứng nhận đăng ký đầu tư (IRC) và Giấy chứng nhận đăng ký doanh nghiệp (ERC).",
        "Chúng tôi xây dựng lộ trình thủ tục rõ ràng, chủ động làm việc với cơ quan có thẩm quyền và tư vấn để nhà đầu tư được hưởng đầy đủ các ưu đãi đầu tư mà dự án đáp ứng điều kiện theo quy định hiện hành."
      ],
      keyHighlights: [
        {
          title: "Am hiểu điều kiện tiếp cận thị trường",
          desc: "Nắm vững cam kết WTO và các hiệp định thương mại tự do (CPTPP, EVFTA) về tỷ lệ sở hữu và điều kiện đầu tư của nhà đầu tư nước ngoài.",
          icon: "public"
        },
        {
          title: "Thẩm định pháp lý dự án",
          desc: "Đánh giá tình trạng pháp lý về đất đai, môi trường, quy hoạch và nghĩa vụ thuế trước khi nhà đầu tư quyết định góp vốn.",
          icon: "fact_check"
        },
        {
          title: "Kinh nghiệm làm việc với cơ quan quản lý",
          desc: "Kinh nghiệm thực hiện thủ tục tại cơ quan đăng ký đầu tư, Ban quản lý các khu công nghiệp, khu kinh tế.",
          icon: "hub"
        }
      ],
      scopes: [
        {
          title: "1. Thành lập tổ chức kinh tế có vốn đầu tư nước ngoài",
          items: [
            "Tư vấn cơ cấu vốn, ngành nghề đầu tư kinh doanh có điều kiện và tỷ lệ sở hữu của nhà đầu tư nước ngoài.",
            "Soạn thảo hồ sơ đề xuất dự án đầu tư; thực hiện thủ tục cấp IRC, ERC cho doanh nghiệp 100% vốn nước ngoài hoặc liên doanh."
          ]
        },
        {
          title: "2. Góp vốn, mua cổ phần, mua phần vốn góp",
          items: [
            "Thẩm định pháp lý (Due Diligence) doanh nghiệp mục tiêu tại Việt Nam.",
            "Thực hiện thủ tục đăng ký góp vốn, mua cổ phần, mua phần vốn góp của nhà đầu tư nước ngoài tại cơ quan đăng ký đầu tư.",
            "Soạn thảo hợp đồng chuyển nhượng cổ phần (SPA) và thỏa thuận cổ đông (SHA)."
          ]
        },
        {
          title: "3. Thuê đất khu công nghiệp & pháp lý xây dựng",
          items: [
            "Rà soát hợp đồng thuê lại đất, thỏa thuận nguyên tắc với chủ đầu tư kinh doanh hạ tầng khu công nghiệp.",
            "Tư vấn thủ tục về đánh giá tác động môi trường, phòng cháy chữa cháy và giấy phép xây dựng nhà máy."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tư vấn chuẩn bị đầu tư", desc: "Phân tích điều kiện thị trường, địa điểm, ngành nghề và ưu đãi đầu tư có thể áp dụng." },
        { step: "02", title: "Thẩm định pháp lý", desc: "Đánh giá rủi ro về đất đai, giấy phép, lao động và tài chính của đối tác hoặc doanh nghiệp mục tiêu." },
        { step: "03", title: "Thủ tục cấp phép đầu tư", desc: "Soạn thảo hồ sơ và đại diện làm việc với cơ quan có thẩm quyền." },
        { step: "04", title: "Hỗ trợ sau cấp phép", desc: "Mở tài khoản vốn đầu tư trực tiếp, thực hiện các nghĩa vụ báo cáo và hỗ trợ dự án đi vào hoạt động." }
      ]
    },
    experience: [
      {
        title: "Tư vấn cấp phép dự án nhà máy sản xuất linh kiện điện tử",
        clientType: "Nhà đầu tư Hàn Quốc",
        result: "Hoàn tất thủ tục cấp IRC và ERC cho dự án trong khu công nghiệp và hướng dẫn thủ tục hưởng ưu đãi thuế TNDN theo quy định.",
        year: "2025",
        summary: "Tư vấn đàm phán hợp đồng thuê lại đất trong khu công nghiệp và thủ tục liên quan đến quy hoạch tổng mặt bằng."
      },
      {
        title: "Tư vấn giao dịch nhận chuyển nhượng cổ phần chi phối doanh nghiệp chế biến nông sản",
        clientType: "Quỹ đầu tư nước ngoài",
        result: "Báo cáo thẩm định pháp lý chỉ ra các rủi ro về đất nông nghiệp, làm cơ sở để thân chủ đàm phán lại giá và điều khoản giao dịch.",
        year: "2024 - 2025",
        summary: "Thực hiện thủ tục đăng ký mua cổ phần của nhà đầu tư nước ngoài và thay đổi người đại diện theo pháp luật."
      }
    ],
    articles: [
      {
        slug: "cam-nang-ma-va-mua-ban-doanh-nghiep-2026",
        title: "Cẩm Nang Toàn Diện Về M&A & Mua Bán Doanh Nghiệp 2026: 8 Bước Thẩm Định Pháp Lý & Ký Kết Hợp Đồng",
        date: "08/09/2026",
        readTime: "10 phút đọc",
        excerpt: "Tám giai đoạn từ thẩm định pháp lý, đàm phán hợp đồng SPA, xử lý rủi ro thuế - lao động đến thủ tục chuyển nhượng vốn."
      },
      {
        slug: "thu-tuc-dau-tu-ra-nuoc-ngoai-va-dang-ky-giao-dich-ngoai-hoi",
        title: "Thủ Tục Đầu Tư Ra Nước Ngoài & Đăng Ký Giao Dịch Ngoại Hối 2026",
        date: "01/09/2026",
        readTime: "9 phút đọc",
        excerpt: "Điều kiện miễn Giấy chứng nhận đăng ký đầu tư ra nước ngoài, đăng ký giao dịch ngoại hối, tài khoản vốn đầu tư và nghĩa vụ chuyển lợi nhuận về nước."
      }
    ]
  },

  // 3. THỦ TỤC PHÁP LÝ - GIẤY PHÉP
  "thu-tuc-phap-ly-giay-phep": {
    slug: "thu-tuc-phap-ly-giay-phep",
    title: "THỦ TỤC PHÁP LÝ - GIẤY PHÉP",
    category: "Hành chính",
    badge: "Thủ tục rõ ràng, đúng hạn",
    heroDesc: "Thành lập doanh nghiệp, thay đổi nội dung đăng ký doanh nghiệp, thủ tục đầu tư và giấy phép đối với ngành nghề kinh doanh có điều kiện (an toàn thực phẩm, phòng cháy chữa cháy, an ninh trật tự, công bố sản phẩm).",
    about: {
      overview: [
        "Với ngành nghề kinh doanh có điều kiện, việc đáp ứng đầy đủ điều kiện và có giấy phép theo quy định là cơ sở để doanh nghiệp hoạt động hợp pháp, tránh bị xử phạt hoặc đình chỉ hoạt động.",
        "Đức Tín & Cộng sự hỗ trợ từ khâu khảo sát thực tế cơ sở, tư vấn hoàn thiện điều kiện kỹ thuật, đến soạn thảo hồ sơ và đại diện làm việc với cơ quan nhà nước có thẩm quyền.",
        "Chúng tôi xây dựng lộ trình thủ tục rõ ràng, báo phí minh bạch ngay từ đầu, giúp Quý khách chủ động về thời gian và chi phí."
      ],
      keyHighlights: [
        {
          title: "Xử lý hồ sơ đúng hạn",
          desc: "Lập kế hoạch thủ tục cụ thể, theo dõi sát tiến độ giải quyết hồ sơ tại cơ quan có thẩm quyền.",
          icon: "timer"
        },
        {
          title: "Khảo sát cơ sở thực tế",
          desc: "Chuyên viên pháp lý khảo sát cơ sở, hướng dẫn hoàn thiện điều kiện trước khi cơ quan chức năng kiểm tra.",
          icon: "location_on"
        },
        {
          title: "Báo phí minh bạch",
          desc: "Báo giá rõ ràng trước khi thực hiện, tách bạch phí dịch vụ pháp lý và lệ phí nộp ngân sách nhà nước.",
          icon: "payments"
        }
      ],
      scopes: [
        {
          title: "1. Thành lập doanh nghiệp & thay đổi đăng ký doanh nghiệp",
          items: [
            "Thành lập công ty TNHH, công ty cổ phần, doanh nghiệp tư nhân; đăng ký hộ kinh doanh.",
            "Thay đổi ngành nghề kinh doanh, tăng hoặc giảm vốn điều lệ, thay đổi người đại diện theo pháp luật, chuyển đổi loại hình doanh nghiệp."
          ]
        },
        {
          title: "2. Giấy phép đối với ngành nghề kinh doanh có điều kiện",
          items: [
            "Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm.",
            "Giấy phép bán lẻ rượu, sản phẩm thuốc lá; hồ sơ kinh doanh dịch vụ lưu trú, dịch vụ xoa bóp.",
            "Giấy chứng nhận đủ điều kiện về an ninh, trật tự; thủ tục về phòng cháy và chữa cháy."
          ]
        },
        {
          title: "3. Đăng ký sở hữu trí tuệ & mã số mã vạch",
          items: [
            "Tra cứu khả năng bảo hộ và nộp đơn đăng ký nhãn hiệu, kiểu dáng công nghiệp tại Cục Sở hữu trí tuệ; đăng ký quyền tác giả.",
            "Đăng ký mã số mã vạch; tự công bố hoặc đăng ký bản công bố sản phẩm thực phẩm, mỹ phẩm."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tư vấn & rà soát điều kiện", desc: "Kiểm tra điều kiện kinh doanh theo quy định hiện hành của ngành nghề dự kiến." },
        { step: "02", title: "Hoàn thiện hồ sơ & cơ sở", desc: "Soạn thảo hồ sơ, hướng dẫn chuẩn bị cơ sở vật chất đáp ứng điều kiện." },
        { step: "03", title: "Nộp hồ sơ & làm việc với đoàn kiểm tra", desc: "Đại diện nộp hồ sơ và đồng hành cùng Quý khách khi cơ quan nhà nước kiểm tra thực tế." },
        { step: "04", title: "Nhận kết quả", desc: "Nhận giấy phép và tư vấn các nghĩa vụ cần duy trì sau khi được cấp phép." }
      ]
    },
    experience: [
      {
        title: "Thực hiện thủ tục giấy phép cho chuỗi cửa hàng tiện lợi",
        clientType: "Doanh nghiệp bán lẻ thực phẩm",
        result: "Hoàn tất Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm và giấy phép bán lẻ rượu, thuốc lá cho các điểm bán theo kế hoạch khai trương.",
        year: "2025",
        summary: "Khảo sát và hoàn thiện hồ sơ cho từng điểm kinh doanh tại TP. Hồ Chí Minh."
      },
      {
        title: "Đại diện đăng ký nhãn hiệu cho doanh nghiệp dược mỹ phẩm",
        clientType: "Công ty dược phẩm",
        result: "Cục Sở hữu trí tuệ cấp Giấy chứng nhận đăng ký nhãn hiệu sau khi xử lý ý kiến phản đối đơn của bên thứ ba.",
        year: "2024",
        summary: "Soạn thảo văn bản trả lời, chứng minh khả năng phân biệt của nhãn hiệu thân chủ."
      }
    ],
    articles: [
      {
        slug: "cam-nang-phap-ly-doanh-nghiep-2026",
        title: "Cẩm nang Pháp lý Doanh nghiệp 2026: Rà soát Hợp đồng & Phòng ngừa Rủi ro Nội bộ",
        date: "15/09/2026",
        readTime: "7 phút đọc",
        excerpt: "Năm trọng điểm pháp lý giúp ban lãnh đạo doanh nghiệp rà soát hợp đồng, phòng ngừa tranh chấp cổ đông và bảo vệ bí mật kinh doanh."
      }
    ]
  },

  // 4. DI CHÚC - THỪA KẾ
  "di-chuc-thua-ke": {
    slug: "di-chuc-thua-ke",
    title: "DI CHÚC - THỪA KẾ",
    category: "Thừa kế",
    badge: "Tư vấn di sản tận tâm",
    heroDesc: "Tư vấn lập di chúc hợp pháp, gửi giữ di chúc, khai nhận di sản, thỏa thuận phân chia di sản thừa kế, xác định thừa kế thế vị và giải quyết tranh chấp thừa kế tại Tòa án.",
    about: {
      overview: [
        "Di chúc và thừa kế là lĩnh vực nhạy cảm, gắn với tài sản gia đình và quan hệ giữa những người thân. Sai sót về hình thức hoặc nội dung có thể khiến di chúc bị tuyên bố vô hiệu, dẫn đến tranh chấp kéo dài.",
        "Đức Tín & Cộng sự tư vấn lập di chúc đúng quy định pháp luật, thể hiện đầy đủ ý chí của người lập di chúc và hạn chế nguy cơ tranh chấp về sau.",
        "Chúng tôi hỗ trợ từ khâu soạn thảo di chúc, công chứng, khai nhận di sản, thỏa thuận phân chia di sản đến đại diện bảo vệ quyền lợi hợp pháp của thân chủ tại Tòa án khi phát sinh tranh chấp."
      ],
      keyHighlights: [
        {
          title: "Di chúc đúng quy định pháp luật",
          desc: "Rà soát chặt chẽ các điều kiện để di chúc hợp pháp theo Bộ luật Dân sự 2015, hạn chế nguy cơ bị yêu cầu tuyên bố vô hiệu.",
          icon: "verified_user"
        },
        {
          title: "Phân chia di sản minh bạch",
          desc: "Hỗ trợ khai nhận, thỏa thuận phân chia di sản là quyền sử dụng đất, nhà ở, cổ phần, phần vốn góp đúng trình tự.",
          icon: "assignment"
        },
        {
          title: "Bảo mật & thấu tình đạt lý",
          desc: "Bảo mật nội dung di chúc; hỗ trợ giải quyết bất đồng trong gia đình trên tinh thần đối thoại, hòa giải.",
          icon: "family_restroom"
        }
      ],
      scopes: [
        {
          title: "1. Tư vấn & soạn thảo di chúc",
          items: [
            "Soạn thảo di chúc bằng văn bản, thực hiện công chứng hoặc chứng thực theo quy định.",
            "Tư vấn chỉ định người thừa kế, xác định tài sản chung và tài sản riêng, di tặng, giao nghĩa vụ cho người thừa kế.",
            "Hỗ trợ lập di chúc tại nơi cư trú hoặc cơ sở y tế đối với người cao tuổi, người hạn chế khả năng đi lại."
          ]
        },
        {
          title: "2. Khai nhận & phân chia di sản thừa kế",
          items: [
            "Thực hiện thủ tục khai nhận di sản theo di chúc hoặc theo pháp luật tại tổ chức hành nghề công chứng.",
            "Soạn thảo và công chứng văn bản thỏa thuận phân chia di sản giữa những người thừa kế.",
            "Đại diện thực hiện thủ tục đăng ký biến động đất đai, sang tên nhà ở và chuyển quyền sở hữu cổ phần, phần vốn góp được thừa kế."
          ]
        },
        {
          title: "3. Giải quyết tranh chấp thừa kế tại Tòa án",
          items: [
            "Yêu cầu Tòa án tuyên bố di chúc vô hiệu do giả mạo, do người lập di chúc bị lừa dối, đe dọa, cưỡng ép hoặc không đáp ứng điều kiện hợp pháp.",
            "Khởi kiện chia di sản thừa kế; yêu cầu xem xét công sức quản lý, giữ gìn, tôn tạo di sản.",
            "Bảo vệ quyền của người thừa kế không phụ thuộc vào nội dung di chúc: con chưa thành niên, cha, mẹ, vợ, chồng; con thành niên mà không có khả năng lao động."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Thẩm định pháp lý tài sản", desc: "Kiểm tra giấy tờ chứng minh quyền sở hữu, quyền sử dụng và xác định phạm vi di sản." },
        { step: "02", title: "Soạn thảo di chúc", desc: "Soạn thảo di chúc chặt chẽ, thể hiện đầy đủ và chính xác ý chí của người lập di chúc." },
        { step: "03", title: "Công chứng & gửi giữ", desc: "Hỗ trợ công chứng và gửi giữ di chúc tại tổ chức hành nghề công chứng." },
        { step: "04", title: "Công bố & khai nhận di sản", desc: "Hỗ trợ công bố di chúc, khai nhận di sản và đăng ký sang tên cho người thừa kế." }
      ]
    },
    experience: [
      {
        title: "Tư vấn lập di chúc đối với khối tài sản nhà đất và cổ phần doanh nghiệp",
        clientType: "Doanh nhân lĩnh vực bất động sản",
        result: "Hoàn tất lập và công chứng di chúc, kèm phương án quản lý phần cổ phần nhằm hạn chế tranh chấp quyền điều hành công ty.",
        year: "2025 - 2026",
        summary: "Tư vấn sửa đổi Điều lệ và quy chế biểu quyết của doanh nghiệp để thống nhất với nội dung di chúc."
      },
      {
        title: "Đại diện người thừa kế định cư ở nước ngoài trong tranh chấp di sản là quyền sử dụng đất",
        clientType: "Người Việt Nam định cư ở nước ngoài",
        result: "Tòa án chấp nhận yêu cầu chia di sản, xác định kỷ phần thừa kế của thân chủ theo pháp luật.",
        year: "2025",
        summary: "Thu thập giấy tờ hộ tịch và chứng cứ về đóng góp tạo lập tài sản để bảo vệ kỷ phần thừa kế của thân chủ."
      }
    ],
    articles: [
      {
        slug: "huong-dan-thu-tuc-khai-nhan-va-phan-chia-di-san-thua-ke-nha-dat-2026",
        title: "Cẩm Nang Hướng Dẫn Thủ Tục Khai Nhận & Phân Chia Di Sản Thừa Kế Nhà Đất Năm 2026",
        date: "20/10/2026",
        readTime: "8 phút đọc",
        excerpt: "Quy trình 5 bước khai nhận và phân chia di sản thừa kế quyền sử dụng đất theo Bộ luật Dân sự 2015 và Luật Đất đai 2024, kèm biểu mẫu."
      },
      {
        slug: "bo-mat-co-con-rieng-con-rieng-co-duoc-huong-thua-8023",
        title: "Bố Mất Có Con Riêng: Con Riêng Có Được Hưởng Thừa Kế Đất Đai?",
        date: "02/10/2026",
        readTime: "5 phút đọc",
        excerpt: "Luật sư giải đáp quyền hưởng di sản của con riêng theo Bộ luật Dân sự 2015."
      },
      {
        slug: "quyen-thua-ke-va-cac-giay-to-phap-ly-quy-dinh-pha-1512",
        title: "Quyền thừa kế và các giấy tờ pháp lý: Quy Định Pháp Luật Mới Nhất?",
        date: "02/10/2026",
        readTime: "5 phút đọc",
        excerpt: "Luật sư giải đáp về quyền thừa kế và hồ sơ, giấy tờ cần chuẩn bị khi khai nhận di sản."
      }
    ]
  },

  // 5. DÂN SỰ
  "dan-su": {
    slug: "dan-su",
    title: "DÂN SỰ",
    category: "Dân sự",
    badge: "Bảo vệ quyền dân sự",
    heroDesc: "Tư vấn và giải quyết tranh chấp đất đai, hợp đồng mua bán, hợp đồng vay tài sản, yêu cầu bồi thường thiệt hại ngoài hợp đồng, xác định quan hệ nhân thân và các giao dịch dân sự khác.",
    about: {
      overview: [
        "Quan hệ dân sự hiện diện trong mọi mặt đời sống: mua bán, vay, mượn tài sản, bồi thường thiệt hại, ủy quyền, cầm cố, thế chấp cho đến các quyền nhân thân của mỗi cá nhân.",
        "Khi quyền và lợi ích hợp pháp bị xâm phạm, sự am hiểu Bộ luật Dân sự, Bộ luật Tố tụng dân sự và kỹ năng thu thập chứng cứ của luật sư giúp thân chủ bảo vệ tài sản, danh dự của mình một cách hiệu quả.",
        "Đức Tín & Cộng sự cung cấp giải pháp từ tư vấn phòng ngừa rủi ro khi giao kết hợp đồng, thương lượng, hòa giải đến đại diện khởi kiện và hỗ trợ thi hành án dân sự."
      ],
      keyHighlights: [
        {
          title: "Bảo vệ quyền lợi hợp pháp",
          desc: "Đại diện giải quyết tranh chấp về hợp đồng, tài sản, nghĩa vụ trả nợ và bồi thường thiệt hại.",
          icon: "balance"
        },
        {
          title: "Ưu tiên thương lượng, hòa giải",
          desc: "Ưu tiên đối thoại, thương lượng để giải quyết dứt điểm vụ việc, tiết kiệm thời gian và chi phí cho thân chủ.",
          icon: "handshake"
        },
        {
          title: "Tranh tụng chặt chẽ",
          desc: "Trực tiếp tham gia tố tụng tại Tòa án, xây dựng luận cứ dựa trên chứng cứ và căn cứ pháp luật.",
          icon: "gavel"
        }
      ],
      scopes: [
        {
          title: "1. Tranh chấp hợp đồng dân sự & nghĩa vụ trả nợ",
          items: [
            "Hợp đồng vay tài sản, mua bán tài sản, tặng cho tài sản, thuê tài sản, mượn tài sản.",
            "Yêu cầu thanh toán nợ gốc, lãi theo quy định của pháp luật và bồi thường thiệt hại do vi phạm nghĩa vụ hợp đồng.",
            "Soạn thảo thư yêu cầu thực hiện nghĩa vụ và đại diện thương lượng lộ trình thanh toán có biện pháp bảo đảm."
          ]
        },
        {
          title: "2. Bồi thường thiệt hại ngoài hợp đồng",
          items: [
            "Bồi thường thiệt hại do tính mạng, sức khỏe, danh dự, nhân phẩm, uy tín bị xâm phạm.",
            "Bồi thường thiệt hại do tài sản bị xâm phạm, do công trình xây dựng gây ra hoặc do tai nạn giao thông.",
            "Thu thập chứng cứ chứng minh thiệt hại thực tế: chi phí cứu chữa, phục hồi sức khỏe, thu nhập thực tế bị mất hoặc bị giảm sút."
          ]
        },
        {
          title: "3. Quyền nhân thân & việc dân sự khác",
          items: [
            "Yêu cầu xác định cha, mẹ, con; thay đổi, cải chính hộ tịch.",
            "Yêu cầu tuyên bố một người mất tích, đã chết; mất năng lực hành vi dân sự, có khó khăn trong nhận thức, làm chủ hành vi hoặc hạn chế năng lực hành vi dân sự.",
            "Tư vấn, soạn thảo giao dịch dân sự, hợp đồng ủy quyền và thỏa thuận bồi thường."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Nghiên cứu hồ sơ & đánh giá", desc: "Thẩm định tài liệu, xác định thời hiệu khởi kiện và căn cứ pháp lý bảo vệ quyền lợi thân chủ." },
        { step: "02", title: "Thương lượng & gửi văn bản yêu cầu", desc: "Gửi văn bản yêu cầu thực hiện nghĩa vụ, đại diện đối thoại, hòa giải với bên có nghĩa vụ." },
        { step: "03", title: "Khởi kiện & biện pháp khẩn cấp tạm thời", desc: "Soạn đơn khởi kiện; khi có căn cứ, yêu cầu Tòa án áp dụng biện pháp khẩn cấp tạm thời để ngăn chặn việc tẩu tán tài sản." },
        { step: "04", title: "Tranh tụng & thi hành án", desc: "Tham gia phiên hòa giải, phiên tòa và hỗ trợ thân chủ yêu cầu thi hành án dân sự." }
      ]
    },
    experience: [
      {
        title: "Đại diện yêu cầu hoàn trả khoản vay kèm lãi chậm trả",
        clientType: "Khách hàng cá nhân",
        result: "Tòa án chấp nhận yêu cầu khởi kiện và áp dụng biện pháp phong tỏa tài khoản của bên vay.",
        year: "2025",
        summary: "Thu thập sao kê ngân hàng và tin nhắn xác nhận nghĩa vụ trả nợ làm chứng cứ trước Tòa án."
      },
      {
        title: "Yêu cầu bồi thường thiệt hại do thi công công trình gây lún, nứt nhà liền kề",
        clientType: "Chủ sở hữu nhà ở",
        result: "Đơn vị thi công đồng ý bồi thường chi phí sửa chữa và hỗ trợ chi phí thuê nhà tạm thời.",
        year: "2024 - 2025",
        summary: "Đề nghị giám định độc lập mức độ hư hỏng kết cấu công trình làm căn cứ yêu cầu bồi thường."
      }
    ],
    articles: [
      {
        slug: "tu-van-tinh-huong-6-buoc-khoi-kien-tranh-chap-dat-dai-2026",
        title: "Tư Vấn Tình Huống: 6 Bước Khởi Kiện Tranh Chấp Đất Đai, Lấn Chiếm Ranh Giới 2026",
        date: "20/08/2026",
        readTime: "8 phút đọc",
        excerpt: "Từng bước xử lý tranh chấp lấn chiếm ranh giới đất, xây dựng lấn sang thửa đất liền kề và yêu cầu hủy Giấy chứng nhận cấp sai."
      },
      {
        slug: "quy-dinh-muc-an-phi-tam-ung-an-phi-ai-phai-chiu-an-phi-toa-an-2026",
        title: "Quy Định Mức Án Phí, Tạm Ứng Án Phí & Ai Phải Chịu Án Phí Tòa Án 2026",
        date: "01/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Phân biệt án phí có giá ngạch và không có giá ngạch, mức tạm ứng án phí và nghĩa vụ chịu án phí theo Nghị quyết 326/2016/UBTVQH14."
      }
    ]
  },

  // 6. LAO ĐỘNG
  "lao-dong": {
    slug: "lao-dong",
    title: "LAO ĐỘNG",
    category: "Lao động",
    badge: "Pháp lý nhân sự chuẩn mực",
    heroDesc: "Tư vấn hợp đồng lao động, tiền lương, bảo hiểm xã hội, nội quy lao động, quy chế thưởng, kỷ luật lao động và giải quyết tranh chấp lao động.",
    about: {
      overview: [
        "Quan hệ lao động hài hòa, đúng pháp luật là nền tảng cho sự ổn định của doanh nghiệp. Sai sót khi xử lý kỷ luật sa thải, chậm đóng bảo hiểm xã hội hoặc thiếu sót trong thỏa ước lao động có thể dẫn đến tranh chấp kéo dài và ảnh hưởng đến sản xuất.",
        "Đức Tín & Cộng sự hỗ trợ doanh nghiệp xây dựng quy trình nhân sự từ tuyển dụng, giao kết hợp đồng lao động, bảo vệ bí mật kinh doanh đến xử lý kỷ luật lao động đúng trình tự.",
        "Chúng tôi cũng đại diện bảo vệ quyền lợi hợp pháp của người lao động, người quản lý doanh nghiệp trong các vụ việc đơn phương chấm dứt hợp đồng lao động trái pháp luật, yêu cầu chi trả bảo hiểm xã hội, trợ cấp thôi việc, trợ cấp mất việc làm."
      ],
      keyHighlights: [
        {
          title: "Chuẩn hóa văn bản nhân sự",
          desc: "Soạn thảo Nội quy lao động, Thỏa ước lao động tập thể, quy chế lương thưởng và thực hiện thủ tục đăng ký với cơ quan quản lý nhà nước về lao động.",
          icon: "badge"
        },
        {
          title: "Xử lý kỷ luật đúng trình tự",
          desc: "Tư vấn trình tự họp xử lý kỷ luật, lập biên bản, ra quyết định nhằm hạn chế rủi ro bị Tòa án tuyên xử lý kỷ luật trái pháp luật.",
          icon: "how_to_reg"
        },
        {
          title: "Bảo mật & không cạnh tranh",
          desc: "Xây dựng thỏa thuận bảo vệ bí mật kinh doanh, bí mật công nghệ khi nhân sự chủ chốt nghỉ việc.",
          icon: "lock"
        }
      ],
      scopes: [
        {
          title: "1. Rà soát & đăng ký văn bản lao động của doanh nghiệp",
          items: [
            "Soạn thảo Nội quy lao động, Thỏa ước lao động tập thể, thang lương, bảng lương và thực hiện thủ tục đăng ký theo quy định.",
            "Xây dựng thỏa thuận bảo mật thông tin (NDA) và thỏa thuận không cạnh tranh cho nhân sự cấp cao."
          ]
        },
        {
          title: "2. Giấy phép lao động cho người nước ngoài",
          items: [
            "Thực hiện thủ tục giải trình, báo cáo nhu cầu sử dụng người lao động nước ngoài theo quy định.",
            "Thủ tục cấp, cấp lại, gia hạn giấy phép lao động và thẻ tạm trú cho chuyên gia, nhà quản lý người nước ngoài."
          ]
        },
        {
          title: "3. Giải quyết tranh chấp lao động cá nhân & tập thể",
          items: [
            "Tham gia hòa giải và đại diện tại Tòa án trong tranh chấp về xử lý kỷ luật sa thải, đơn phương chấm dứt hợp đồng lao động.",
            "Yêu cầu chi trả tiền lương, trợ cấp thôi việc, trợ cấp mất việc làm và tiền đóng BHXH, BHYT, BHTN theo quy định."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Đánh giá rủi ro nhân sự", desc: "Rà soát hệ thống hợp đồng lao động và quy chế nội bộ hiện hành của doanh nghiệp." },
        { step: "02", title: "Chuẩn hóa & ban hành", desc: "Soạn thảo mới hoặc hiệu chỉnh văn bản theo Bộ luật Lao động 2019 và văn bản hướng dẫn hiện hành." },
        { step: "03", title: "Tập huấn cán bộ quản lý", desc: "Hướng dẫn bộ phận nhân sự lập biên bản vi phạm và xử lý kỷ luật lao động đúng trình tự." },
        { step: "04", title: "Cố vấn & giải quyết vụ việc", desc: "Đại diện đối thoại, thương lượng với người lao động hoặc tổ chức đại diện người lao động khi phát sinh bất đồng." }
      ]
    },
    experience: [
      {
        title: "Tư vấn phương án sử dụng lao động khi tái cơ cấu nhà máy may mặc",
        clientType: "Doanh nghiệp dệt may có vốn đầu tư nước ngoài",
        result: "Xây dựng phương án sử dụng lao động đúng quy định, chi trả đầy đủ trợ cấp cho người lao động; quá trình thực hiện không phát sinh tranh chấp lao động tập thể.",
        year: "2025",
        summary: "Phối hợp với tổ chức đại diện người lao động tại cơ sở và cơ quan quản lý lao động để bảo đảm quy trình minh bạch."
      },
      {
        title: "Đại diện người quản lý trong tranh chấp về xử lý kỷ luật sa thải",
        clientType: "Người lao động giữ chức danh quản lý",
        result: "Tòa án tuyên quyết định sa thải trái pháp luật, buộc công ty bồi thường tiền lương những ngày không được làm việc và các khoản theo quy định.",
        year: "2024",
        summary: "Chỉ ra việc công ty vi phạm thời hiệu xử lý kỷ luật lao động và không chứng minh được lỗi của người lao động."
      }
    ],
    articles: [
      {
        slug: "4-quyen-loi-cot-loi-nguoi-lao-dong-can-nhan-du-khi-nghi-viec-2026",
        title: "4 Quyền Lợi Cốt Lõi Người Lao Động Cần Nhận Đủ Khi Nghỉ Việc 2026",
        date: "15/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Các quyền lợi tài chính và hồ sơ người sử dụng lao động phải giải quyết khi chấm dứt hợp đồng lao động."
      },
      {
        slug: "phan-biet-luong-gross-vs-luong-net-trach-nhiem-dong-bao-hiem-2026",
        title: "Phân Biệt Lương Gross vs Lương Net & Trách Nhiệm Đóng Bảo Hiểm 2026",
        date: "10/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Khác biệt giữa lương Gross và lương Net, tỷ lệ đóng bảo hiểm bắt buộc của người lao động và người sử dụng lao động."
      },
      {
        slug: "cong-ty-bat-cai-ung-dung-cham-cong-tren-dien-thoai-6091",
        title: "Công ty bắt cài ứng dụng chấm công trên điện thoại cá nhân, từ chối được không?",
        date: "16/10/2026",
        readTime: "5 phút đọc",
        excerpt: "Luật sư giải đáp quyền của người lao động khi doanh nghiệp yêu cầu cài ứng dụng chấm công trên thiết bị cá nhân."
      }
    ]
  },

  // 7. TRANH TỤNG
  "tranh-tung": {
    slug: "tranh-tung",
    title: "TRANH TỤNG",
    category: "Tố tụng",
    badge: "Đại diện tại Tòa án & Trọng tài",
    heroDesc: "Tham gia tố tụng tại Tòa án hoặc Trọng tài thương mại đối với tranh chấp kinh doanh thương mại, công nợ, đất đai, thừa kế, sở hữu trí tuệ, lao động và dân sự.",
    about: {
      overview: [
        "Tranh chấp kinh doanh, thương mại, dân sự và đất đai thường gây áp lực lớn về thời gian và tài chính cho các bên. Đức Tín & Cộng sự tiếp cận mỗi vụ việc bằng chiến lược rõ ràng, ưu tiên thương lượng, hòa giải khi có lợi cho thân chủ trước khi đưa vụ việc ra cơ quan tài phán.",
        "Khi thương lượng không thành, đội ngũ luật sư tranh tụng do Luật sư Phan Đức Tín trực tiếp điều hành sẽ xây dựng luận cứ, thu thập chứng cứ và đại diện thân chủ tham gia tố tụng tại Tòa án có thẩm quyền qua các giai đoạn sơ thẩm, phúc thẩm, giám đốc thẩm, tái thẩm, hoặc tại Trọng tài thương mại (như VIAC).",
        "Chúng tôi đồng hành cùng thân chủ từ khi khởi kiện, trong suốt quá trình giải quyết vụ án cho đến giai đoạn thi hành án."
      ],
      keyHighlights: [
        {
          title: "Chiến lược tố tụng rõ ràng",
          desc: "Đánh giá khách quan cơ sở pháp lý của vụ việc, lập kế hoạch thu thập chứng cứ và đề xuất biện pháp khẩn cấp tạm thời khi cần thiết.",
          icon: "gavel"
        },
        {
          title: "Kinh nghiệm tranh tụng",
          desc: "Luật sư điều hành có nhiều năm kinh nghiệm tham gia giải quyết các vụ án dân sự, kinh doanh thương mại và đất đai.",
          icon: "military_tech"
        },
        {
          title: "Đồng hành đến giai đoạn thi hành án",
          desc: "Hỗ trợ thân chủ xác minh điều kiện thi hành án và làm việc với cơ quan thi hành án dân sự.",
          icon: "account_balance"
        }
      ],
      scopes: [
        {
          title: "1. Tranh chấp kinh doanh thương mại & hợp đồng",
          items: [
            "Tranh chấp hợp đồng mua bán hàng hóa, xây dựng, dịch vụ logistics, hợp đồng tín dụng.",
            "Tranh chấp giữa thành viên, cổ đông với công ty hoặc giữa các thành viên, cổ đông về quyền quản lý, phân chia lợi nhuận và chuyển nhượng cổ phần, phần vốn góp."
          ]
        },
        {
          title: "2. Tranh chấp đất đai & bất động sản",
          items: [
            "Tranh chấp quyền sử dụng đất, ranh giới thửa đất, hợp đồng đặt cọc, hợp đồng chuyển nhượng quyền sử dụng đất và mua bán nhà ở.",
            "Khiếu nại, khởi kiện quyết định hành chính về thu hồi đất, bồi thường, hỗ trợ, tái định cư."
          ]
        },
        {
          title: "3. Tranh chấp dân sự, hôn nhân & thừa kế",
          items: [
            "Chia di sản thừa kế theo di chúc và theo pháp luật, đặc biệt đối với di sản là bất động sản có giá trị lớn.",
            "Chia tài sản chung, xác định nghĩa vụ chung về tài sản của vợ chồng khi ly hôn; tranh chấp về quyền trực tiếp nuôi con."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Thẩm định hồ sơ", desc: "Nghiên cứu tài liệu, chứng cứ, đánh giá cơ sở pháp lý và dự liệu các tình huống bất lợi." },
        { step: "02", title: "Thương lượng & hòa giải", desc: "Gửi văn bản yêu cầu, đại diện thân chủ đàm phán phương án giải quyết." },
        { step: "03", title: "Khởi kiện & tranh tụng", desc: "Soạn đơn khởi kiện, yêu cầu áp dụng biện pháp khẩn cấp tạm thời khi có căn cứ, tham gia tranh tụng tại phiên tòa." },
        { step: "04", title: "Thi hành án", desc: "Hỗ trợ yêu cầu thi hành án và làm việc với cơ quan thi hành án dân sự trong quá trình tổ chức thi hành." }
      ]
    },
    experience: [
      {
        title: "Đại diện nhà thầu trong tranh chấp hợp đồng thi công xây dựng",
        clientType: "Nhà thầu xây dựng công nghiệp",
        result: "Tòa án chấp nhận yêu cầu khởi kiện, buộc chủ đầu tư thanh toán nợ gốc và tiền lãi chậm thanh toán.",
        year: "2025",
        summary: "Chứng minh vi phạm nghĩa vụ nghiệm thu, thanh toán của chủ đầu tư dựa trên hồ sơ nghiệm thu và kết quả giám định khối lượng."
      },
      {
        title: "Hòa giải thành tranh chấp chia di sản thừa kế là nhà đất",
        clientType: "Người thừa kế định cư ở nước ngoài",
        result: "Các đồng thừa kế thỏa thuận được phương án phân chia di sản mà không phải trải qua nhiều cấp xét xử.",
        year: "2024",
        summary: "Soạn thảo văn bản thỏa thuận phân chia di sản, công chứng và hoàn tất thủ tục đăng ký biến động đất đai."
      }
    ],
    articles: [
      {
        slug: "cam-nang-tranh-chap-hop-dong-va-thu-hoi-no-doanh-nghiep-2026",
        title: "Cẩm Nang Pháp Lý Toàn Diện Về Tranh Chấp Hợp Đồng Kinh Tế & Thu Hồi Nợ Doanh Nghiệp 2026",
        date: "25/08/2026",
        readTime: "10 phút đọc",
        excerpt: "Mười giai đoạn từ thẩm định công nợ, gửi thư yêu cầu thanh toán, áp dụng biện pháp khẩn cấp tạm thời đến thi hành án."
      },
      {
        slug: "quy-dinh-muc-an-phi-tam-ung-an-phi-ai-phai-chiu-an-phi-toa-an-2026",
        title: "Quy Định Mức Án Phí, Tạm Ứng Án Phí & Ai Phải Chịu Án Phí Tòa Án 2026",
        date: "01/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Phân biệt án phí có giá ngạch và không có giá ngạch, mức tạm ứng án phí và nghĩa vụ chịu án phí theo Nghị quyết 326/2016/UBTVQH14."
      },
      {
        slug: "tu-van-tinh-huong-6-buoc-khoi-kien-tranh-chap-dat-dai-2026",
        title: "Tư Vấn Tình Huống: 6 Bước Khởi Kiện Tranh Chấp Đất Đai, Lấn Chiếm Ranh Giới 2026",
        date: "20/08/2026",
        readTime: "8 phút đọc",
        excerpt: "Từng bước xử lý tranh chấp lấn chiếm ranh giới đất và yêu cầu hủy Giấy chứng nhận cấp sai."
      }
    ]
  },

  // 8. NHÀ ĐẤT - BẤT ĐỘNG SẢN
  "bat-dong-san": {
    slug: "bat-dong-san",
    title: "NHÀ ĐẤT - BẤT ĐỘNG SẢN",
    category: "Bất động sản",
    badge: "Pháp lý đất đai vững vàng",
    heroDesc: "Tư vấn hồ sơ, thủ tục cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất; thẩm tra pháp lý giao dịch chuyển nhượng; giải quyết tranh chấp liên quan đến bất động sản.",
    about: {
      overview: [
        "Giao dịch bất động sản tiềm ẩn nhiều rủi ro pháp lý về quy hoạch, nguồn gốc đất, tính hợp pháp của hợp đồng và thủ tục cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất.",
        "Đức Tín & Cộng sự rà soát pháp lý bất động sản trước khi giao dịch, hỗ trợ đàm phán hợp đồng đặt cọc, hợp đồng chuyển nhượng và thực hiện thủ tục công chứng, đăng ký biến động đất đai.",
        "Chúng tôi tư vấn giải quyết tranh chấp đất đai có nguồn gốc phức tạp, tranh chấp mua bán nhà ở hình thành trong tương lai và khiếu nại về bồi thường, hỗ trợ, tái định cư theo Luật Đất đai 2024."
      ],
      keyHighlights: [
        {
          title: "Kiểm tra pháp lý & quy hoạch",
          desc: "Kiểm tra tình trạng quy hoạch, thế chấp, biện pháp ngăn chặn và tranh chấp của bất động sản trước khi giao dịch.",
          icon: "home_work"
        },
        {
          title: "Hợp đồng chặt chẽ, cân bằng",
          desc: "Rà soát điều khoản về đặt cọc, đơn phương chấm dứt hợp đồng, tiến độ thanh toán và thời hạn cấp Giấy chứng nhận.",
          icon: "assignment"
        },
        {
          title: "Cập nhật Luật Đất đai 2024",
          desc: "Áp dụng quy định mới về bảng giá đất, cấp Giấy chứng nhận cho đất không có giấy tờ và bồi thường, hỗ trợ, tái định cư.",
          icon: "balance"
        }
      ],
      scopes: [
        {
          title: "1. Thẩm định pháp lý & soạn thảo hợp đồng giao dịch",
          items: [
            "Kiểm tra pháp lý bất động sản: Giấy chứng nhận, quy hoạch chi tiết 1/500, giấy phép xây dựng, tình trạng thế chấp.",
            "Soạn thảo, thẩm định hợp đồng đặt cọc, hợp đồng chuyển nhượng quyền sử dụng đất, mua bán nhà ở, tặng cho, cho thuê nhà xưởng."
          ]
        },
        {
          title: "2. Đăng ký biến động & cấp Giấy chứng nhận",
          items: [
            "Thủ tục cấp lần đầu, cấp đổi, tách thửa, hợp thửa và chuyển mục đích sử dụng đất sang đất ở.",
            "Đại diện kê khai nghĩa vụ tài chính: thuế thu nhập cá nhân, lệ phí trước bạ và tiền sử dụng đất."
          ]
        },
        {
          title: "3. Giải quyết tranh chấp bất động sản",
          items: [
            "Tranh chấp ranh giới thửa đất liền kề, lối đi chung; yêu cầu tuyên bố hợp đồng chuyển nhượng quyền sử dụng đất vô hiệu do bị lừa dối.",
            "Khởi kiện yêu cầu chủ đầu tư bàn giao nhà ở và thực hiện thủ tục cấp Giấy chứng nhận đúng cam kết."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tiếp nhận & thẩm tra", desc: "Kiểm tra hồ sơ nhà đất, lịch sử giao dịch và thông tin quy hoạch tại địa phương." },
        { step: "02", title: "Thiết kế giao dịch", desc: "Soạn thảo hợp đồng chặt chẽ, bảo đảm an toàn cho dòng tiền và tiến độ thanh toán." },
        { step: "03", title: "Thực hiện thủ tục", desc: "Đồng hành tại tổ chức hành nghề công chứng và nộp hồ sơ tại cơ quan đăng ký đất đai." },
        { step: "04", title: "Nhận Giấy chứng nhận", desc: "Nhận kết quả đăng ký và bàn giao Giấy chứng nhận cho Quý khách." }
      ]
    },
    experience: [
      {
        title: "Thẩm định pháp lý khu đất dự kiến xây dựng kho vận",
        clientType: "Nhà đầu tư bất động sản công nghiệp",
        result: "Phát hiện một số thửa đất nằm trong hành lang bảo vệ an toàn lưới điện, giúp thân chủ điều chỉnh phương án nhận chuyển nhượng trước khi ký kết.",
        year: "2025",
        summary: "Hỗ trợ thương lượng lại ranh giới khu đất và thủ tục chuyển mục đích sử dụng sang đất sản xuất, kinh doanh phi nông nghiệp."
      },
      {
        title: "Yêu cầu hoàn trả tiền đặt cọc tại dự án chưa đủ điều kiện kinh doanh",
        clientType: "Nhà đầu tư cá nhân",
        result: "Sau khi nhận văn bản yêu cầu và làm việc trực tiếp, chủ đầu tư đồng ý thanh lý thỏa thuận và hoàn trả tiền đặt cọc kèm lãi theo cam kết.",
        year: "2024",
        summary: "Căn cứ Luật Kinh doanh bất động sản để chỉ ra việc chủ đầu tư nhận tiền khi dự án chưa đủ điều kiện."
      }
    ],
    articles: [
      {
        slug: "luat-dat-dai-sua-doi-co-hieu-luc-tu-thang-7",
        title: "Luật Đất Đai 2024 (Áp dụng 2026): 5 Thay đổi Cốt lõi về Bảng giá Đất & Bồi thường Giải tỏa",
        date: "12/09/2026",
        readTime: "10 phút đọc",
        excerpt: "Quy định bãi bỏ khung giá đất, điều kiện cấp Giấy chứng nhận cho đất không có giấy tờ và cơ chế bồi thường, hỗ trợ, tái định cư."
      },
      {
        slug: "tu-van-tinh-huong-6-buoc-khoi-kien-tranh-chap-dat-dai-2026",
        title: "Tư Vấn Tình Huống: 6 Bước Khởi Kiện Tranh Chấp Đất Đai, Lấn Chiếm Ranh Giới 2026",
        date: "20/08/2026",
        readTime: "8 phút đọc",
        excerpt: "Từng bước xử lý tranh chấp lấn chiếm ranh giới đất và yêu cầu hủy Giấy chứng nhận cấp sai."
      },
      {
        slug: "huong-dan-thu-tuc-khai-nhan-va-phan-chia-di-san-thua-ke-nha-dat-2026",
        title: "Cẩm Nang Hướng Dẫn Thủ Tục Khai Nhận & Phân Chia Di Sản Thừa Kế Nhà Đất Năm 2026",
        date: "20/10/2026",
        readTime: "8 phút đọc",
        excerpt: "Quy trình khai nhận và phân chia di sản thừa kế quyền sử dụng đất theo Bộ luật Dân sự 2015 và Luật Đất đai 2024."
      }
    ]
  },

  // 9. HÔN NHÂN GIA ĐÌNH
  "hon-nhan-gia-dinh": {
    slug: "hon-nhan-gia-dinh",
    title: "HÔN NHÂN GIA ĐÌNH",
    category: "Gia đình",
    badge: "Thấu hiểu & bảo mật",
    heroDesc: "Thỏa thuận xác lập chế độ tài sản trước khi kết hôn, kết hôn có yếu tố nước ngoài, thuận tình ly hôn, ly hôn theo yêu cầu của một bên, chia tài sản chung của vợ chồng, quyền trực tiếp nuôi con và cấp dưỡng.",
    about: {
      overview: [
        "Vấn đề hôn nhân và gia đình không chỉ là các quy định pháp luật mà còn gắn với tình cảm, danh dự và tương lai của con cái. Đức Tín & Cộng sự tiếp cận mỗi vụ việc với tinh thần lắng nghe, thấu hiểu và giữ bí mật đời tư cho thân chủ.",
        "Chúng tôi ưu tiên hỗ trợ các bên đạt được thỏa thuận thuận tình ly hôn, thống nhất về chia tài sản, việc nuôi con và cấp dưỡng, hạn chế ảnh hưởng đến con chung.",
        "Trường hợp ly hôn theo yêu cầu của một bên hoặc tranh chấp tài sản phức tạp, Luật sư Phan Đức Tín cùng đội ngũ luật sư sẽ bảo vệ quyền lợi tài sản hợp pháp và quyền được trực tiếp nuôi con của thân chủ, trên cơ sở bảo đảm quyền lợi về mọi mặt của con."
      ],
      keyHighlights: [
        {
          title: "Bảo mật thông tin",
          desc: "Thông tin đời tư, tài sản và nội dung thỏa thuận được bảo mật theo quy định nghề nghiệp luật sư và hợp đồng dịch vụ.",
          icon: "vpn_key"
        },
        {
          title: "Thủ tục gọn, rõ ràng",
          desc: "Chuẩn bị hồ sơ đầy đủ ngay từ đầu, hạn chế số lần Quý khách phải trực tiếp làm việc với Tòa án.",
          icon: "speed"
        },
        {
          title: "Tài sản & quyền nuôi con",
          desc: "Thu thập chứng cứ về nguồn gốc tài sản riêng và điều kiện chăm sóc, giáo dục con để bảo vệ quyền lợi của thân chủ.",
          icon: "family_restroom"
        }
      ],
      scopes: [
        {
          title: "1. Thuận tình ly hôn & ly hôn theo yêu cầu của một bên",
          items: [
            "Tư vấn, soạn thảo hồ sơ và đại diện nộp đơn yêu cầu công nhận thuận tình ly hôn.",
            "Đại diện tham gia tố tụng trong vụ án ly hôn theo yêu cầu của một bên, kể cả vụ việc có yếu tố nước ngoài."
          ]
        },
        {
          title: "2. Chia tài sản chung & xác định nghĩa vụ chung của vợ chồng",
          items: [
            "Thu thập chứng cứ chứng minh tài sản riêng có trước khi kết hôn, được tặng cho riêng hoặc thừa kế riêng.",
            "Chia cổ phần, phần vốn góp, bất động sản, tiền gửi; xác định nghĩa vụ chung và nghĩa vụ riêng về tài sản."
          ]
        },
        {
          title: "3. Quyền trực tiếp nuôi con & cấp dưỡng",
          items: [
            "Thu thập tài liệu về điều kiện kinh tế, thời gian chăm sóc và môi trường giáo dục để yêu cầu được trực tiếp nuôi con.",
            "Yêu cầu mức cấp dưỡng phù hợp; yêu cầu xử lý hành vi cản trở quyền thăm nom con sau ly hôn."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Lắng nghe & tư vấn hướng giải quyết", desc: "Trao đổi bảo mật, tìm hiểu nguyện vọng về tài sản, việc nuôi con và đề xuất hướng giải quyết phù hợp." },
        { step: "02", title: "Chuẩn bị hồ sơ", desc: "Soạn thảo đơn khởi kiện hoặc đơn yêu cầu công nhận thuận tình ly hôn, chuẩn bị giấy tờ hộ tịch, giấy tờ tài sản và tài liệu chứng minh." },
        { step: "03", title: "Làm việc tại Tòa án", desc: "Đồng hành cùng thân chủ trong các phiên hòa giải và phiên tòa." },
        { step: "04", title: "Nhận bản án, quyết định", desc: "Nhận bản án hoặc quyết định công nhận thuận tình ly hôn có hiệu lực và hỗ trợ đăng ký sang tên tài sản được chia." }
      ]
    },
    experience: [
      {
        title: "Đại diện thân chủ trong vụ án ly hôn có tranh chấp tài sản là doanh nghiệp",
        clientType: "Khách hàng là người sáng lập doanh nghiệp",
        result: "Tòa án xác định phần lớn giá trị phần vốn góp là tài sản riêng có trước khi kết hôn của thân chủ.",
        year: "2025",
        summary: "Đối chiếu sao kê tài chính và lịch sử góp vốn qua nhiều năm để chứng minh nguồn gốc tài sản riêng."
      },
      {
        title: "Đại diện người mẹ yêu cầu được trực tiếp nuôi con và cấp dưỡng",
        clientType: "Khách hàng cá nhân",
        result: "Tòa án giao hai con cho người mẹ trực tiếp nuôi dưỡng và buộc người cha cấp dưỡng định kỳ.",
        year: "2024",
        summary: "Thu thập chứng cứ về thời gian chăm sóc con và điều kiện sinh hoạt, học tập ổn định cho con."
      }
    ],
    articles: [
      {
        slug: "quy-trinh-5-buoc-thu-tuc-thuan-tinh-ly-hon-nhanh-nhat-2026",
        title: "Quy Trình 5 Bước Thủ Tục Thuận Tình Ly Hôn Tại Tòa Án Năm 2026",
        date: "20/10/2026",
        readTime: "7 phút đọc",
        excerpt: "Quy trình 5 bước thực hiện thủ tục thuận tình ly hôn: chuẩn bị hồ sơ, xác định tài sản riêng, nộp đơn và tham gia phiên hòa giải."
      }
    ]
  },

  // --- DỊCH VỤ BỔ TRỢ & ĐƯỜNG DẪN KẾ THỪA ---
  "thu-hoi-no": {
    slug: "thu-hoi-no",
    title: "THU HỒI NỢ",
    category: "Thu hồi nợ",
    badge: "Đúng pháp luật, hiệu quả",
    heroDesc: "Xây dựng lộ trình xử lý công nợ thông qua thương lượng, hòa giải và các thủ tục tố tụng theo quy định pháp luật, giúp Quý khách thu hồi khoản nợ, tiết kiệm thời gian và hạn chế rủi ro tài chính.",
    about: {
      overview: [
        "Nợ quá hạn kéo dài từ hợp đồng mua bán, xây dựng, vay tài sản gây ứ đọng dòng vốn của doanh nghiệp và ảnh hưởng đến tình hình tài chính của cá nhân.",
        "Đức Tín & Cộng sự chỉ sử dụng các biện pháp pháp lý theo quy định của pháp luật và tuân thủ Bộ quy tắc đạo đức nghề nghiệp luật sư. Chúng tôi không áp dụng bất kỳ biện pháp đòi nợ nào trái pháp luật.",
        "Quy trình gồm: xác minh khả năng thanh toán và tài sản của bên có nghĩa vụ, gửi thư yêu cầu thanh toán, thương lượng, khởi kiện tại Tòa án hoặc Trọng tài, yêu cầu áp dụng biện pháp khẩn cấp tạm thời khi có căn cứ, và hỗ trợ yêu cầu thi hành án."
      ],
      keyHighlights: [
        {
          title: "Biện pháp theo đúng pháp luật",
          desc: "Mọi bước xử lý đều dựa trên quy định pháp luật, bảo vệ uy tín và an toàn pháp lý cho thân chủ.",
          icon: "verified_user"
        },
        {
          title: "Xác minh thông tin tài sản",
          desc: "Xác minh tài sản, tình trạng hoạt động và nguồn thu nhập của bên có nghĩa vụ trả nợ bằng các kênh hợp pháp.",
          icon: "search"
        },
        {
          title: "Biện pháp khẩn cấp tạm thời",
          desc: "Đề nghị Tòa án áp dụng phong tỏa tài khoản, kê biên tài sản, cấm chuyển dịch quyền về tài sản hoặc cấm xuất cảnh đối với người có nghĩa vụ khi có căn cứ.",
          icon: "lock"
        }
      ],
      scopes: [
        {
          title: "1. Thẩm định hồ sơ nợ & khả năng thu hồi",
          items: [
            "Kiểm tra tính pháp lý của hồ sơ công nợ: hợp đồng, biên bản đối chiếu công nợ, hóa đơn, giấy nhận nợ.",
            "Xác minh nhân thân, nơi cư trú, tình trạng hoạt động của doanh nghiệp và tài sản hiện có của bên có nghĩa vụ."
          ]
        },
        {
          title: "2. Thương lượng, hòa giải & thư yêu cầu thanh toán",
          items: [
            "Soạn thảo và gửi thư yêu cầu thanh toán, ấn định thời hạn thực hiện nghĩa vụ.",
            "Đại diện thân chủ làm việc, đàm phán lộ trình trả nợ có biện pháp bảo đảm."
          ]
        },
        {
          title: "3. Khởi kiện & biện pháp khẩn cấp tạm thời",
          items: [
            "Soạn đơn khởi kiện hoặc đơn khởi kiện trọng tài yêu cầu bên có nghĩa vụ thanh toán nợ gốc và lãi chậm thanh toán.",
            "Yêu cầu Tòa án áp dụng biện pháp khẩn cấp tạm thời: phong tỏa tài khoản, kê biên tài sản, cấm chuyển dịch quyền về tài sản."
          ]
        },
        {
          title: "4. Hỗ trợ thi hành án dân sự",
          items: [
            "Soạn đơn yêu cầu thi hành án; phối hợp với cơ quan thi hành án dân sự trong việc xác minh, kê biên và bán đấu giá tài sản.",
            "Theo dõi quá trình thi hành án cho đến khi khoản tiền được chi trả cho thân chủ."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Thẩm định & báo phí", desc: "Luật sư nghiên cứu hồ sơ công nợ, đánh giá khả năng thu hồi và báo phí minh bạch." },
        { step: "02", title: "Gửi thư yêu cầu thanh toán", desc: "Gửi văn bản yêu cầu chính thức, đề nghị bên có nghĩa vụ hợp tác giải quyết." },
        { step: "03", title: "Khởi kiện & biện pháp khẩn cấp tạm thời", desc: "Nộp đơn khởi kiện; khi có căn cứ, yêu cầu Tòa án áp dụng biện pháp khẩn cấp tạm thời để ngăn chặn tẩu tán tài sản." },
        { step: "04", title: "Thi hành án", desc: "Phối hợp với cơ quan thi hành án dân sự trong quá trình tổ chức thi hành bản án, quyết định." }
      ]
    },
    experience: [
      {
        title: "Thu hồi công nợ cho doanh nghiệp cung ứng vật liệu xây dựng",
        clientType: "Doanh nghiệp sản xuất thép",
        result: "Sau khi Tòa án áp dụng biện pháp khẩn cấp tạm thời, bên có nghĩa vụ đã thanh toán toàn bộ nợ gốc và một phần tiền lãi theo thỏa thuận.",
        year: "2025",
        summary: "Phát hiện dấu hiệu bên có nghĩa vụ chuẩn bị chuyển nhượng bất động sản và kịp thời yêu cầu Tòa án áp dụng biện pháp ngăn chặn."
      },
      {
        title: "Giải quyết khoản vay quá hạn nhiều năm của nhà đầu tư cá nhân",
        clientType: "Nhà đầu tư cá nhân",
        result: "Các bên ký thỏa thuận chuyển nhượng quyền sử dụng đất để thanh toán khoản nợ, được công chứng theo quy định.",
        year: "2024",
        summary: "Đàm phán trên cơ sở hồ sơ chứng minh nghĩa vụ trả nợ và các vi phạm hợp đồng của bên vay."
      }
    ],
    articles: [
      {
        slug: "cam-nang-tranh-chap-hop-dong-va-thu-hoi-no-doanh-nghiep-2026",
        title: "Cẩm Nang Pháp Lý Toàn Diện Về Tranh Chấp Hợp Đồng Kinh Tế & Thu Hồi Nợ Doanh Nghiệp 2026",
        date: "25/08/2026",
        readTime: "10 phút đọc",
        excerpt: "Mười giai đoạn từ thẩm định công nợ, gửi thư yêu cầu thanh toán, áp dụng biện pháp khẩn cấp tạm thời đến thi hành án."
      },
      {
        slug: "quy-dinh-muc-an-phi-tam-ung-an-phi-ai-phai-chiu-an-phi-toa-an-2026",
        title: "Quy Định Mức Án Phí, Tạm Ứng Án Phí & Ai Phải Chịu Án Phí Tòa Án 2026",
        date: "01/08/2026",
        readTime: "6 phút đọc",
        excerpt: "Mức tạm ứng án phí và nghĩa vụ chịu án phí khi khởi kiện đòi nợ theo Nghị quyết 326/2016/UBTVQH14."
      }
    ]
  },

  "hinh-su-bao-chua": {
    slug: "hinh-su-bao-chua",
    title: "LUẬT SƯ HÌNH SỰ - BÀO CHỮA",
    category: "Hình sự",
    badge: "Tiếp nhận yêu cầu 24/7",
    heroDesc: "Tham gia tố tụng với tư cách người bào chữa từ giai đoạn điều tra, truy tố đến xét xử. Nghiên cứu hồ sơ, chứng cứ và các tình tiết giảm nhẹ để bảo vệ quyền và lợi ích hợp pháp của người bị buộc tội.",
    about: {
      overview: [
        "Trong vụ án hình sự, sự tham gia kịp thời của luật sư từ giai đoạn tạm giữ, lấy lời khai ban đầu có ý nghĩa quan trọng đối với việc bảo vệ quyền và lợi ích hợp pháp của người bị buộc tội.",
        "Luật sư hình sự của Đức Tín & Cộng sự am hiểu thủ tục tố tụng hình sự, đánh giá khách quan chứng cứ buộc tội và chứng cứ gỡ tội, bảo vệ nguyên tắc suy đoán vô tội và quyền bất khả xâm phạm về thân thể.",
        "Chúng tôi làm việc với Cơ quan điều tra, Viện kiểm sát và tham gia bào chữa tại phiên tòa, đề nghị áp dụng đúng tội danh, khung hình phạt và các tình tiết giảm nhẹ trách nhiệm hình sự theo quy định."
      ],
      keyHighlights: [
        {
          title: "Tham gia từ giai đoạn đầu",
          desc: "Tiếp nhận yêu cầu 24/7, sắp xếp luật sư sớm nhất để tham gia các buổi lấy lời khai, hỏi cung theo quy định.",
          icon: "gavel"
        },
        {
          title: "Vụ án kinh tế & chức vụ",
          desc: "Kinh nghiệm bào chữa trong các vụ án kinh tế, quản lý tài sản, thuế, ngân hàng và tội phạm về chức vụ.",
          icon: "balance"
        },
        {
          title: "Thay đổi biện pháp ngăn chặn",
          desc: "Đề nghị thay đổi biện pháp tạm giam bằng biện pháp bảo lĩnh, đặt tiền để bảo đảm hoặc cấm đi khỏi nơi cư trú khi đủ điều kiện.",
          icon: "verified_user"
        }
      ],
      scopes: [
        {
          title: "1. Bào chữa giai đoạn điều tra & truy tố",
          items: [
            "Tham gia lấy lời khai, hỏi cung bị can cùng Điều tra viên, Kiểm sát viên.",
            "Soạn đơn đề nghị thay đổi biện pháp ngăn chặn; đơn khiếu nại quyết định, hành vi tố tụng có dấu hiệu vi phạm pháp luật."
          ]
        },
        {
          title: "2. Bào chữa tại phiên tòa sơ thẩm & phúc thẩm",
          items: [
            "Nghiên cứu, sao chụp hồ sơ vụ án; thu thập tài liệu, đồ vật để chứng minh tình tiết gỡ tội, giảm nhẹ trách nhiệm hình sự.",
            "Tranh luận với Kiểm sát viên tại phiên tòa và trình bày quan điểm bào chữa."
          ]
        },
        {
          title: "3. Bảo vệ bị hại & đương sự trong vụ án hình sự",
          items: [
            "Đại diện bị hại thực hiện quyền tố giác, yêu cầu khởi tố; thu thập chứng cứ yêu cầu bồi thường thiệt hại về tính mạng, sức khỏe, tài sản."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tiếp nhận thông tin 24/7", desc: "Luật sư làm việc với gia đình, tiếp nhận thông tin về việc tạm giữ, tạm giam." },
        { step: "02", title: "Đăng ký bào chữa", desc: "Thực hiện thủ tục đăng ký bào chữa tại cơ quan có thẩm quyền tiến hành tố tụng." },
        { step: "03", title: "Tham gia tố tụng", desc: "Gặp người bị tạm giữ, bị can, tham gia hỏi cung và thu thập tài liệu, chứng cứ." },
        { step: "04", title: "Bào chữa tại phiên tòa", desc: "Trình bày bản luận cứ bào chữa, bảo vệ quyền và lợi ích hợp pháp của thân chủ." }
      ]
    },
    experience: [
      {
        title: "Bào chữa trong vụ án kinh tế liên quan đến doanh nghiệp xuất nhập khẩu",
        clientType: "Người quản lý doanh nghiệp",
        result: "Hội đồng xét xử chấp nhận một phần quan điểm bào chữa, áp dụng khung hình phạt nhẹ hơn và cho thân chủ hưởng án treo.",
        year: "2025",
        summary: "Chứng minh thân chủ không có mục đích chiếm đoạt, thiệt hại phát sinh từ rủi ro trong hoạt động thương mại."
      }
    ],
    articles: []
  },

  "so-huu-tri-tue": {
    slug: "so-huu-tri-tue",
    title: "SỞ HỮU TRÍ TUỆ",
    category: "Sở hữu trí tuệ",
    badge: "Bảo hộ nhãn hiệu & tài sản trí tuệ",
    heroDesc: "Tra cứu, đăng ký nhãn hiệu, sáng chế, kiểu dáng công nghiệp; xử lý hành vi xâm phạm quyền sở hữu trí tuệ, giúp doanh nghiệp xây dựng và bảo vệ tài sản trí tuệ.",
    about: {
      overview: [
        "Nhãn hiệu, kiểu dáng sản phẩm, phần mềm và bí mật kinh doanh là những tài sản vô hình có giá trị lớn của doanh nghiệp.",
        "Đức Tín & Cộng sự cung cấp giải pháp bảo hộ từ đăng ký nhãn hiệu trong nước, đăng ký quốc tế theo Hệ thống Madrid đến giám sát thị trường và xử lý hàng giả, hàng xâm phạm quyền sở hữu trí tuệ.",
        "Chúng tôi đại diện cho chủ sở hữu trong các thủ tục tại Cục Sở hữu trí tuệ và khởi kiện hành vi xâm phạm quyền sở hữu trí tuệ tại Tòa án."
      ],
      keyHighlights: [
        {
          title: "Tra cứu khả năng bảo hộ",
          desc: "Tra cứu, đánh giá khả năng đăng ký của nhãn hiệu trước khi nộp đơn để hạn chế rủi ro bị từ chối.",
          icon: "search"
        },
        {
          title: "Bảo hộ quốc tế",
          desc: "Đăng ký nhãn hiệu tại Hoa Kỳ, EU, Nhật Bản, Trung Quốc và các nước ASEAN.",
          icon: "public"
        },
        {
          title: "Xử lý xâm phạm",
          desc: "Phối hợp với cơ quan quản lý thị trường, thanh tra chuyên ngành để xử lý hàng giả, hàng xâm phạm.",
          icon: "security"
        }
      ],
      scopes: [
        {
          title: "1. Đăng ký nhãn hiệu & kiểu dáng công nghiệp",
          items: [
            "Tra cứu sơ bộ và tra cứu chuyên sâu khả năng bảo hộ nhãn hiệu.",
            "Soạn hồ sơ và đại diện nộp đơn đăng ký nhãn hiệu, kiểu dáng công nghiệp, sáng chế tại Cục Sở hữu trí tuệ."
          ]
        },
        {
          title: "2. Đăng ký quyền tác giả",
          items: [
            "Đăng ký quyền tác giả đối với chương trình máy tính, tác phẩm mỹ thuật ứng dụng, tác phẩm văn học, sách và bài viết."
          ]
        },
        {
          title: "3. Xử lý xâm phạm & tranh chấp sở hữu trí tuệ",
          items: [
            "Gửi thư cảnh báo yêu cầu bên vi phạm chấm dứt sử dụng nhãn hiệu trùng hoặc tương tự gây nhầm lẫn.",
            "Yêu cầu xử phạt vi phạm hành chính hoặc khởi kiện tại Tòa án yêu cầu bồi thường thiệt hại do xâm phạm quyền sở hữu trí tuệ."
          ]
        }
      ],
      workflow: [
        { step: "01", title: "Tra cứu & đánh giá", desc: "Tra cứu nhãn hiệu trùng hoặc tương tự trên cơ sở dữ liệu của Cục Sở hữu trí tuệ và WIPO." },
        { step: "02", title: "Nộp đơn", desc: "Nộp đơn đăng ký và bàn giao tờ khai có xác nhận ngày nộp đơn cho Quý khách." },
        { step: "03", title: "Theo dõi & phản hồi", desc: "Theo dõi quá trình thẩm định hình thức, thẩm định nội dung và trả lời các thông báo của Cục Sở hữu trí tuệ." },
        { step: "04", title: "Nhận văn bằng bảo hộ", desc: "Nhận Giấy chứng nhận đăng ký nhãn hiệu (hiệu lực 10 năm, được gia hạn) và tư vấn duy trì, gia hạn." }
      ]
    },
    experience: [
      {
        title: "Đăng ký nhãn hiệu cho chuỗi cửa hàng mỹ phẩm",
        clientType: "Doanh nghiệp dược mỹ phẩm",
        result: "Được cấp Giấy chứng nhận đăng ký nhãn hiệu cho nhóm 03 và nhóm 35 sau quá trình thẩm định.",
        year: "2025",
        summary: "Trả lời thành công các thông báo dự định từ chối do bị cho là tương tự với nhãn hiệu đã được bảo hộ."
      }
    ],
    articles: []
  }
};

export const SERVICE_IMAGES: Record<string, string> = {
  "hop-tac-doanh-nghiep": "/img/card_business.webp",
  "tu-van-dau-tu": "/img/card_fdi.webp",
  "thu-tuc-phap-ly-giay-phep": "/img/card_license.webp",
  "di-chuc-thua-ke": "/img/card_inheritance.webp",
  "dan-su": "/img/card_civil.webp",
  "lao-dong": "/img/card_labor.webp",
  "tranh-tung": "/img/card_court.webp",
  "bat-dong-san": "/img/card_realestate.webp",
  "hon-nhan-gia-dinh": "/img/card_family.webp",
  "thu-hoi-no": "/img/card_debt.webp",
  "hinh-su-bao-chua": "/img/card_criminal.webp",
  "so-huu-tri-tue": "/img/card_ip.webp",
};
