import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;

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
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value ?? "";
      const password = this.loginForm.get('password')?.value ?? "";

      this.authService.login(username, password).subscribe(
        res => {
          if (res.status != null && res.status != 200) {
            this.loginForm.get('username')?.setErrors({'invalidCredentials': res.message})
            return;
          }
          this.router.navigateByUrl("/").then(r => false);
        }
      )
      console.log(username, password);
    }
  }

}
