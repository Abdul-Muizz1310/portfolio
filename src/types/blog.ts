export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  cover_image: string | null;
  social_image: string | null;
}

export interface LinkedInArticle {
  title: string;
  url: string;
  date: string;
  description: string;
  thumbnail?: string;
}
