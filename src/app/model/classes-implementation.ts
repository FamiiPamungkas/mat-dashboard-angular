import {MenuDTO, RoleDTO, SimpleOption, UserDTO} from "./interfaces";
import {notificationType} from "../layout/component/notification/notification.component";
import {formatIsoDate} from "../utility/utility";

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
  children: MenuDTO[] = [];
  active: boolean = false;
  createdAt: string = "";
  updatedAt: string = "";
}

export class Role implements RoleDTO {

  constructor(id?: number) {
    if (id) this.id = id;
  }

  id: number = 0;
  name: string = "";
  authority: string = "";
  description: string = "";
  active: boolean = false;
  createdAt: string = "";
  updatedAt: string = "";
  menus: MenuDTO[] = [];
}

export class User implements UserDTO {

  id: number = 0;
  firstname: string = "";
  lastname: string = "";
  birthdate: string = "";
  fmtBirthdate:string = "";
  email: string = "";
  username: string = "";
  password?: string = "";
  active: boolean = false;
  createdAt: string = "";
  updatedAt: string = "";
  roles: RoleDTO[] = [];
  treeMenus: MenuDTO[] = [];

}

export class AppNotification {

  constructor(
    type?: notificationType,
    title?: string,
    message?: string,
    icon?: string,
  ) {
    this.id = 'ntf_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    this.type = type ?? "info";
    this.title = title ?? "";
    this.message = message ?? "";
    this.icon = icon ?? "";
  }

  id: string = "";
  icon: string = "";
  type: notificationType = "primary";
  title: string = "";
  message: string = "";
}

export class SimplyOption implements SimpleOption {

  constructor(key?: string, value?: string, selected?: boolean) {
    this.key = key || "";
    this.value = value || "";
    this.selected = selected || false;
  }

  key: string;
  value: string;
  selected: boolean;
}
