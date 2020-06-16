import { MenuNodeTypes } from '../enums/menu-node-types.enum'

export class MenuNode {
  constructor(
    public name: string = '',
    public sale: number = 0,
    public type: MenuNodeTypes = MenuNodeTypes.SECTION,
    public children: MenuNode[] = [],
    public path: string = ''
    ) { }

  public static build(data: any = {}): MenuNode {
    let nodeType = MenuNodeTypes.SECTION
    if (Object.values(MenuNodeTypes).includes(data.type)) {
      nodeType = data.type
    }

    return new MenuNode(
      data.name || '',
      data.sale || 0,
      nodeType,
      Array.isArray(data.children) ? data.children.map(MenuNode.build) : [],
      data.path
    )
  }
}
