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
  }): Promise<any> => {
    const res = await apiClient.post('/appointments', data);
    return res;
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
