import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { map, tap } from 'rxjs/operators'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'

const MENU_KEY = 'nomia__menu-data'
export const separator = ' \u2192 '

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

  public addSection(sectionNode: MenuNode) {
    const parentPath = sectionNode.path.split(separator).slice(0, -1).join(separator)
    const parentNode = this.getMenuNodeRefByPath(parentPath, this.menu)
    parentNode.children.push(sectionNode)
    console.log(this.menu)
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

  private toMenuTree(menuTreeDef: IMenu[]) {
    return menuTreeDef.map((menuNodeDef: IMenu) => this.toMenuNode(menuNodeDef))
  }

  private toMenuNode(menuNodeDef: IMenu, parentPath: string = ''): MenuNode {
    const currentNodePath = parentPath ? `${parentPath} ${separator} ${menuNodeDef.name}` : menuNodeDef.name

    const children = [
      ...menuNodeDef.sections.map((section: IMenu) => this.toMenuNode(section, currentNodePath)),
      ...menuNodeDef.items.map((product: IProduct) => {
        return new MenuNode(
          product.name,
          product.sale,
          MenuNodeTypes.PRODUCT,
          [],
          `${currentNodePath} ${separator} ${product.name}`
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
