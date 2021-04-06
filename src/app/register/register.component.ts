import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() switchPage = new EventEmitter<boolean>();
  familyName: string;
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  birthDate: Date;
  confirmPassword: string;
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async onRegisterClicked() {
    console.log(this.familyName);
    console.log(this.name);
    console.log(this.birthDate);
    console.log(this.email);
    console.log(this.confirmEmail);
    console.log(this.password);
    console.log(this.confirmPassword);
    try {
      await this.auth.createUserWithEmailAndPassword(this.email, this.password);
    } catch (error) {
      console.log(error);
    }
  }

}
