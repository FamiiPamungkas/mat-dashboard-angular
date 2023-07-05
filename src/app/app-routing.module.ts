import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {UserComponent} from "./page/user/user.component";
import {MenuComponent} from "./page/menu/menu.component";
import {RoleComponent} from "./page/role/role.component";
import {LoginComponent} from "./page/auth/login/login.component";
import {authGuard} from "./guard/auth.guard";
import {mainGuard} from "./guard/main.guard";
import {ProductComponent} from "./page/product/product.component";
import {ProductConsigComponent} from "./page/product-consig/product-consig.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate:[mainGuard]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate:[mainGuard]
  },
  {
    path: 'menus',
    component: MenuComponent,
    canActivate:[mainGuard]
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate:[mainGuard]
  },
  {
    path: 'products-normal',
    component: ProductComponent,
    canActivate:[mainGuard]
  },
  {
    path: 'products-consignment',
    component: ProductConsigComponent,
    canActivate:[mainGuard]
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
