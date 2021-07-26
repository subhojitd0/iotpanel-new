import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTE_DASHBOARD, ROUTE_DATA_ADD } from 'src/shared/constants/constant';
import { GRAPH_API, SENSOR_READ_API, SWITCH_API } from 'src/shared/services/api.url-helper';
import { GlobalService } from 'src/shared/services/gloalservice';
import { ApiService } from 'src/shared/services/service';
import { FunctionComponent } from '../function-modal/function.component';

export interface iSwitch{
  switchid: string;
  func: string;
  highval: string;
  lowval: string;
  hub: string;
  status: string;
  statusbool: boolean;
  name: string;
}
export class Switch implements iSwitch{
  switchid: string;
  func: string;
  highval: string;
  lowval: string;
  hub: string;
  status: string;
  name: string;
  statusbool: boolean = false;
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
  sensors1: any[]=[];
  sensors2:  any[]=[];
  sensors3:  any[]=[];
  sensors4:  any[]=[];
  sensors5:  any[]=[];
  sensors6:  any[]=[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Day';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  selectedfilter: any;
  selectedsensor: any;
  multi: any[] = [];
  
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  temps: any;
  humidity: any;
  co2: any;

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  constructor(private toastr: ToastrService, private dialog: MatDialog, private router: Router, private apiService: ApiService,private globalSrv: GlobalService) { 
    //Object.assign(this, { multi });
    globalSrv.itemValue.subscribe((nextValue) => {
      this.selectedHub = nextValue;
      if(nextValue){
        this.calldata(); 
      }
      
       //alert(nextValue);  // this will happen on every change
       //API call to refresh page with selected hub data

    })
  }
  changed(row: any){
    if(row.statusbool){
      const dialogRef = this.dialog.open(FunctionComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          hub: this.selectedHub,
          switch: row.switchid,
          text1: row.lowval,
          text2: row.highval,
          function: row.func
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
            var json = 
            {
              "mode": 0,
              "hub": this.selectedHub
            };
            this.apiService.post(SWITCH_API, json).then((res: any)=>{ 
              this.switchData = res.result;
              let i=0;
              this.switchData.forEach((el: any)=>{
                el.name = "S"+(i+1);
                el.statusbool = el.status.toString() === "1" ? true: false;
                i=i+1;
              });
            });
            break;
          }
          default: {
            let dirty = localStorage.getItem("dirty");
            if(dirty === "1"){
              row.statusbool = false;
              localStorage.setItem("dirty", "0");
            }
            break;
          }
        }
      })
    }
    else{
      var json = {
        switchid: row.switchid,
        hub: this.selectedHub,
        status: "0",
        mode: 2,
        func: row.func,
        highval: row.highval,
        lowval: row.lowval
      };
      this.apiService.post(SWITCH_API, json).then((res: any)=>{
        if(res.status === "Success"){
          this.toastr.info("The switch has been turned off");
        }
      });
    }
  }
  calldata(){
    var json = 
    {
      "mode": 0,
      "hub": this.selectedHub
    };
    this.apiService.post(SWITCH_API, json).then((res: any)=>{ 
      this.switchData = res.result;
      let i=0;
      this.switchData.forEach((el: any)=>{
        if(!el.name)
          el.name = "S"+(i+1);
        el.statusbool = el.status.toString() === "1" ? true: false;
        i=i+1;
      });
      let json2 = {
        hub: this.selectedHub 
      }
      this.apiService.post(SENSOR_READ_API, json2).then((res: any)=>{
        /* if(res[0].hasOwnProperty("error")){
  
        }
        else{ */
          this.sensors1 = res;
          this.sensors2 = res;
          this.sensors3 = res;
          this.sensors4 = res;
          this.sensors5 = res;
          this.sensors6 = res;
          this.selectedsensor = "S001";
          this.selectedfilter = "weekly";
        /* } */
          let json3 = {
            sensor: this.selectedsensor,
          }
          this.apiService.post(GRAPH_API, json3).then((res: any)=>{
            this.temps = res.temp;
            this.humidity = res.humidity;
            this.co2 = res.co2;
            this.multi = [];
            this.multi.push({
              name: "Temparature",
              series: this.temps
            });
            this.multi.push({
              name: "Humidity",
              series: this.humidity
            });
            this.multi.push({
              name: "CO2",
              series: this.co2
            });
          });
      }); 
    });
    
  }
  saveswitchname(data: any){
    debugger;
    //alert("New name is : "  + data.name);
    var json = {
      switchid: data.switchid,
      hub: this.selectedHub,
      name: data.name,
      mode: "3"
    }
    this.apiService.post(SWITCH_API, json).then((res: any)=>{
      if(res.status === "Success"){
        this.toastr.info("The switch has been renamed");
      }
    });
  }
  ngOnInit(): void {
    let timervariale = 15000;
    
    setInterval(() => {
      this.calldata(); 
    }, timervariale);
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
