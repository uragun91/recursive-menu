import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-svg-icons',
  templateUrl: './svg-icons.component.html',
  styleUrls: ['./svg-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
