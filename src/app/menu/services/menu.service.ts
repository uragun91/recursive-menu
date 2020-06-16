import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { map, tap } from 'rxjs/operators'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'
import * as Separator from '../../core/constants/Separator'

const MENU_KEY = 'nomia__menu-data'
const separator = Separator.separator

interface IMenu {
  name: string,
  sections: IMenu[],
  items: IProduct[]
}

interface IProduct {
  name: string,
  sale: number
}

@Injectable()
export class MenuService {

  public menu: MenuNode[]

  public currentNode: MenuNode = null
  public parentOfCurrentNode: MenuNode = null

  constructor(private http: HttpClient) { }

  public getMenu(): Observable<MenuNode[]> {
    if (this.menu) {
      return of(this.menu)
    }

    const menuDataFromLocalStorage = localStorage.getItem(MENU_KEY)

    try {
      const menuData: IMenu = JSON.parse(menuDataFromLocalStorage)
      if (menuData) {
        const result = Array.isArray(menuData) ? this.toMenuTree(menuData) : []
        return of(result)
      }
    } catch (err) {

    }

    return this.http.get<MenuNode[]>('/assets/menu.json')
      .pipe(
        map((menuNodes: any) => {
          return Array.isArray(menuNodes) ? this.toMenuTree(menuNodes) : []
        }),
        tap((menuNodes: MenuNode[]) => {
          this.menu = menuNodes
        }),
        tap((menuNodes: MenuNode[]) => {
          localStorage.setItem(MENU_KEY, JSON.stringify(menuNodes))
        })
      )
  }

  public getSectionsPaths(): Observable<string[]> {
    return this.getMenu()
      .pipe(
        map((menuNodes: MenuNode[]) => {

          const getSectionNodesPaths = (nodes: MenuNode[], parentPath?: string): string[] => {
            return nodes.reduce((acc: string[], node: MenuNode) => {
              if (node.type === MenuNodeTypes.SECTION) {
                const route = parentPath ? `${parentPath}${separator}${node.name}` : node.name
                acc.push(route)
                if (node.children && node.children.length) {
                  acc = acc.concat(getSectionNodesPaths(node.children, route))
                }
              }

              return acc;
            }, [])
          }
          return getSectionNodesPaths(menuNodes)
        })
      )
  }

  public addMenuNode(menuNode: MenuNode) {
    const parentNode = this.getParentNodeRef(menuNode)
    if (parentNode) {
      parentNode.children.push(menuNode)
    } else {
      console.warn('Раздел будет добавлен в корневую секцию!')
      this.menu.push(menuNode)
    }
  }

  public saveMenuNode(menuNode: MenuNode, prevPath: string): void {
    const currentParentPath: string = this.getParentPath(menuNode.path)
    const prevParentPath: string = this.getParentPath(prevPath)

    const newSectionNode = MenuNode.build(menuNode)
    const parentPath = currentParentPath !== prevParentPath ? prevParentPath : currentParentPath
    const removedNodeIndex = this.removeMenuNode(menuNode, parentPath)

    const parentNode: MenuNode = this.getParentNodeRef(menuNode)
    const childrenHost: MenuNode[] = parentNode && parentNode.children || this.menu
    childrenHost.splice(removedNodeIndex, 0, newSectionNode)
  }

  public removeMenuNode(node: MenuNode, parentPath?: string): number {
    const parentNode: MenuNode = parentPath ? this.getMenuNodeRefByPath(parentPath, this.menu) : this.getParentNodeRef(node)
    const childrenHost: MenuNode[] = parentNode && parentNode.children || this.menu

    const sectionNodeIndex: number = childrenHost.indexOf(node)
    if (sectionNodeIndex > -1) {
      childrenHost.splice(sectionNodeIndex, 1)
    }

    return sectionNodeIndex
  }

  public setParentNodeForChild(node: MenuNode): void {
    this.parentOfCurrentNode = this.getParentNodeRef(node)
  }

  private getMenuNodeRefByPath(path: string, menuNodes: MenuNode[]) {
    const namePathParts: string[] = path.split(separator)

    const selectNodeByNestLevel = (nodes: MenuNode[], pathParts: string[], level: number = 0): MenuNode => {
      if (level > pathParts.length - 1) {
        return
      }
      const foundNode = nodes.find((node: MenuNode) => node.name === pathParts[level])
      if (!foundNode) {
        return
      }
      if (level === pathParts.length - 1) {
        return foundNode
      } else {
        return selectNodeByNestLevel(foundNode.children, pathParts, ++level)
      }
    }

    return selectNodeByNestLevel(menuNodes, namePathParts)
  }

  private getParentNodeRef(node: MenuNode): MenuNode {
    const parentPath = this.getParentPath(node.path)
    return this.getMenuNodeRefByPath(parentPath, this.menu)
  }

  private getParentPath(path: string) {
    return path.split(separator).slice(0, -1).join(separator)
  }

  private toMenuTree(menuTreeDef: IMenu[]) {
    return menuTreeDef.map((menuNodeDef: IMenu) => this.toMenuNode(menuNodeDef))
  }

  private toMenuNode(menuNodeDef: IMenu, parentPath: string = ''): MenuNode {
    const currentNodePath = parentPath ? `${parentPath}${separator}${menuNodeDef.name}` : menuNodeDef.name

    const children = [
      ...menuNodeDef.sections.map((section: IMenu) => this.toMenuNode(section, currentNodePath)),
      ...menuNodeDef.items.map((product: IProduct) => {
        return new MenuNode(
          product.name,
          product.sale,
          MenuNodeTypes.PRODUCT,
          [],
          `${currentNodePath}${separator}${product.name}`
        )
      })
    ]

    return new MenuNode(
      menuNodeDef.name,
      0,
      MenuNodeTypes.SECTION,
      children,
      currentNodePath
    )
  }
}
