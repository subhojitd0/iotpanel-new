import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {SENSOR_API} from '../../../shared/services/api.url-helper';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DATA_VIEW } from 'src/shared/constants/constant';

export interface PartyHead {
  name: string;
  headcode: number;
  ratetype: string;
  option: string;
  master: string;
  isApproved: string;
}

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

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
  selectedzone: string;
  constructor(private router: Router,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }
  getHubs(index: any) {
    this.loading = true;
    var json = 
    {
      "mode": 5,
      "username": this.user,
      "zone": index
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      this.selectedzone = index;
      this.hubs = res;
      this.loading = false;
      
    });
  }

  getSensors(index: any) {
    this.loading = true;
    var json = 
    {
      "mode": 6,
      "username": this.user,
      "hub": index,
      "zone": this.selectedzone
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      this.sensors = res;
      this.loading = false;
      
    });
  }

   ngOnInit() : void {
     this.user = localStorage.getItem("loggedinusername");
    var json = 
    {
      "mode": 4,
      "username": this.user
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      this.zones = res;
      
    });
   }
  
}
