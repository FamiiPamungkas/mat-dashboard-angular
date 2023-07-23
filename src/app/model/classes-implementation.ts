import {Menu as MenuInt, MenuDTO, RoleDTO, UserDTO} from "./interfaces";

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
