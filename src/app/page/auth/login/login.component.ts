import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

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
    this.loading = true;
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value ?? "";
      const password = this.loginForm.get('password')?.value ?? "";

      this.authService.login(username, password).subscribe(
        res => {
          this.loading = false;
          if (res.status != null && res.status != 200) {
            this.loginError = res.message;
            return;
          }
          let url = this.authService.latestNav ?? "/";
          this.router.navigateByUrl(url).then(() => false);
        }
      )
    } else {
      this.loading = false;
    }
  }

  clearError() {
    this.loginError = "";
  }
}
