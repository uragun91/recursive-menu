import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from '../shared/components/layout/layout.component'
import { MenuHomeComponent } from './components/menu-home/menu-home.component'
import { MenuNodeAddComponent } from './components/menu-node-add/menu-node-add.component'
import { MenuNodeEditComponent } from './components/menu-node-edit/menu-node-edit.component'
import { MenuNodeTypes } from '../core/enums/menu-node-types.enum'

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MenuHomeComponent },
      { path: 'section/add', component: MenuNodeAddComponent, data: { nodeType: MenuNodeTypes.SECTION } },
      { path: 'section/edit', component: MenuNodeEditComponent },
      { path: 'product/add', component: MenuNodeAddComponent, data: { nodeType: MenuNodeTypes.PRODUCT } },
      { path: 'product/edit', component: MenuNodeEditComponent }
    ]
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class MenuRoutingModule { }
