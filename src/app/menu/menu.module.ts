import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuHomeComponent } from './menu-home/menu-home.component'
import { MenuRoutingModule } from './menu-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [MenuHomeComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
