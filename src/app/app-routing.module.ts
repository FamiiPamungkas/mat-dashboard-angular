import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {UserComponent} from "./page/user/user.component";
import {MenuComponent} from "./page/menu/menu.component";
import {RoleComponent} from "./page/role/role.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'menus',
    component: MenuComponent
  },
  {
    path: 'roles',
    component: RoleComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
