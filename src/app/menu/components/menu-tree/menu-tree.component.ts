import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material'

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTreeComponent implements OnChanges {

  @Input() public menu: MenuNode[]

  public treeControl = new NestedTreeControl<MenuNode>((node: MenuNode) => node.children)
  public dataSource = new MatTreeNestedDataSource<MenuNode>()

  public ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.menu) {
      this.dataSource.data = this.menu
    }
  }

  public hasChild(index: number, node: MenuNode): boolean {
    return !!node.children && !!node.children.length
  }

}
