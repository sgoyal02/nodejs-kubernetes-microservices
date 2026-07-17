export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  msg: string;
  data?: T | null;
  err: string | null;
}

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type JobType = 'calculate-primes' | 'bcrypt-hash' | 'sort-array';

export interface JobData {
  type: JobType;
  payload?: Record<string, unknown> | null;
}

export interface Job extends JobData {
  id: string;
  status: JobStatus;
  createdAt: string;
  completedAt?: string;
  result?: unknown;
  error?: string;
  processTime?: number;
}
