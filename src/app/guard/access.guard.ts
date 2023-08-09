import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const accessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.authUser;

  console.log("ROUTE ",route)
  console.log("STATE ",state)
  if (!user) {
    return router.navigateByUrl("/dashboard").then(() => false);

  } else {
    let haveAccess: boolean = false;
    for (let role of user.roles) {
      const exists = role.menus.find(menu => state.url.includes(menu.link)) != undefined;
      if (exists) haveAccess = true;
    }

    console.log("HAVE ACCESS = ",haveAccess)
    if (haveAccess) return true;
    return router.navigateByUrl("/dashboard").then(() => false);
  }

}
