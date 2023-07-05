import {Menu} from "./interfaces";

export class MenuClass implements Menu {
  active: boolean = true;
  authority: string = "";
  children: Menu[] = [];
  createAt: Date = new Date();
  description: string = "";
  group: string = "";
  icon: string = "";
  id: number = 0;
  link: string = "";
  name: string = "";
  parent: Menu | null = null;
  seq: number = 0;
  showOnNav: boolean = true;
  updatedAt: Date = new Date();
  authorities:string[] = [];

}
