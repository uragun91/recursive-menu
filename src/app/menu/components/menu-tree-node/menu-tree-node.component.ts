import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'
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

  @Input() public node: MenuNode
  @Input() public treeControl: NestedTreeControl<MenuNode>

  @Output() public addNewNodeClick: EventEmitter<MenuNodeTypes> = new EventEmitter()
  @Output() public editNodeClick: EventEmitter<void> = new EventEmitter()
  @Output() public removeNodeClick: EventEmitter<void> = new EventEmitter()

  public NodeTypes: typeof MenuNodeTypes = MenuNodeTypes

  public onAddNewNodeClick(type: MenuNodeTypes): void {
    this.addNewNodeClick.emit(type)
  }

  public onEditNodeClick(): void {
    this.editNodeClick.emit()
  }

  public onRemoveNodeClick(): void {
    this.removeNodeClick.emit()
  }
}
