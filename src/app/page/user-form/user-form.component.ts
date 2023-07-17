import {AfterViewInit, Component} from '@angular/core';
import {BasePage} from "../base-page";
import {NavigationService} from "../../service/navigation.service";
import {RequestService} from "../../service/request.service";
import {SimpleOption} from "../../model/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../utility/constant";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BasePage implements AfterViewInit {
  static AUTHORITY: string = "user-list";
  static PAGE_TITLE: string = "Add User";

  roleOptions: SimpleOption[] = [];
  submitted: boolean = false;

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    roles: new FormControl('', [Validators.required])
  }, {validators: passwordMatchValidator})


  constructor(
    navService: NavigationService,
    private reqService: RequestService
  ) {
    super(
      navService,
      UserFormComponent.AUTHORITY,
      UserFormComponent.PAGE_TITLE
    );
  }


  ngAfterViewInit() {
    this.reqService.get("/v1/roles/options").subscribe(
      res => {
        this.roleOptions = res
        console.log("Response = ", this.roleOptions);
      }
    )
  }

  submit() {
    console.log("IS VALID " + this.userForm.valid)
    if (this.userForm.valid) {

    }
  }

}
