import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./layout/dashboard/dashboard.component";
import {HomeComponent} from "./page/home/home.component";
import {UserComponent} from "./page/user/user.component";

const routes: Routes = [
  {
    path:'dashboard',
    component: HomeComponent
  },
  {
    path:'users',
    component: UserComponent
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
