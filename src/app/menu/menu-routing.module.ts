import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from '../shared/components/layout/layout.component'
import { MenuHomeComponent } from './components/menu-home/menu-home.component'
import { SectionAddComponent } from './components/section/section-add/section-add.component'
import { SectionEditComponent } from './components/section/section-edit/section-edit.component'
import { SectionHomeComponent } from './components/section/section-home/section-home.component'

const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MenuHomeComponent },
      {
        path: 'section',
        component: SectionHomeComponent,
        children: [
          { path: 'add', component: SectionAddComponent },
          { path: 'edit', component: SectionEditComponent }
        ]
      },
      { path: 'product/add', component: MenuHomeComponent },
      { path: 'product/edit', component: MenuHomeComponent }
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
