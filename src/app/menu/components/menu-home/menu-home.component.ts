import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { MenuService } from 'src/app/menu/services/menu.service'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHomeComponent implements OnInit {

  public menu: MenuNode[]
  public isLoading: boolean = false

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  public ngOnInit() {
    this.getMenu()
  }

  public getMenu(): void {
    this.menuService.getMenu()
      .pipe(
        tap((menuNodes: MenuNode[]) => this.menu = menuNodes),
        tap(() => {
          this.cdr.detectChanges()
        })
      )
      .subscribe()
  }

  public gotoAddProductPage(node?: MenuNode): void {
    if (node) {
      this.menuService.currentNode = node
    }

    this.router.navigateByUrl('menu/product/add')
  }

  public gotoAddSectionPage(node?: MenuNode): void {
    if (node) {
      this.menuService.parentOfCurrentNode = node
    }

    this.router.navigateByUrl('menu/section/add')
  }

  public gotoEditNodePage(node: MenuNode): void {
    this.menuService.currentNode = node
    this.menuService.setParentNodeForChild(node)

    if (node.type === MenuNodeTypes.PRODUCT) {
      this.router.navigateByUrl('menu/product/edit')
    } else if (node.type === MenuNodeTypes.SECTION) {
      this.router.navigateByUrl('menu/section/edit')
    }
  }

  public removeNodeFromTree(node: MenuNode): void {
  }




}
