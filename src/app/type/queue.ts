export type QueueType = 'priority' | 'normal' | 'walkin' | 'print';

export interface QueueEntry {
  number: string;
  type: QueueType;
  status: 'waiting' | 'served';
  EnqueueTime?: string;
}

export type NowServingMap = {
  [key in QueueType]: QueueEntry | null;
};

