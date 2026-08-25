export interface UserQuestion {
  id: number;
  name: string;
  phone: string;
  email: string;
  category: string;
  question: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const STORAGE_KEY = 'ductin_user_questions_db_v1';

const getLocalQuestions = (): UserQuestion[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: UserQuestion[] = [
        {
          id: 101,
          name: "Trần Anh Quân",
          phone: "0912345678",
          email: "quan.tran@gmail.com",
          category: "Doanh nghiệp & Đầu tư",
          question: "Chúng tôi là công ty FDI Hàn Quốc cần tư vấn chuyển nhượng 49% phần vốn góp cho đối tác Nhật Bản và xin điều chỉnh giấy chứng nhận đăng ký đầu tư (IRC) tại KCN VSIP Bình Dương.",
          status: "pending",
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 102,
          name: "Nguyễn Thị Kim Ngân",
          phone: "0987654321",
          email: "kimngan.law@yahoo.com",
          category: "Đất đai & Nhà ở",
          question: "Đất nhà tôi mua năm 2018 bằng giấy viết tay có người làm chứng, hiện tại chủ cũ không chịu phối hợp ký công chứng chuyển nhượng để làm sổ đỏ. Tôi cần luật sư tư vấn phương án khởi kiện tại Tòa án.",
          status: "confirmed",
          createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        },
        {
          id: 103,
          name: "Lê Hoàng Nam",
          phone: "0903123456",
          email: "namle.tech@gmail.com",
          category: "Sở hữu trí tuệ",
          question: "Doanh nghiệp chúng tôi muốn đăng ký bảo hộ độc quyền nhãn hiệu và sáng chế phần mềm trí tuệ nhân tạo (AI) tại Cục Sở Hữu Trí Tuệ. Nhờ Luật sư Phan Đức Tín tư vấn thủ tục và chi phí.",
          status: "completed",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveLocalQuestions = (list: UserQuestion[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save questions to localStorage:', err);
  }
};

export const questionService = {
  createQuestion: async (data: {
    name: string;
    phone: string;
    email: string;
    category: string;
    question: string;
  }): Promise<{ success: boolean; data?: UserQuestion }> => {
    const newQuestion: UserQuestion = {
      id: Date.now(),
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim() || 'khachhang@ductinlaw.vn',
      category: data.category,
      question: data.question.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local question storage
    const current = getLocalQuestions();
    current.unshift(newQuestion);
    saveLocalQuestions(current);

    // 2. Dispatch email notification
    fetch('/api/send-appointment-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newQuestion.name,
        phone: newQuestion.phone,
        email: newQuestion.email,
        service: `[CÂU HỎI TRỰC TUYẾN] ${newQuestion.category}`,
        notes: newQuestion.question,
        appointmentDate: new Date().toISOString().split('T')[0],
        appointmentTime: new Date().toTimeString().split(' ')[0],
      }),
    }).catch(err => console.error('Email dispatch failed:', err));

    return { success: true, data: newQuestion };
  },

  getQuestions: async (): Promise<UserQuestion[]> => {
    return getLocalQuestions();
  },

  updateStatus: async (id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled'): Promise<boolean> => {
    const current = getLocalQuestions();
    const index = current.findIndex(q => q.id === id);
    if (index !== -1) {
      current[index].status = status;
      saveLocalQuestions(current);
      return true;
    }
    return false;
  },

  deleteQuestion: async (id: number): Promise<boolean> => {
    const current = getLocalQuestions();
    const updated = current.filter(q => q.id !== id);
    saveLocalQuestions(updated);
    return true;
  },
};
