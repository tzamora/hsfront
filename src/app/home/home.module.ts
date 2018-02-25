import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeBodyComponent} from './home-body/home-body.component';
import {MaterialModule} from '../shared/material.module';
import { HsHomeToolbarComponent } from './hs-home-toolbar/hs-home-toolbar.component';
import { HsHomeMainContentComponent } from './hs-home-main-content/hs-home-main-content.component';
import { HsHomeSidenavComponent } from './hs-home-sidenav/hs-home-sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [HomeBodyComponent, HsHomeToolbarComponent, HsHomeMainContentComponent, HsHomeSidenavComponent]
})
export class HomeModule {
}
