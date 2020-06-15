import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MAT_DATE_FORMATS, MatIconModule, MatToolbarModule, MatButtonModule,
  MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
  MatSnackBarModule, MatMenuModule, MatSidenavModule,
  MatProgressSpinnerModule, MatDatepickerModule, MatTableModule,
  MatAutocompleteModule, MatDialogModule, MatTabsModule, MatTooltipModule,
  MatSelectModule, MatChipsModule, MatButtonToggleModule,
  MatSlideToggleModule, MatBadgeModule, MatCheckboxModule, MatExpansionModule, MatSortModule, MatTreeModule
} from '@angular/material';
import { SelectCheckAllComponent } from './select-check-all/select-check-all.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatMomentDateModule,
    MatIconModule, MatButtonModule,
    MatCardModule, MatProgressBarModule,
    MatSnackBarModule, MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, DragDropModule, MatTreeModule
  ],
  exports: [
    CommonModule,
    MatIconModule, MatButtonModule,
    MatCardModule, MatProgressBarModule,
    MatSnackBarModule, MatMenuModule, MatProgressSpinnerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatSelectModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, SelectCheckAllComponent, DragDropModule, MatTreeModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    { provide: LOCALE_ID, useValue: 'en-gb' }
  ],
  declarations: [SelectCheckAllComponent]
})
export class CustomMaterialModule {
  static forRoot() {
    return {
      ngModule: CustomMaterialModule,
      providers: [
      ]
    };
  }
}
