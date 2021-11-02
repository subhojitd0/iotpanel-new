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
  name: any;
  staticFunctions = [
    { functionid: "0", functionname: "No Function"},
    { functionid: "1", functionname: "Function 1" },
    { functionid: "2", functionname: "Function 2" },
    { functionid: "3", functionname: "Function 3" },
    { functionid: "4", functionname: "Function 4" }
  ]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FunctionComponent> ,private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    this.hub = data.hub;
    this.switch = data.switch;
    this.selectedfunction = data.function;
    this.text1 = data.text1;
    this.text2 = data.text2;
   }
   step = 0;
   getSensorDetail(index: any){

   }
   

   ngOnInit() : void {
    localStorage.setItem("dirty", "1");
  }

 
  save(){
    if(this.selectedfunction && this.text1 && this.text2){
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
        debugger;
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
