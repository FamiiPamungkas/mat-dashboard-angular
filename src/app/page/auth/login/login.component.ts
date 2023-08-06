import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {BaseResponse} from "../../../model/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  loading: boolean = false;
  loginError: string = "";

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  login() {
    let self = this;
    this.loading = true;
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value ?? "";
      const password = this.loginForm.get('password')?.value ?? "";

      this.authService.login(username, password).subscribe({
        next() {
          let url = self.authService.latestNav || "/";
          self.router.navigateByUrl(url).then(() => false);
        },
        error(error) {
          let response: BaseResponse = error.error;
          self.loading = false;
          self.loginError = response.message
        },
        complete() {
          self.loading = false;
        }
      })
    } else {
      this.loading = false;
    }
  }

  clearError() {
    this.loginError = "";
  }
}
