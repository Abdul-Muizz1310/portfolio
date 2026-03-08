export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  command: string;
  icon: string;
}

export interface Testimonial {
  hash: string;
  author: string;
  company: string;
  role: string;
  date: string;
  quote: string;
}
