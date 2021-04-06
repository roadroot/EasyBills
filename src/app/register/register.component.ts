import { Utils } from './../utils';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() switchPage = new EventEmitter<boolean>();
  familyName = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  confirmEmail = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.minLength(6)]);
  birthDate = new FormControl('', [Validators.required]);
  constructor(private auth: AngularFireAuth) { }
  getError = Utils.getError;

  ngOnInit(): void {
  }

  async onRegisterClicked() {
    if(this.familyName.invalid ||
      this.name.invalid ||
      this.email.invalid ||
      this.confirmEmail.invalid ||
      this.password.invalid ||
      this.confirmPassword.invalid ||
      this.birthDate.invalid) {
        alert('Please fill the form and correct errors before you continue');
        return;
    }

    try {
      await this.auth.createUserWithEmailAndPassword(this.email.value, this.password.value);
    } catch (error) {
      const user = await this.auth.user.toPromise();
      alert(error.message);
    }
  }
}
