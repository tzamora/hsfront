import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-body',
  template: `    
    <mat-sidenav-container class="hs-sidenav-container">
      <mat-sidenav #sidenav class="hs-sidenav">
        
        <mat-toolbar color="primary">
          Customer
        </mat-toolbar>
        
      </mat-sidenav>

      <mat-sidenav-content class="hs-sidenav-content">
        <router-outlet></router-outlet>
        <button type="button" mat-button (click)="sidenav.open()">open sidenav</button>
      </mat-sidenav-content>
    </mat-sidenav-container>
    
  `,
  styles: [`
  
    .hs-sidenav-container{
      flex:1;
      width: 100%;
      min-width: 100%;
      height: 100%;
      min-height: 100%;
      border: 1px solid #aaffaa;
      position:fixed;
    }
    
    .hs-sidenav{
      width: 250px;
    }
    
    .hs-sidenav-content{
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    
  `]
})
export class HomeBodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
