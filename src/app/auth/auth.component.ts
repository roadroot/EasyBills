import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { fade } from './../fade.animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fade]
})
export class AuthComponent implements OnInit {
  index = false;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  switch(): void {
    this.index = !this.index;
  }
}
