import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CustomMaterialModule } from '../custom-material/custom-material.module'
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { ContentPlaceholderAnimationComponent } from './components/content-placeholder-animation/content-placeholder-animation.component'
import { LayoutComponent } from './components/layout/layout.component';
import { SvgIconsComponent } from './components/svg-icons/svg-icons.component';
import { UpdatesCounterComponent } from './components/updates-counter/updates-counter.component';
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
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
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
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    SvgIconsComponent,
    UpdatesCounterComponent,
    UserMenuComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
