import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MenuItemComponent} from './layout/component/menu-item/menu-item.component';
import {SubMenuComponent} from './layout/component/sub-menu/sub-menu.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HomeComponent} from './page/home/home.component';
import {MenuComponent} from './page/menu/menu.component';
import {RoleComponent} from './page/role/role.component';
import {LoginComponent} from './page/auth/login/login.component';
import {LogoComponent} from './layout/component/logo/logo.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductComponent} from './page/product/product.component';
import {ProductConsigComponent} from './page/product-consig/product-consig.component';
import {AlertComponent} from './layout/component/alert/alert.component';
import {RequestInterceptor} from "./utility/request.interceptor";
import {NavLinkComponent} from './layout/component/nav-link/nav-link.component';
import {BreadcrumbsComponent} from './layout/component/breadcrumbs/breadcrumbs.component';
import {PageTitleComponent} from './layout/component/page-title/page-title.component';
import {MatTableModule} from "@angular/material/table";
import {UserFormComponent} from './page/user-form/user-form.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormFieldComponent} from './layout/component/form/form-field/form-field.component';
import {AppInputDirective} from './directive/app-input.directive';
import {
    NotificationContainerComponent
} from './layout/component/notification-container/notification-container.component';
import {NotificationComponent} from './layout/component/notification/notification.component';
import {AlertDialogComponent} from './layout/component/alert-dialog/alert-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NotFoundComponent} from './page/not-found/not-found.component';
import {UserListComponent} from './page/user/user-list/user-list.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        MenuItemComponent,
        SubMenuComponent,
        HomeComponent,
        MenuComponent,
        RoleComponent,
        LoginComponent,
        LogoComponent,
        ProductComponent,
        ProductConsigComponent,
        AlertComponent,
        NavLinkComponent,
        BreadcrumbsComponent,
        PageTitleComponent,
        UserFormComponent,
        FormFieldComponent,
        AppInputDirective,
        NotificationContainerComponent,
        NotificationComponent,
        AlertDialogComponent,
        NotFoundComponent,
        UserListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        HttpClientModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatDialogModule,
        FontAwesomeModule,
        NgOptimizedImage
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
