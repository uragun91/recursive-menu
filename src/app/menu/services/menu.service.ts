import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { map, tap } from 'rxjs/operators'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'

const MENU_KEY = 'nomia__menu-data'

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

  constructor(private http: HttpClient) { }

  public getMenu(): Observable<MenuNode[]> {
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
        tap((menuNode: MenuNode[]) => {
          localStorage.setItem(MENU_KEY, JSON.stringify(menuNode))
        })
      )
  }

  public getSections(): Observable<string[]> {
    return this.getMenu()
      .pipe(
        map((menuNodes: MenuNode[]) => {

          const getNodesNames = (nodes: MenuNode[], parentRoute?: string): string[] => {
            return nodes.reduce((acc: string[], node: MenuNode) => {
              if (node.type === MenuNodeTypes.SECTION) {
                const route = parentRoute ? `${parentRoute} - ${node.name}` : node.name
                acc.push(route)
                if (node.children && node.children.length) {
                  acc = acc.concat(getNodesNames(node.children, route))
                }
              }

              return acc;
            }, [])
          }
          const result: string[] = getNodesNames(menuNodes)
          result.unshift('Основной')
          return result
        })
      )
  }

  private toMenuTree(menuTreeDef: IMenu[]) {
    return menuTreeDef.map((menuNodeDef: IMenu) => this.toMenuNode(menuNodeDef))
  }

  private toMenuNode(menuNodeDef: IMenu): MenuNode {
    const children = [
      ...menuNodeDef.sections.map((section: IMenu) => this.toMenuNode(section)),
      ...menuNodeDef.items.map((product: IProduct) => {
        return new MenuNode(
          product.name,
          product.sale,
          MenuNodeTypes.PRODUCT,
          []
        )
      })
    ]

    return new MenuNode(
      menuNodeDef.name,
      0,
      MenuNodeTypes.SECTION,
      children
    )
  }
}
