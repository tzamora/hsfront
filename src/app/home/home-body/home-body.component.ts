import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-body',
  template: `    
    <mat-sidenav-container class="hs-sidenav-container">
      <mat-sidenav #sidenav 
                   class="hs-sidenav mat-elevation-z10" 
                   [opened]="!isScreenSmall()"
                   [mode]="isScreenSmall() ? 'over' : 'side'">

        <mat-card class="example-card">
          <mat-card-header>
            <div mat-card-avatar class="example-header-image"></div>
            <mat-card-title>Shiba Inu</mat-card-title>
            <mat-card-subtitle>Dog Breed</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
          <mat-card-content>
            <p>
              The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
              A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
              bred for hunting.
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button>LIKE</button>
            <button mat-button>SHARE</button>
          </mat-card-actions>
        </mat-card>
        
        
        <!--<app-component-sidenav></app-component-sidenav>-->
        
        
        
      </mat-sidenav>

      <mat-sidenav-content class="hs-sidenav-content">
        <hs-home-toolbar></hs-home-toolbar>
        <router-outlet></router-outlet>
        <button type="button" mat-button (click)="sidenav.toggle()">open sidenav</button>
        <h3>Raised Buttons</h3>
        <div class="button-row">
          <button mat-raised-button>Basic</button>
          <button mat-raised-button color="primary">Primary</button>
          <button mat-raised-button color="accent">Accent</button>
          <button mat-raised-button color="warn">Warn</button>
          <button mat-raised-button disabled>Disabled</button>
          <a mat-raised-button routerLink=".">Link</a>
        </div>


        
            <!--<app-component-nav></app-component-nav>-->
          



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
      flex-direction: column;
    }
    
  `]
})
export class HomeBodyComponent implements OnInit {

  mediaMatcher:MediaQueryList = matchMedia(`(max-width: 720px)`)

  constructor(zone:NgZone) {
    this.mediaMatcher.addListener(mql =>
      zone.run(()=> this.mediaMatcher = mql));
  }

  ngOnInit() {
  }

  isScreenSmall(){
    return this.mediaMatcher.matches;
  }

}
