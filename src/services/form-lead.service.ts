export interface FormDownloadLead {
  id: string;
  name: string;
  phone: string;
  formId?: number | string;
  formTitle: string;
  formCategory?: string;
  status: "new" | "contacted" | "completed" | "cancelled";
  createdAt: string;
}

const STORAGE_KEY = "ductin_form_download_leads_v1";

const INITIAL_LEADS: FormDownloadLead[] = [
  {
    id: "lead-1",
    name: "Trần Minh Quang",
    phone: "0918234567",
    formId: 1,
    formTitle: "Đơn yêu cầu công nhận thuận tình ly hôn, nuôi con và chia tài sản",
    formCategory: "Hôn nhân & Gia đình",
    status: "new",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "lead-2",
    name: "Công ty TNHH Đầu tư Nam Long",
    phone: "0903998877",
    formId: 2,
    formTitle: "Hợp đồng thuê nhà ở / Mặt bằng kinh doanh thương mại",
    formCategory: "Đất đai & Hợp đồng",
    status: "contacted",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
];

export const formLeadService = {
  getLeads: async (): Promise<FormDownloadLead[]> => {
    if (typeof window === "undefined") return INITIAL_LEADS;
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_LEADS;
    }
  },

  createLead: async (data: {
    name: string;
    phone: string;
    formId?: number | string;
    formTitle: string;
    formCategory?: string;
  }): Promise<FormDownloadLead> => {
    const leads = await formLeadService.getLeads();
    const newLead: FormDownloadLead = {
      id: `lead-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      formId: data.formId,
      formTitle: data.formTitle,
      formCategory: data.formCategory || "Biểu mẫu pháp lý",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const updated = [newLead, ...leads];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return newLead;
  },

  updateStatus: async (
    id: string,
    status: FormDownloadLead["status"]
  ): Promise<void> => {
    const leads = await formLeadService.getLeads();
    const updated = leads.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },

  deleteLead: async (id: string): Promise<void> => {
    const leads = await formLeadService.getLeads();
    const updated = leads.filter((item) => item.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },
};
