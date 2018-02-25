import {NgModule} from '@angular/core';
import {MatButtonModule, MatSidenavModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule {
}
