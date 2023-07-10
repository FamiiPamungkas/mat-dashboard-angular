import {Menu, MenuDTO} from "./interfaces";

export class MenuClass implements MenuDTO {
  authority: string = "";
  children: Menu[] = [];
  description: string = "";
  group: string = "";
  icon: string = "";
  id: number = 0;
  link: string = "";
  name: string = "";
  seq: number = 0;
  showOnNav: boolean = true;
  authorities:string[] = [];

}
