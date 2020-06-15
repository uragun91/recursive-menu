import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'
import { NestedTreeControl } from '@angular/cdk/tree'

@Component({
  selector: 'app-menu-tree-node',
  templateUrl: './menu-tree-node.component.html',
  styleUrls: ['./menu-tree-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTreeNodeComponent {

  @Input() public node: MenuNode = new MenuNode()
  @Input() public treeControl: NestedTreeControl<MenuNode>

  public NodeTypes: typeof MenuNodeTypes = MenuNodeTypes
}
