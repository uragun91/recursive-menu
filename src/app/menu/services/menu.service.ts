import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MenuNode } from 'src/app/core/models/menu-node.model';
import { map, tap } from 'rxjs/operators';

const MENU_KEY = 'nomia__menu-data'

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  public getMenu(): Observable<MenuNode[]> {
    const menuDataFromLocalStorage = localStorage.getItem(MENU_KEY)

    try {
      const menuData = JSON.parse(menuDataFromLocalStorage)
      if (menuData) {
        const result = Array.isArray(menuData) ? menuData.map(MenuNode.build) : []
        return of(result)
      }
    } catch (err) {

    }

    return this.http.get<MenuNode[]>('/assets/menu.json')
      .pipe(
        map((menuNodes: any) => {
          return Array.isArray(menuNodes) ? menuNodes.map(MenuNode.build) : []
        }),
        tap((menuNode: MenuNode[]) => {
          localStorage.setItem(MENU_KEY, JSON.stringify(menuNode))
        })
      )
  }
}
