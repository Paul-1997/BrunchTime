export default interface Article {
  author: string;
  create_at: number; // 可以使用 Date 類型如果需要日期對象
  description: string;
  id: string;
  image: string;
  isPublic: boolean;
  tag: string[];
  title: string;
  num: number;
}
