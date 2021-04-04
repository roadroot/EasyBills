import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  email = '';
  password = '';
  @Output() switchPage = new EventEmitter<boolean>();

  constructor() { }
  @Input()
  signInClicked(): void {
    console.log(this.email + ' ' + this.password);
  }

  ngOnInit(): void {
  }

}
