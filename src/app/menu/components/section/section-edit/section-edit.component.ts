import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
