import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuService, separator } from 'src/app/menu/services/menu.service';
import { MenuNode } from 'src/app/core/models/menu-node.model';
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionAddComponent implements OnInit {

  public sectionNode = MenuNode.build({ type: MenuNodeTypes.SECTION })

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    const pathArray = this.menuService.parentOfCurrentNode.path.split(separator)
    pathArray.push(this.sectionNode.name)
    this.sectionNode.path = pathArray.join(separator)
  }

  public addSection(): void {
    this.menuService.addSection(this.sectionNode)
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
