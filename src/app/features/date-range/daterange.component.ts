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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router, private _formBuilder: FormBuilder,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }
   

   ngOnInit() : void {
    this.pagerefrsh = JSON.parse(localStorage.getItem('pagerefresh'));
    this.pagerefrsh2 = JSON.parse(localStorage.getItem('pagerefresh2'));
     if(this.pagerefrsh2 == "0"){
        localStorage.setItem('pagerefresh2', "1");
        location.reload();
      }
    this.firstFormGroup = this._formBuilder.group({
      HubControl: [],
      SensorControl: [],
      UserControl: [],
      ZoneCOntrol: []
     });
    debugger;
    console.log(this.data);
    if(this.data){
      //if(this.data.type){
        switch(this.data.type){
          case 0: this.setupaddhub();
          break;

          case 1: this.setupadduserhub();
          break;

          case 2: this.setupaddsensor();
          break;

          case 3: this.setupeditsensor();
          break;

          case 5: this.setupzoneuser();
          break;
        }
      //}
    }
  }

  setupaddhub(){
    debugger;
    this.showUser = true;
    this.showHub = true;
    this.showZone = false;
    this.showSensor = true;
    this.disabledUser = false;
    this.disabledHub = false;
    this.disabledZone = false;
    this.disabledSensor = false;
    this.HubControl = new FormControl();
    this.UserControl = new FormControl();
    this.SensorControl = new FormControl();
    this.firstFormGroup = this._formBuilder.group({
      HubControl: [],
      SensorControl: [],
      UserControl: []
     });
     var json = 
    {
      "mode": 0,
    };
    this.apiService.post(LOGIN_API, json).then((res: any)=>{ 
      //this.zones = res;
      this.onlyusers = [...new Set(res.map(z=>z.username))];
      this.filteredOptionsUser = this.firstFormGroup.get('UserControl').valueChanges.pipe(startWith(''),map(value => this._filterUser(value)));
    });
  }
  searchhub() {
    this.onlyhubs = [...new Set(this.zones.filter(z=>z.zone === this.adzone).map(z=>z.hub))];
    this.filteredOptionsHub = this.firstFormGroup.get('HubControl').valueChanges.pipe(startWith(''),map(value => this._filterHub(value)));
  }
  
  setupadduserhub(){
    this.showUser = true;
    this.showHub = true;
    this.showZone = false;
    this.showSensor = true;
    this.disabledUser = false;
    this.disabledHub = false;
    this.disabledZone = false;
    this.disabledSensor = false;
    this.HubControl = new FormControl();
    this.UserControl = new FormControl();
    this.SensorControl = new FormControl();
    
     var json = 
    {
      "mode": 4,
      "username": this.user
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      this.zones = res;
      this.aduser = this.data.user;
      /* this.onlyhubs = [...new Set(this.zones.map(z=>z.hub))];
      this.filteredOptionsHub = this.firstFormGroup.get('HubControl').valueChanges.pipe(startWith(''),map(value => this._filterHub(value))); */
    });
  }

  setupaddsensor(){
    this.showUser = true;
    this.showHub = true;
    this.showZone = false;
    this.showSensor = true;
    this.disabledUser = true;
    this.disabledHub = true;
    this.disabledZone = false;
    this.disabledSensor = false;
    this.HubControl = new FormControl();
    this.UserControl = new FormControl();
    this.SensorControl = new FormControl();
    this.aduser = this.data.user;
      this.adhub = this.data.hub;
    this.firstFormGroup = this._formBuilder.group({
      HubControl: [{ value: this.adhub, disabled: this.disabledHub }],
      SensorControl: [],
      UserControl: [{ value: this.aduser, disabled: this.disabledUser }]
     });
  }

  setupeditsensor(){
    this.showUser = true;
    this.showHub = true;
    this.showZone = false;
    this.showSensor = true;
    this.disabledUser = true;
    this.disabledHub = true;
    this.disabledZone = false;
    this.disabledSensor = false;
    this.HubControl = new FormControl();
    this.UserControl = new FormControl();
    this.SensorControl = new FormControl();
    this.aduser = this.data.user;
    this.adhub = this.data.hub;
    this.adsensor = this.data.sensor;
    this.oldsensor = this.data.sensor;
    this.firstFormGroup = this._formBuilder.group({
      HubControl: [{ value: this.adhub, disabled: this.disabledHub }],
      SensorControl: [{ value: this.adsensor }],
      UserControl: [{ value: this.aduser, disabled: this.disabledUser }]
     });
      
  }
    
  setupzoneuser(){
    this.user = localStorage.getItem("loggedinusername");
    this.showUser = false;
    this.showHub = true;
    this.showZone = true;
    this.showSensor = false;
    this.disabledUser = true;
    this.disabledHub = false;
    this.disabledZone = false;
    this.disabledSensor = false;
    this.ZoneControl = new FormControl();
    this.HubControl = new FormControl();
    this.SensorControl = new FormControl();
    this.firstFormGroup = this._formBuilder.group({
      HubControl: [],
      SensorControl: [],
      ZoneControl: []
     });
     var json = 
    {
      "mode": 0,
      "username": this.user
    };
    this.aduser = this.user;
    this.apiService.post(SENSOR_API, json).then((res: any)=>{
      debugger;
      this.zones = res.zone;
      let hub = res.hub;
      this.onlyhubs = [...new Set(hub.map(z=>z.hub))];
      this.filteredOptionsHub = this.firstFormGroup.get('HubControl').valueChanges.pipe(startWith(''),map(value => this._filterHub(value)));
      this.onlyzones = [...new Set(this.zones.map(z=>z.zone))];
      this.filteredOptionsZone = this.firstFormGroup.get('ZoneControl').valueChanges.pipe(startWith(''),map(value => this._filterZone(value)));
    });
  }
  selectsensor(){
    /* if(this.data.type === 5){
      this.adsensor = this.zones.filter(x=>x.username === this.user && x.hub === this.adhub)[0].sensor;
    }
    else{

    } */
  }
  public _filterZone(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.onlyzones.filter(client => client.toLowerCase().includes(filterValue));
  }
  public _filterHub(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.onlyhubs.filter(client => client.toLowerCase().includes(filterValue));
  }
  public _filterSensor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.onlySensors.filter(client => client.toLowerCase().includes(filterValue));
  }
  public _filterUser(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.onlyusers.filter(client => client.toLowerCase().includes(filterValue));
  }
  
  isValid(){
    if(this.data){
      //if(this.data.type){
        switch(this.data.type){
          case 0: if(this.adhub && this.adsensor) return true; else return false;
          case 1: if(this.aduser && this.adhub && this.adsensor) return true; else return false;
          case 2: if(this.aduser && this.adhub && this.adsensor) return true; else return false;
          case 3: if(this.aduser && this.adhub && this.adsensor) return true; else return false;
          case 5: if(this.adhub && this.adzone) return true; else return false;
        }
      //}
    }
  }
  save(){
    if(this.isValid()){
      let mode = 0;
      let choice = 0;
      if(this.data.type === 0 || this.data.type === 1 || this.data.type === 2){
        mode = 1;
      }
      else if(this.data.type === 3){
        mode = 2;
        choice = 2;
      }
      else{
        mode = 2;
        choice = 1;
      }
      var json = {
        zone: this.adzone,
        hub: this.adhub,
        sensor: this.adsensor,
        username: this.aduser,
        mode: mode,
        oldsensor: mode === 2 ? this.oldsensor: "",
        choice: choice
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
