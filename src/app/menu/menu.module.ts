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
import { MenuTreeNodeComponent } from './components/menu-tree-node/menu-tree-node.component';
import { SectionComponent } from './components/section/section.component'

@NgModule({
  declarations: [
    MenuHomeComponent,
    MenuTreeComponent,
    MenuTreeNodeComponent,
    SectionComponent
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
