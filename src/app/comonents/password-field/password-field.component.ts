import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {
  show = false;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder = '';
  @Input() password = '';

  constructor() { }
}
