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
import { SectionFormComponent } from './components/section/section-form/section-form.component';
import { SectionAddComponent } from './components/section/section-add/section-add.component';
import { SectionEditComponent } from './components/section/section-edit/section-edit.component';
import { SectionHomeComponent } from './components/section/section-home/section-home.component'

@NgModule({
  declarations: [
    MenuHomeComponent,
    MenuTreeComponent,
    MenuTreeNodeComponent,
    SectionFormComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionHomeComponent
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
