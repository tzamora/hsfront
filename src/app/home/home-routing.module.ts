import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeBodyComponent} from './home-body/home-body.component';

const routes: Routes = [
  {path:'home-body', component: HomeBodyComponent},
  {path:'**', redirectTo: 'home-body'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
