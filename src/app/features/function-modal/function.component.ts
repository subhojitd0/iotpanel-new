import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {LOGIN_API, SENSOR_API, SWITCH_API} from '../../../shared/services/api.url-helper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_VIEW } from 'src/shared/constants/constant';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  hub: any;
  switch: any;
  selectedfunction: any;
  text1: any;
  text2: any;
  text11: any;
  text21: any;
  name: any;
  lowtext = "Low Value";
  hightext = "High Value";
  staticFunctions = [
    { functionid: "0", functionname: "No Function"},
    { functionid: "1", functionname: "Climate Control" },
    { functionid: "2", functionname: "Delay Timer" },
    { functionid: "3", functionname: "RTC" }
  ]
  lowtext2: string = "";
  hightex2: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FunctionComponent> ,private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    this.hub = data.hub;
    this.switch = data.switch;
    this.selectedfunction = data.function;
    if(data.function === "3") {
      let stringst = (parseInt(data.text1)/60).toString();
      let stringsthigh = (parseInt(data.text2)/60).toString();
      this.text1 = stringst.substr(0, stringst.indexOf('.'));
      this.text11 = parseInt(data.text1)%60;
      this.text2 = stringsthigh.substr(0, stringsthigh.indexOf('.'));
      this.text21 = parseInt(data.text2)%60;
      this.hightext = "Off Hour ( HR )";
      this.lowtext = "On Hour ( HR )";
      this.hightex2 = "Off Mins ( Min )";
      this.lowtext2 = "On Mins ( Min )";
    }
    else{
      this.text1 = data.text1;
      this.text2 = data.text2;
    }
   }
   step = 0;
   getSensorDetail(index: any){

   }
   

   ngOnInit() : void {
    localStorage.setItem("dirty", "1");
  }

  change(){
    if(this.selectedfunction === "1"){
      this.lowtext = "Hysterisis";
      this.hightext = "Set Point";
    }
    else if(this.selectedfunction === "2"){
      this.lowtext = "Off Time (in min)";
      this.hightext = "On Time (in min)";
    }
    else if(this.selectedfunction === "3"){
      this.hightext = "Off Hour ( HR )";
      this.lowtext = "On Hour ( HR )";
      this.hightex2 = "Off Mins ( Min )";
      this.lowtext2 = "On Mins ( Min )";
    }
    else{
      this.lowtext = "Low Value";
      this.hightext = "High Value";
      this.text1 = 0;
      this.text2 = 0;
      this.text11 = 0;
      this.text21 = 0;
    }
  }
  save(){
    if(parseInt(this.selectedfunction) > -1 && parseInt(this.text1) > -1 && parseInt(this.text2) > -1 ){
      if(this.selectedfunction === "3"){
        this.text1 = parseInt(this.text1) * 60 + this.text11;
        this.text2 = parseInt(this.text2) * 60 + this.text21;
      }
      var json = {
        switchid: this.switch,
        hub: this.hub,
        status: "1",
        mode: 2,
        func: this.selectedfunction,
        highval: this.text2,
        lowval: this.text1
      };
      this.apiService.post(SWITCH_API, json).then((res: any)=>{
        
        if(res.status === "Success"){
          this.toastr.success("Your function was successfully assigned");
          this.dialogRef.close('save');
        }
        else{
          this.toastr.error(res.status);
        }
      });
    }
    else{
      this.toastr.error("Please add all the fields before assigning the function");
    }
    
  }
}
