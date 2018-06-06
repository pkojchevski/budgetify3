import {FormControl} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {ValidationService} from '../services/validation.service';

@Component({
  selector: 'app-control-message',
  template: `<div><strong>{{errorMessage}}</strong></div>`,
})
export class ControlMessagesComponent {
  @Input() control: FormControl;

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors
        );
      }
    }
    return null;
  }
}
