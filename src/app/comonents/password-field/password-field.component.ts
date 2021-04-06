import { Utils } from './../../utils';
import { FormControl, MinLengthValidator } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {
  show = false;
  @Input() placeholder = '';
  @Input() control: FormControl;
  getError = Utils.getError;

  constructor() { }
}
