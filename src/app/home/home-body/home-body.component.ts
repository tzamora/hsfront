import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
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

    .material-docs-app {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 56px;
      bottom: 0;
      left: 0;
      right: 0;
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
