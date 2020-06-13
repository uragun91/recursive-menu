import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from '../shared/components/layout/layout.component'
import { MenuHomeComponent } from './menu-home/menu-home.component'

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MenuHomeComponent }
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
