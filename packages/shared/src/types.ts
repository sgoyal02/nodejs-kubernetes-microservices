export interface Job {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}
