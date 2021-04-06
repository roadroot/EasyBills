import { Utils } from './../utils';
import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  @Output() switchPage = new EventEmitter<boolean>();
  getError = Utils.getError;

  constructor() { }
  @Input()
  signInClicked(): void {
    console.log(this.email + ' ' + this.password);
  }

  ngOnInit(): void {
  }

}
