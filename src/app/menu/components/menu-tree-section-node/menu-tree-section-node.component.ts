import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MenuNode } from 'src/app/core/models/menu-node.model';

@Component({
  selector: 'app-menu-tree-section-node',
  templateUrl: './menu-tree-section-node.component.html',
  styleUrls: ['./menu-tree-section-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTreeSectionNodeComponent implements OnInit {

  @Input() public section: MenuNode

  constructor() { }

  ngOnInit() {
  }

}
