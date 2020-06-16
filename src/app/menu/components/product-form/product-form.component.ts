import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MenuNode } from 'src/app/core/models/menu-node.model'
import { MenuNodeTypes } from 'src/app/core/enums/menu-node-types.enum'
import { tap, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnDestroy {

  @Input() productNode: MenuNode = MenuNode.build({ type: MenuNodeTypes.PRODUCT })
  @Output() submit: EventEmitter<void> = new EventEmitter()
  @Output() cancel: EventEmitter<void> = new EventEmitter()

  public productForm: FormGroup
  private unsubscribe: Subject<void> = new Subject()

  constructor(
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      'name': ['', [Validators.required]],
      'sale': ['']
    })
  }

  ngOnInit() {
    this.productForm.get('name').setValue(this.productNode.name)
    this.productForm.get('sale').setValue(this.productNode.sale)

    this.productForm.get('name').valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((name: string) => {
          this.productNode.name = name
        })
      ).subscribe()

    this.productForm.get('sale').valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((sale: number) => {
          this.productNode.sale = sale
        })
      ).subscribe()
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  public onSaveClick(): void {
    if (this.productForm.valid) {
      this.submit.emit()
    }
  }

  public onCancelClick(): void {
    this.cancel.emit()
  }

}
