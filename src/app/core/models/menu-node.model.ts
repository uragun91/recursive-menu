import { MenuNodeTypes } from '../enums/menu-node-types.enum'
import * as Separator from '../constants/Separator'

export class MenuNode {
  constructor(
    private _name: string = '',
    public sale: number = 0,
    public type: MenuNodeTypes = MenuNodeTypes.SECTION,
    public children: MenuNode[] = [],
    public path: string = '',
    private separator:  string = Separator.separator
    ) { }

  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
    const pathArray = this.path.split(this.separator).slice(0, -1)
    pathArray.push(value)
    this.path = pathArray.join(this.separator)
  }

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

  public getParentPath(): string {
    return this.path.split(this.separator).slice(0, -1).join(this.separator)
  }
}
