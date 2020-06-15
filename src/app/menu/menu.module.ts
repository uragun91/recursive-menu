// angular
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// modules
import { SharedModule } from '../shared/shared.module'
import { MenuRoutingModule } from './menu-routing.module'

// services
import { MenuService } from './services/menu.service'

// components
import { MenuHomeComponent } from './components/menu-home/menu-home.component'
import { MenuTreeComponent } from './components/menu-tree/menu-tree.component'
import { MenuTreeSectionNodeComponent } from './components/menu-tree-section-node/menu-tree-section-node.component'

@NgModule({
  declarations: [
    MenuHomeComponent,
    MenuTreeComponent,
    MenuTreeSectionNodeComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule { }
