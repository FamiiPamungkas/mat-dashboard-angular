import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {MenuComponent} from "./page/menu/menu.component";
import {RoleComponent} from "./page/role/role.component";
import {LoginComponent} from "./page/auth/login/login.component";
import {authGuard} from "./guard/auth.guard";
import {mainGuard} from "./guard/main.guard";
import {ProductComponent} from "./page/product/product.component";
import {ProductConsigComponent} from "./page/product-consig/product-consig.component";
import {UserFormComponent} from "./page/user/user-form/user-form.component";
import {accessGuard} from "./guard/access.guard";
import {NotFoundComponent} from "./page/not-found/not-found.component";
import {UserListComponent} from "./page/user/user-list/user-list.component";
import {UserDetailComponent} from "./page/user/user-detail/user-detail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [mainGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'users/add',
    component: UserFormComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'users/detail/:id',
    component: UserDetailComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'menus',
    component: MenuComponent,
    canActivate: [mainGuard,  accessGuard]
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'products-normal',
    component: ProductComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'products-consignment',
    component: ProductConsigComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate:[mainGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
