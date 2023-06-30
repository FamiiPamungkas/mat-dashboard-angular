import {Component} from '@angular/core';
import {RequestService} from "../../../service/request.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;

  usernameField = new FormControl('', [Validators.required]);
  passwordField = new FormControl('', [Validators.required]);

  constructor(
    private reqService: RequestService
  ) {
  }

  login() {
    const loginData = {
      username: this.usernameField.value,
      password: this.passwordField.value,
    }

    this.reqService.post('/api/v1/auth/authenticate', loginData).subscribe(res => {
      if (res.status != 200) {
        const errors = res.errors;
        if (errors.username != null) {
          console.log("set Error - ",errors.username)
          this.usernameField.setErrors({userNotFound:'errors.username'})
        }
        if (errors.password != null) {
          console.log("set Error - ",errors.password)
          this.passwordField.setErrors({'serverError': errors.password})}

        console.log(this.usernameField.hasError("userNotFound"));
        return;
      }
      console.log(res);
    }, error => {
      console.log("ERROR =", error);
    });

  }

}
