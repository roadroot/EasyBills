import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})
export class ConnectedComponent implements OnInit {
  connected = false;
  user: any;
  constructor(public auth: AngularFireAuth, public router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
      if (user != null && user != undefined) {
        this.connected = true;
      }
    });
  }

}
