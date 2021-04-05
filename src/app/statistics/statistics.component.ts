import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA: Commune[] = [{name: 'a', nam: 'b'}, {name: 'c', nam: 'd'}];
@Component({
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  displayedColumns = ['name', 'nam'];
  constructor() { }

  ngOnInit(): void {
  }
}
export interface Commune {
  name: string;
  nam : string;
}