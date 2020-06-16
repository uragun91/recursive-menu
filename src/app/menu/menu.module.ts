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
import { MenuTreeNodeComponent } from './components/menu-tree-node/menu-tree-node.component'
import { SectionFormComponent } from './components/section-form/section-form.component'
import { MenuNodeAddComponent } from './components/menu-node-add/menu-node-add.component'
import { MenuNodeEditComponent } from './components/menu-node-edit/menu-node-edit.component'
import { ProductFormComponent } from './components/product-form/product-form.component'

@NgModule({
  declarations: [
    MenuHomeComponent,
    MenuTreeComponent,
    MenuTreeNodeComponent,
    SectionFormComponent,
    MenuNodeAddComponent,
    MenuNodeEditComponent,
    ProductFormComponent,
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
