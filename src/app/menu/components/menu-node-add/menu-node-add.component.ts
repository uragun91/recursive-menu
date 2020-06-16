import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { MenuService } from 'src/app/menu/services/menu.service'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'

import * as Separator from '../../../core/constants/Separator'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

const separator = Separator.separator

@Component({
  selector: 'app-menu-node-add',
  templateUrl: './menu-node-add.component.html',
  styleUrls: ['./menu-node-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuNodeAddComponent implements OnInit {

  public menuNode = MenuNode.build()
  public MenuNodeTypes: typeof MenuNodeTypes = MenuNodeTypes
  private unsubscribe: Subject<void> = new Subject()

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.data
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((data: any) => {
        if (data.nodeType) {
          this.menuNode.type = data.nodeType
        }
      })
  }

  public ngOnInit(): void {
    const pathArray = this.menuService.parentOfCurrentNode && this.menuService.parentOfCurrentNode.path.split(separator) || []
    pathArray.push(this.menuNode.name)
    this.menuNode.path = pathArray.join(separator)
  }

  public addMenuNode(): void {
    this.menuService.addMenuNode(this.menuNode)
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
