import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { NestedTreeControl } from '@angular/cdk/tree'
import { MatTreeNestedDataSource } from '@angular/material'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTreeComponent implements OnChanges {

  @Input() public menu: MenuNode[]

  @Output() public addSectionNodeClick: EventEmitter<MenuNode> = new EventEmitter()
  @Output() public addProductNodeClick: EventEmitter<MenuNode> = new EventEmitter()
  @Output() public editNodeClick: EventEmitter<MenuNode> = new EventEmitter()
  @Output() public removeNodeClick: EventEmitter<MenuNode> = new EventEmitter()

  public treeControl = new NestedTreeControl<MenuNode>((node: MenuNode) => node.children)
  public dataSource = new MatTreeNestedDataSource<MenuNode>()

  public ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.menu) {
      this.dataSource.data = this.menu
    }
  }

  public isSection(index: number, node: MenuNode): boolean {
    return node.type === MenuNodeTypes.SECTION
  }

  public onAddNewNodeClick(menuNodeType: MenuNodeTypes, node: MenuNode): void {
    if (menuNodeType === MenuNodeTypes.PRODUCT) {
      this.addProductNodeClick.emit(node)
    } else if (menuNodeType === MenuNodeTypes.SECTION) {
      this.addSectionNodeClick.emit(node)
    }
  }

  public onEditNodeClick(node: MenuNode): void {
    this.editNodeClick.emit(node)
  }

  public onRemoveNodeClick(node: MenuNode): void {
    this.removeNodeClick.emit(node)
  }

}
