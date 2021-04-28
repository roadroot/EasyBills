import { Utils } from './../utils';
import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


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

  constructor(private auth: AngularFireAuth, private router: Router) { }
  @Input()
  async signInClicked(): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(this.email.value, this.password.value);
      this.router.navigateByUrl('user');
    } catch (error) {
      alert(error.message);
    }
  }

  ngOnInit(): void {
  }

}
