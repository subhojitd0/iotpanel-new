import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {LOGIN_API, SENSOR_API} from '../../../shared/services/api.url-helper';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_VIEW } from 'src/shared/constants/constant';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  user: any;
  password: any;
  name: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }
   

   ngOnInit() : void {
    
  }

 
  save(){
    if(this.user && this.password && this.name){
      var json = {
        name: this.name,
        username: this.user,
        password: this.password,
        mode: 1
      };
      this.apiService.post(LOGIN_API, json).then((res: any)=>{
        if(res.status === "Success"){
          this.toastr.success("Your user was successfully created");
          location.reload();
        }
        else{
          this.toastr.error(res.status);
        }
      });
    }
    else{
      this.toastr.error("Please add all the fields before adding the user");
    }
    
  }
}
