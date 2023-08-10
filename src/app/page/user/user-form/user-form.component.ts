import {Component, OnInit} from '@angular/core';
import {BasePage} from "../../base-page";
import {NavigationService} from "../../../service/navigation.service";
import {method, RequestService} from "../../../service/request.service";
import {BaseResponse, SimpleOption, UserDTO} from "../../../model/interfaces";
import {passwordMatchValidator, ROLE_OPTIONS_ENDPOINT, USERS_ENDPOINT} from "../../../utility/constant";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Role, SimplyOption, User} from "../../../model/classes-implementation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertDialogService} from "../../../service/alert-dialog.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Breadcrumb} from "../../../layout/component/breadcrumbs/breadcrumbs.component";
import {isValidNumber} from "../../../utility/utility";

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

  paramId: string = "0";
  roleOptions: SimplyOption[] = [];
  selectedRoles: string[] = [];
  isEdit: boolean = false;

  user: User = new User();

  submitted: boolean = false;
  userForm = new FormGroup({
    firstname: new FormControl(this.user.firstname, [Validators.required]),
    lastname: new FormControl(this.user.lastname),
    birthdate: new FormControl(this.user.birthdate, [Validators.required]),
    email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    username: new FormControl(this.user.username, [Validators.required]),
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
      if (params['id']) {
        this.title = "Edit User";
        this.paramId = params['id'];
        this.isEdit = true;
        this.breadcrumbs.push(new Breadcrumb("Edit User"));

        this.userForm.get('password')?.removeValidators([Validators.required])
        this.userForm.get('confirmPassword')?.removeValidators([Validators.required])
        return;
      }
      this.breadcrumbs.push(new Breadcrumb("Add User"))
    });

    this.reqService.get(ROLE_OPTIONS_ENDPOINT).subscribe((res: SimpleOption[]) => {
      for (let opt of res) {
        this.roleOptions.push(new SimplyOption(opt.key, opt.value, false));
      }

      if (this.isEdit) {
        this.fetchUserData(this.paramId);
      }
    });

  }

  fetchUserData(id: string) {
    if (!isValidNumber(id)) {
      const dialog: MatDialogRef<any> = this.alertService.showError("Invalid User ID", `The provided user ID [${id}] is not valid.`);
      dialog.afterClosed().subscribe(() => {
        this.router.navigateByUrl("/users").finally();
      });
      return;
    }

    let self = this;
    this.reqService.get(USERS_ENDPOINT + "/" + id)
      .subscribe({
        next(res: UserDTO) {
          console.log("RESPONSE ", res);
          self.user = res;
          self.userForm.get('firstname')?.setValue(self.user.firstname);
          self.userForm.get('lastname')?.setValue(self.user.lastname);
          self.userForm.get('birthdate')?.setValue(self.user.birthdate);
          self.userForm.get('email')?.setValue(self.user.email);
          self.userForm.get('username')?.setValue(self.user.username);

          self.selectedRoles = self.user.roles.map(role => role.id.toString());
          for (let option of self.roleOptions) {
            option.selected = self.selectedRoles.includes(option.key);
          }

          self.userForm.get('roles')?.setValue(self.selectedRoles);
        },
        error(error) {
          const res: BaseResponse = error.error;
          const dialog: MatDialogRef<any> = self.alertService.showError("User not found", res.message);
          dialog.afterClosed().subscribe(() => {
            return self.router.navigateByUrl("/users");
          })
        }
      })
  }

  get isRoleInvalid(): boolean {
    return this.submitted && (!this.userForm.get('roles')?.valid ?? true);
  }

  submit() {
    this.submitted = true;

    if (this.userForm.valid) {
      const user: User = this.user;
      user.firstname = this.userForm.get('firstname')?.value ?? "";
      user.lastname = this.userForm.get('lastname')?.value ?? "";
      user.birthdate = this.userForm.get('birthdate')?.value ?? "";
      user.email = this.userForm.get('email')?.value ?? "";
      user.username = this.userForm.get('username')?.value ?? "";
      user.password = this.userForm.get('password')?.value ?? "";

      const roles: string[] = this.userForm.get('roles')?.value ?? [];
      user.roles = [];
      for (let role of roles) {
        user.roles.push(new Role(parseInt(role)))
      }

      let method: method = "post";
      if (this.isEdit) method = "put";

      let self = this;
      this.reqService.post(USERS_ENDPOINT, user, {method}).subscribe({
        next() {
          let title = self.isEdit ? "User updated successfully" : "User added successfully";
          let message = self.isEdit ? "User has been updated successfully.<br>You will be redirected to user list page." : "User has been added successfully.<br>You will be redirected to user list page.";
          const successDialog: MatDialogRef<any> = self.alertService.showSuccess(title, message);
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
