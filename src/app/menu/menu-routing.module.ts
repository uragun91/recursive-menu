import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from '../shared/components/layout/layout.component'
import { MenuHomeComponent } from './components/menu-home/menu-home.component'
import { SectionComponent } from './components/section/section.component'

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MenuHomeComponent },
      { path: 'section', component: SectionComponent },
      { path: 'product', component: MenuHomeComponent }
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
