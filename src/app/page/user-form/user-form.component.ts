import {Component, OnInit} from '@angular/core';
import {BasePage} from "../base-page";
import {NavigationService} from "../../service/navigation.service";
import {RequestService} from "../../service/request.service";
import {BaseResponse, SimpleOption} from "../../model/interfaces";
import {passwordMatchValidator, ROLE_OPTIONS_ENDPOINT, USERS_ENDPOINT} from "../../utility/constant";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Role, User} from "../../model/classes-implementation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertDialogService} from "../../service/alert-dialog.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Breadcrumb} from "../../layout/component/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BasePage implements OnInit {
  static AUTHORITY: string = "user-list";
  static PAGE_TITLE: string = "Add User";

  breadcrumbs: Breadcrumb[] = [
    new Breadcrumb("Home", "/dashboard"),
    new Breadcrumb("Users", "/users"),
  ];

  roleOptions: SimpleOption[] = [];
  selectedRoles: string[] = [];

  pageError: string = "";

  submitted: boolean = false;

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    birthdate: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    roles: new FormControl(this.selectedRoles, [Validators.required])
  }, {validators: passwordMatchValidator})


  constructor(
    navService: NavigationService,
    private reqService: RequestService,
    private alertService: AlertDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super(
      navService,
      UserFormComponent.AUTHORITY,
      UserFormComponent.PAGE_TITLE
    );
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log("PARAMS = ", params['id'])
      if (params['id']) {
        this.title = "Edit User";
        this.breadcrumbs.push(new Breadcrumb("Edit User"));
        this.fetchUserData(params['id']);
        return;
      }

      this.breadcrumbs.push(new Breadcrumb("Add User"))
    });

    this.reqService.get(ROLE_OPTIONS_ENDPOINT).subscribe(res => {
      this.roleOptions = res
    });

  }

  fetchUserData(id: string) {
    if (isNaN(parseInt(id))) {
      this.pageError = `id [${id}] tidak valid`
      return;
    }

    // this.reqService.get(USERS_ENDPOINT)
    // console.log("ID ", id, typeof id)

  }

  get isRoleInvalid(): boolean {
    return this.submitted && (!this.userForm.get('roles')?.valid ?? true);
  }

  submit() {
    this.submitted = true;

    if (this.userForm.valid) {
      const user: User = new User();
      user.firstname = this.userForm.get('firstname')?.value ?? "";
      user.lastname = this.userForm.get('lastname')?.value ?? "";
      user.birthdate = this.userForm.get('birthdate')?.value ?? "";
      user.email = this.userForm.get('email')?.value ?? "";
      user.username = this.userForm.get('username')?.value ?? "";
      user.password = this.userForm.get('password')?.value ?? "";

      const roles: string[] = this.userForm.get('roles')?.value ?? [];
      for (let role of roles) {
        user.roles.push(new Role(parseInt(role)))
      }

      let self = this;
      this.reqService.post(USERS_ENDPOINT, user).subscribe({
        next() {
          const successDialog: MatDialogRef<any> = self.alertService.showSuccess("User Added Successfully", "User has been added successfully.<br>You will be redirected to user list page...");
          successDialog.afterClosed().subscribe(() => {
            self.router.navigateByUrl("/users").finally();
          });
        },
        error(err) {
          let res: BaseResponse = err.error;
          self.alertService.showError("User Addition Failed", res.message);
        }
      });
    }
  }

  checkRole(event: MatCheckboxChange) {
    const value: string = event.source.value;
    if (event.checked) {
      if (!this.selectedRoles.includes(value)) {

        this.selectedRoles.push(value);
        this.userForm.get('roles')?.setValue(this.selectedRoles);
      }
    } else {
      const index = this.selectedRoles.indexOf(value);
      if (index != -1) {
        this.selectedRoles.splice(index, 1);
      }
    }

    this.userForm.get('roles')?.setValue(this.selectedRoles);
  }
}
