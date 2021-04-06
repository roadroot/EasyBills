import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  data: any[];
  showed_cols: string[] = [];
  constructor(
    private firestore: AngularFirestore,
  ) {
    this.firestore.collection("Communes").valueChanges().subscribe(data => {
      this.data = data;
      this.showed_cols = Object.keys(data[0]);
    });
  }
}
