import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
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
import {RoleListComponent} from "./page/role/role-list/role-list.component";
import {RoleDetailComponent} from "./page/role/role-detail/role-detail.component";
import {RoleFormComponent} from "./page/role/role-form/role-form.component";
import {MenuListComponent} from "./page/menu/menu-list/menu-list.component";
import {MenuDetailComponent} from "./page/menu/menu-detail/menu-detail.component";
import {MenuFormComponent} from "./page/menu/menu-form/menu-form.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
    path: 'roles',
    component: RoleListComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'roles/detail/:id',
    component: RoleDetailComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'roles/add',
    component: RoleFormComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'roles/edit/:id',
    component: RoleFormComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'menus',
    component: MenuListComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'menus/detail/:id',
    component: MenuDetailComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'menus/add',
    component: MenuFormComponent,
    canActivate: [mainGuard, accessGuard]
  },
  {
    path: 'menus/edit/:id',
    component: MenuFormComponent,
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
    canActivate: [mainGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
