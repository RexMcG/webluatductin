import { apiClient } from '@/lib/api-client';

export interface FormCheckRequest {
  formContent: string;
}

export interface FormCheckResponse {
  id: number;
  formContent: string;
  analysisResult: {
    isValid: boolean;
    score: number;
    issues: string[];
    recommendations: string[];
  };
}

export const formCheckerService = {
  analyzeForm: (data: FormCheckRequest): Promise<FormCheckResponse> => {
    return apiClient.post('/form-checker/analyze', data);
  },
};
