import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_ADD } from 'src/shared/constants/constant';
import { SWITCH_API } from 'src/shared/services/api.url-helper';
import { GlobalService } from 'src/shared/services/gloalservice';
import { ApiService } from 'src/shared/services/service';
import { FunctionComponent } from '../function-modal/function.component';

export interface iSwitch{
  switchid: string;
  func: string;
  highval: string;
  lowval: string;
  hub: string;
  status: boolean;
  name: string;
}
export class Switch implements iSwitch{
  switchid: string;
  func: string;
  highval: string;
  lowval: string;
  hub: string;
  status: boolean = false;
  name: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pagerefrsh: any;
  switchData: Switch[] = [];
  isAdmin: string;
  color = 'blue';
  selectedHub: string = "";
  checked = false;
  /* staticData = [
    { switchame: "S1",status : false, switchid: "1", functionid: "1", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S2",status : false, switchid: "2", functionid: "2", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S3",status : false, switchid: "3", functionid: "3", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S4",status : false, switchid: "4", functionid: "4", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S5",status : false, switchid: "5", functionid: "2", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S6",status : false, switchid: "6", functionid: "3", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S7",status : false, switchid: "7", functionid: "1", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S8",status : false, switchid: "8", functionid: "4", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S9",status : false, switchid: "7", functionid: "1", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S10",status : false, switchid: "8", functionid: "4", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S11",status : false, switchid: "7", functionid: "1", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub },
    { switchame: "S12",status : false, switchid: "8", functionid: "4", text1: "Text 1", text2: "Text 2", hubid: this.selectedHub }
  ] */
  
  constructor(private dialog: MatDialog, private router: Router, private apiService: ApiService,private globalSrv: GlobalService) { 
    globalSrv.itemValue.subscribe((nextValue) => {
      this.selectedHub = nextValue;
      var json = 
      {
        "mode": 0,
        "hub": nextValue
      };
      this.apiService.post(SWITCH_API, json).then((res: any)=>{ 
        this.switchData = res.result;
      });
      let i=0;
      this.switchData.forEach((el: any)=>{
        el.name = "S"+(i+1);
        i=i+1;
      })
       //alert(nextValue);  // this will happen on every change
       //API call to refresh page with selected hub data

    })
  }
  changed(row: any){
    if(row.status){
      const dialogRef = this.dialog.open(FunctionComponent, {
        data: {
          hub: this.selectedHub,
          switch: row.switchid,
          text1: row.text1,
          text2: row.text2,
          function: row.functionid
        }
      });

      dialogRef.afterClosed().subscribe(result =>{
        switch(result){
          case 'closed': {
            let dirty = localStorage.getItem("dirty");
            if(dirty === "1"){
              row.status = false;
              localStorage.setItem("dirty", "0");
            }
            break;
          }
          case 'save': {
            localStorage.setItem("dirty", "0");
            break;
          }
          default: {
            let dirty = localStorage.getItem("dirty");
            if(dirty === "1"){
              row.status = false;
              localStorage.setItem("dirty", "0");
            }
            break;
          }
        }
      })
    }
    else{
      //alert("Turned Off");
    }
  }
  
  ngOnInit(): void {
    this.pagerefrsh = JSON.parse(localStorage.getItem('pagerefresh'));
    this.isAdmin = localStorage.getItem("isAdmin");
    if(this.isAdmin == "1"){
      if(this.pagerefrsh == "0"){
        localStorage.setItem('pagerefresh', "1");
        this.router.navigateByUrl('/' + ROUTE_DATA_ADD);
      }
    }
    else{
      var json = 
      {
        "mode": 0
      };
      localStorage.setItem('selectedduty', "0");
      if(this.pagerefrsh == "0"){
        localStorage.setItem('pagerefresh', "1");
        location.reload();
      }
    }
    
  }

}
