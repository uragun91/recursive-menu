import { Product } from './product.model'

export class MenuNode {
  constructor(
    public name: string = '',
    public sections: MenuNode[] = [],
    public items: Product[] = []
  ) { }

  public static build(data: any = {}): MenuNode {
    return new MenuNode(
      data.name || '',
      Array.isArray(data.sections) ? data.sections.map(MenuNode.build) : [],
      Array.isArray(data.items) ? data.items.map(Product.build) : []
    )
  }
}
