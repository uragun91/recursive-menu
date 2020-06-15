import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { MenuService } from 'src/app/menu/services/menu.service'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHomeComponent implements OnInit {

  public menu: MenuNode[]
  public isLoading: boolean = false

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.getMenu()
  }

  public getMenu(): void {
    this.menuService.getMenu()
      .pipe(
        tap((menuNodes: MenuNode[]) => this.menu = menuNodes),
        tap(() => {
          console.log(this.menu)
          this.cdr.detectChanges()
        })
      )
      .subscribe()
  }


}
