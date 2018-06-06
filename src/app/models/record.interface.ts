export interface Record {
  recordId?: string;
  userid?: string;
  name: string;
  value: number;
  createdAt: string;
  month: number;
  year: number;
  week: number;
  details: string;
  img: string;
  income: boolean;
  expanded?: boolean;
}
