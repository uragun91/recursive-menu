import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-updates-counter',
  templateUrl: './updates-counter.component.html',
  styleUrls: ['./updates-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatesCounterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
