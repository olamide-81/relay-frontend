export interface Provider {
  name: string;
  category: string;
  regions: string[];
  uptime: string;
  desc: string;
}

export interface Category {
  name: string;
  count: number;
}
