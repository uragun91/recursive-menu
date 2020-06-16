import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core'
import { MenuService, separator } from '../../../services/menu.service'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'
import { tap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionFormComponent implements OnInit, OnDestroy {

  @Input() sectionNode: MenuNode = MenuNode.build({ type: MenuNodeTypes.SECTION })
  @Output() submit: EventEmitter<void> = new EventEmitter()

  public allSections: string[] = []
  public sectionForm: FormGroup

  private unsubscribe: Subject<void> = new Subject()

  constructor(
    private menuSerive: MenuService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.sectionForm = this.fb.group({
      'name': ['', [Validators.required]],
      'section': ['']
    })
  }

  ngOnInit() {
    this.sectionForm.get('name').setValue(this.sectionNode.name)
    this.sectionForm.get('section').setValue(this.sectionNode.path.split(separator).slice(0, -1).join(separator))

    this.sectionForm.get('section').valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((section: string) => {
          this.sectionNode.path = `${section}${separator}${this.sectionNode.name}`
        })
      ).subscribe()

    this.sectionForm.get('name').valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((name: string) => {
          this.sectionNode.name = name
          const pathArray = this.sectionNode.path.split(separator).slice(0, -1)
          pathArray.push(name)
          this.sectionNode.path = pathArray.join(separator)
        })
      ).subscribe()


    this.menuSerive.getSectionsPaths()
      .subscribe((sections: string[]) => {
        this.allSections = sections
        this.cd.detectChanges()
      })
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  public onSaveClick(): void {
    if (this.sectionForm.valid) {
      this.submit.emit()
    }
  }

}
