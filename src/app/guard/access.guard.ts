import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const accessGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.authUser;

  if (!user) {
    return router.navigateByUrl("/dashboard").then(() => false);

  } else {
    let haveAccess: boolean = false;

    // remove path variable / param
    let cleanPath = [...route.url];
    for (let paramsKey in route.params) {
      const index = cleanPath.findIndex((s) => s.path == route.params[paramsKey]);
      if (index > 0) {
        cleanPath.splice(index, 1);
      }
    }
    const realPath: string = `/${cleanPath.join("/")}`;

    for (let role of user.roles) {
      const exists = role.menus.find(menu => realPath === menu.link) != undefined;
      if (exists) haveAccess = true;
    }

    if (haveAccess) return true;
    return router.navigateByUrl("/dashboard").then(() => false);
  }

}
