export default interface Article {
  id?: string;
  tag?: string[];
  description?: string;
  image?: string;
  num?: number;
  title: string;
  create_at: number; // 可以使用 Date 類型如果需要日期對象
  author: string;
  content: string;
  isPublic: boolean;
}
