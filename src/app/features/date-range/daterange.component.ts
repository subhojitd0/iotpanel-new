import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {LOGIN_API, REPORT_API, SENSOR_API} from '../../../shared/services/api.url-helper';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_VIEW, ROUTE_REPORT } from 'src/shared/constants/constant';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.css']
})
export class DateRangeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  approve: string;
  delete: string;

  zones: any[] =[];
  hubs: any[] =[];
  sensors: any[] =[];

  loading: boolean;
  user: string;
  sensor: string;
  from: any;
  to: any;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }
   

   ngOnInit() : void {
     this.sensor = localStorage.getItem("selectedsensor");
    }

  save(){
      var json = {
        sensor: this.sensor,
        from: this.from,
        to: this.to,
      };
      this.apiService.post(REPORT_API, json).then((res: any)=>{
        debugger;
          this.toastr.success("Your data was successfully added");
          localStorage.setItem("reportdata", JSON.stringify(res));
          this.router.navigate(['/' + ROUTE_REPORT]);
      });
  }
}
