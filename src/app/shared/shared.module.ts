import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CustomMaterialModule } from '../custom-material/custom-material.module'

import { LayoutComponent } from './components/layout/layout.component'
import { SvgIconsComponent } from './components/svg-icons/svg-icons.component'
import { UpdatesCounterComponent } from './components/updates-counter/updates-counter.component'
import { UserMenuComponent } from './components/user-menu/user-menu.component'

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    LayoutComponent,
    SvgIconsComponent,
    UpdatesCounterComponent,
    UserMenuComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    SvgIconsComponent,
    UpdatesCounterComponent,
    UserMenuComponent
  ]
})
export class SharedModule { }
