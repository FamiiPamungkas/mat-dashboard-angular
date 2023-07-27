import {Menu as MenuInt, MenuDTO, RoleDTO, UserDTO} from "./interfaces";
import {notificationType} from "../layout/component/notification/notification.component";

export class Menu implements MenuDTO {
  id: number = 0;
  authority: string = "";
  name: string = "";
  description: string = "";
  group: string = "";
  icon: string = "";
  link: string = "";
  showOnNav: boolean = true;
  seq: number = 0;
  authorities: string[] = [];
  children: MenuInt[] = [];
}

export class Role implements RoleDTO {

  constructor(id?: number) {
    if (id) this.id = id;
  }

  id: number = 0;
  name: string = "";
  authority: string = "";
  description: string = "";
  menus: MenuDTO[] = [];
}

export class User implements UserDTO {

  id: number = 0;
  firstname: string = "";
  lastname: string = "";
  birthdate: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  roles: RoleDTO[] = [];

}

export class AppNotification {

  constructor(
    type: notificationType,
    title?: string,
    message?: string,
    icon?:string,
  ) {
    this.type = type;
    this.title = title ?? "";
    this.message = message ?? "";
    this.icon = icon ?? "";
  }

  icon: string = "";
  type: notificationType = "primary";
  title: string = "";
  message: string = "";
}
