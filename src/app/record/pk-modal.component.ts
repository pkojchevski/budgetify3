import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PkModalService } from './pk-modal.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

 import * as $ from 'jquery';

@Component({
  // tslint:disable-next-line:component-selector
  moduleId: module.id.toString(),
  // tslint:disable-next-line:component-selector
  selector: 'pk-modal',
  template: '<ng-content></ng-content>'
})

export class PkModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: $;

  constructor(private modalService: PkModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit() {
    const modal = this;
    console.log('modal:' + JSON.stringify(modal));
    if (!this.id) {
      console.error('Modal must have an id');
      return;
    }
    this.element.appendTo('body');

    // close modal on background click
    this.element.on('click', (e) => {
      const target = $(e.target);
    if (!target.closest('.modal-body').length) {
      modal.close();
    }
    });
    // add self(this moda instance) to the modal\service so it s accesibla from controllers
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.show();
    $('.modal').addClass('show');
  }

  close(): void {
    this.element.hide();

  }
}
