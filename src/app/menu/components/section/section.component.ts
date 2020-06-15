import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {

  public allSections: string[] = []
  public sectionForm: FormGroup

  constructor(
    private menuSerive: MenuService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.sectionForm = this.fb.group({
      'name': ['', [Validators.required]],
      'section': ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.menuSerive.getSections()
      .subscribe((sections: string[]) => {
        this.allSections = sections
        this.cd.detectChanges()
      })
  }

}
