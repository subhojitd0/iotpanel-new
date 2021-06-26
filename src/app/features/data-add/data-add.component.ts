import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {SENSOR_API} from '../../../shared/services/api.url-helper';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_VIEW } from 'src/shared/constants/constant';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface PartyHead {
  name: string;
  headcode: number;
  ratetype: string;
  option: string;
  master: string;
  isApproved: string;
}

@Component({
  selector: 'app-data-add',
  templateUrl: './data-add.component.html',
  styleUrls: ['./data-add.component.css']
})
export class DataAddComponent implements OnInit {

  isPack:boolean=true;
  isSlab:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['headcode', 'name', 'ratetype', 'option'];
  dataSource: MatTableDataSource<PartyHead>;
  userRole: string;
  partyrole: string;
  approve: string;
  delete: string;
  zones: any[] =[];
  hubs: any[] =[];
  sensors: any[] =[];
  loading: boolean;
  user: string;
  onlyzones: any[] = [];
  HubControl: FormControl;
  ZoneControl: FormControl;
  SensorControl: FormControl;
  filteredOptionsZone: Observable<string[]>;
  filteredOptionsHub: Observable<string[]>;
  filteredOptionsSensor: Observable<string[]>;
  adzone: any;
  adhub: any;
  adsensor: any;
  onlyhubs: any[] = [];
  firstFormGroup: FormGroup;
  constructor(private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }
   searchhub() {
    this.onlyhubs = [...new Set(this.zones.filter(z=>z.zone === this.adzone).map(z=>z.hub))];
    this.filteredOptionsHub = this.firstFormGroup.get('HubControl').valueChanges.pipe(startWith(''),map(value => this._filterHub(value)));
  }

   ngOnInit() : void {

     this.user = localStorage.getItem("loggedinusername");
     this.ZoneControl = new FormControl();
     this.HubControl = new FormControl();
     this.SensorControl = new FormControl();
     this.firstFormGroup = this._formBuilder.group({
      ZoneControl: [],
      HubControl: [],
      SensorControl: []
     });
    
    var json = 
    {
      "mode": 4,
      "username": this.user
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      this.zones = res;
      this.onlyzones = [...new Set(this.zones.map(z=>z.zone))];
      this.filteredOptionsZone = this.firstFormGroup.get('ZoneControl').valueChanges.pipe(startWith(''),map(value => this._filterZone(value)));
    });
   }
   public _filterZone(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.onlyzones.filter(client => client.toLowerCase().includes(filterValue));
  }
  public _filterHub(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.onlyhubs.filter(client => client.toLowerCase().includes(filterValue));
  }
  save(){
    if(this.adzone && this.adhub && this.adsensor){
      var json = {
        zone: this.adzone,
        hub: this.adhub,
        sensor: this.adsensor,
        username: this.user,
        mode: 1
      };
      this.apiService.post(SENSOR_API, json).then((res: any)=>{
        if(res.status === "Success"){
          this.toastr.success("Your data was successfully added");
          location.reload();
        }
        else{
          this.toastr.error(res.status);
        }
      });
    }
    else{
      this.toastr.error("Please add all the fields before adding the sensor data");
    }
    
  }
}
