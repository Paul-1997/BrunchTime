export default interface Coupon {
  id?: string;
  code: string;
  due_date: number; // 假设这是一个时间戳
  is_enabled: number; // 可能表示启用状态
  num: number;
  percent: number;
  title: string;
}
