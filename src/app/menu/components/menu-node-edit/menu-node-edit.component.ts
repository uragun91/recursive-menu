import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { MenuService } from 'src/app/menu/services/menu.service'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { Router } from '@angular/router'

import * as Separator from '../../../core/constants/Separator'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'

const separator = Separator.separator

@Component({
  selector: 'app-menu-node-edit',
  templateUrl: './menu-node-edit.component.html',
  styleUrls: ['./menu-node-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuNodeEditComponent implements OnInit {

  public menuNode: MenuNode
  public initialPath: string
  public MenuNodeTypes: typeof MenuNodeTypes = MenuNodeTypes

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.menuNode = this.menuService.currentNode
    this.initialPath = this.menuNode.path

    const pathArray = this.menuService.parentOfCurrentNode && this.menuService.parentOfCurrentNode.path.split(separator) || []
    pathArray.push(this.menuNode.name)
    this.menuNode.path = pathArray.join(separator)
  }

  public saveMenuNode(): void {
    this.menuService.saveMenuNode(this.menuNode, this.initialPath)
    this.clearStateAndGoBackToMenu()
  }

  public cancel(): void {
    this.clearStateAndGoBackToMenu()
  }

  private clearStateAndGoBackToMenu() {
    this.menuService.currentNode = null
    this.menuService.parentOfCurrentNode = null
    this.router.navigateByUrl('menu')
  }

}
