import { apiClient } from '@/lib/api-client';

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type CreateAppointmentRequest = Omit<Appointment, 'id' | 'status'>;

export const appointmentService = {
  createAppointment: (data: CreateAppointmentRequest): Promise<Appointment> => {
    return apiClient.post('/appointments', data);
  },
  getAppointments: (): Promise<Appointment[]> => {
    return apiClient.get('/appointments');
  },
};
