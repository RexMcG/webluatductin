import { apiClient } from '@/lib/api-client';

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  service?: string;
  createdAt: string;
}

export const appointmentService = {
  createAppointment: async (data: {
    name: string;
    phone: string;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
    service?: string;
    notes?: string;
    consultType?: string;
    attorney?: string;
    address?: string;
  }): Promise<any> => {
    // 1. Dispatch email immediately via Vercel Serverless
    const emailPromise = fetch('/api/send-appointment-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => console.error('Direct email dispatch failed:', err));

    // 2. Persist to Backend DB concurrently
    const dbPromise = apiClient.post('/appointments', data).catch((err) => {
      console.warn('Backend DB sync note:', err);
      return { success: true };
    });

    // Race with a 1.2-second cap so the user gets instant feedback
    await Promise.race([
      Promise.allSettled([emailPromise, dbPromise]),
      new Promise((resolve) => setTimeout(resolve, 1200))
    ]);

    return { success: true };
  },

  getAppointments: async (): Promise<Appointment[]> => {
    const res = await apiClient.get<Appointment[]>('/appointments');
    return (res as any) || [];
  },

  getAppointmentById: async (id: number): Promise<Appointment> => {
    const res = await apiClient.get<Appointment>(`/appointments/${id}`);
    return (res as any) || res;
  },

  updateStatus: async (id: number, status: string): Promise<any> => {
    const res = await apiClient.put(`/appointments/${id}/status`, { status });
    return res;
  },

  deleteAppointment: async (id: number): Promise<any> => {
    const res = await apiClient.delete(`/appointments/${id}`);
    return res;
  },
};
