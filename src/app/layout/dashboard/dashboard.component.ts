import {Component, OnInit} from '@angular/core';
import {JsonService} from "../../service/json.service";
import {BaseEntity} from "../../model/model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private jsonService:JsonService) {
  }
  //
  ngOnInit(): void {
    this.jsonService.getData('/assets/json/menus.json').subscribe(
      res=>{
        for (const re of res) {

        console.log(re);
        }
      }, error => {
        console.log("Error ",error)
      }
    );
  }
}
