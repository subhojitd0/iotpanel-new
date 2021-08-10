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
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  approve: string;
  delete: string;

  zones: any[] =[];
  hubs: any[] =[];
  sensors: any[] =[];

  loading: boolean;
  user: string;
  
  HubControl: FormControl;
  ZoneControl: FormControl;
  SensorControl: FormControl;
  UserControl: FormControl;

  filteredOptionsZone: Observable<string[]>;
  filteredOptionsHub: Observable<string[]>;
  filteredOptionsSensor: Observable<string[]>;
  filteredOptionsUser: Observable<string[]>;

  adzone: any;
  adhub: any;
  adsensor: any;
  aduser: any;

  onlyzones: any[] = [];
  onlyhubs: any[] = [];
  onlySensors: any[] = [];
  onlyusers: any[] = [];

  firstFormGroup: FormGroup;

  showUser: boolean = false;
  showHub: boolean = false;
  showZone: boolean = false;
  showSensor: boolean = false;

  disabledUser: boolean = false;
  disabledHub: boolean = false;
  disabledZone: boolean = false;
  disabledSensor: boolean = false;
  oldsensor: any;
  pagerefrsh: any;
  pagerefrsh2: any;
  username: any;
  phone: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }
   

   ngOnInit() {
     this.phone = localStorage.getItem("loggedinphone");
     this.username = localStorage.getItem("loggedinusername");
    debugger;
    this.firstFormGroup = this._formBuilder.group({
      UserControl: []
     });
  }

  save(){
      var json = {
        username: this.username,
        phone: this.phone,
        mode: "2"
      };
      this.apiService.post(LOGIN_API, json).then((res: any)=>{
        if(res.status === "Success"){
          this.toastr.success("Your data was successfully added");
          localStorage.setItem("loggedinphone", this.phone);
          location.reload();
        }
        else{
          this.toastr.error(res.status);
        }
      });
    
    
  }
}
