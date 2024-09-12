export default interface Product {
  id?: string; // 唯一标识符(新建立的沒有)
  category: string; // 类别
  content: string; // 内容
  description: string; // 描述
  imageUrl: string; // 图片 URL
  imagesUrl: string[];
  is_enabled: string; // 是否启用（字符串类型）
  num: number; // 数量
  origin_price: number; // 原价
  price: number; // 价格
  title: string; // 标题
  unit: string; // 单位
  createAt: number | string;
  updateAt: number | string;
}
