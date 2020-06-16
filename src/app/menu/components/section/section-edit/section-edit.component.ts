import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuService, separator } from 'src/app/menu/services/menu.service';
import { MenuNode } from 'src/app/core/models/menu-node.model';
import { Router } from '@angular/router';
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionEditComponent implements OnInit {

  public sectionNode: MenuNode
  public initialPath: string

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.sectionNode = this.menuService.currentNode
    this.initialPath = this.sectionNode.path

    const pathArray = this.menuService.parentOfCurrentNode && this.menuService.parentOfCurrentNode.path.split(separator) || []
    pathArray.push(this.sectionNode.name)
    this.sectionNode.path = pathArray.join(separator)
  }

  public saveSection(): void {
    this.menuService.saveSection(this.sectionNode, this.initialPath)
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
