import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {

  public allSections: string[] = []

  constructor(
    private menuSerive: MenuService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.menuSerive.getSections()
      .subscribe((sections: string[]) => {
        this.allSections = sections
        this.cd.detectChanges()
      })
  }

}
