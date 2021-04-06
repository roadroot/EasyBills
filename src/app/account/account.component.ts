import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any;
  constructor(private auth: AngularFireAuth) {
  }

  async ngOnInit(): Promise<void> {
    this.auth.user.subscribe(
      (user) => this.user = user
    );
  }
}
