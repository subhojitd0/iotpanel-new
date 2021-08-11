import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {SENSOR_API} from '../../../shared/services/api.url-helper';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_DATA_VIEW } from 'src/shared/constants/constant';
import * as XLSX from 'xlsx';
export interface PartyHead {
  name: string;
  headcode: number;
  ratetype: string;
  option: string;
  master: string;
  isApproved: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
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
  reportdata: any;
  sensor: string;
  sensortype: string;
  datext: string="test";
  dbtext: string="test";
  dctext: string="test";
  constructor(private router: Router,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   step = 0;
   getSensorDetail(index: any){

   }

   ngOnInit() : void {
     debugger;
     this.sensor = localStorage.getItem("selectedsensor");
     this.sensortype = localStorage.getItem("selectedsensortype");
    this.reportdata = JSON.parse(localStorage.getItem("reportdata"));
    if(this.sensortype === "1"){
      this.datext = "Temparature";
      this.dbtext = "Humidity";
      this.dctext = "CO2";
    }
    this.reportdata.forEach(element => {
      element.time = new Date(element.time*1000).toLocaleString().replace(',','');
    });
   }
   back(){
    this.router.navigate(['/' + ROUTE_DASHBOARD]);
   }
   export(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OT_Data');
    
    
    XLSX.writeFile(wb, 'Report_' + this.sensor + '.xlsx');
    this.toastr.success("Excel generation successful");
   }
}
