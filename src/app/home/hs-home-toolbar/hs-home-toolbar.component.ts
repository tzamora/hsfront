import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hs-home-toolbar',
  template: `
    <mat-toolbar color="primary" style="height: 40px">
      Heritage Sports
    </mat-toolbar>
  `,
  styles: []
})
export class HsHomeToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
