import {AfterViewInit, Component} from '@angular/core';
import {BasePage} from "../base-page";
import {NavigationService} from "../../service/navigation.service";
import {RequestService} from "../../service/request.service";
import {SimpleOption} from "../../model/interfaces";
import {passwordMatchValidator, ROLE_OPTIONS_ENDPOINT, USERS_ENDPOINT} from "../../utility/constant";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Role, User} from "../../model/classes-implementation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent, AlertDialogData} from "../../layout/component/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BasePage implements AfterViewInit {
  static AUTHORITY: string = "user-list";
  static PAGE_TITLE: string = "Add User";

  roleOptions: SimpleOption[] = [];
  selectedRoles: string[] = [];

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
    private dialog: MatDialog
  ) {
    super(
      navService,
      UserFormComponent.AUTHORITY,
      UserFormComponent.PAGE_TITLE
    );
  }


  ngAfterViewInit() {
    this.reqService.get(ROLE_OPTIONS_ENDPOINT).subscribe(
      res => {
        this.roleOptions = res
        console.log("Response = ", this.roleOptions);
      }
    )
  }

  get isRoleInvalid(): boolean {
    return this.submitted && (!this.userForm.get('roles')?.valid ?? true);
  }

  submit() {
    this.submitted = true;
    console.log("IS VALID " + this.userForm.valid)
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
      this.reqService.post(USERS_ENDPOINT, user).subscribe(res => {
        console.log("RESULT = ", res);
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

  openModal() {
    const data: AlertDialogData = {
      type: "success",
      useConfirmBtn: true,
      useCancelBtn: true,
      title: "Normal Modal",
      message: "Lorem ipsum dolor sit amet, consectetur."
    };

    const dialogRef = this.dialog.open(
      AlertDialogComponent, {
        width: '300px', data
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log("CLOSED ", result);
    })
  }
}
