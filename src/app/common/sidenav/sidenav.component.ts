import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataAddComponent } from 'src/app/features/data-add/data-add.component';
import { ROUTE_BASIC, ROUTE_DASHBOARD, ROUTE_NEW_USER, ROUTE_DATA_VIEW, ROUTE_USER_RIGHTS } from 'src/shared/constants/constant';
import { SENSOR_API } from 'src/shared/services/api.url-helper';
import { GlobalService } from 'src/shared/services/gloalservice';
import { ApiService } from 'src/shared/services/service';

class Sensor{
  sensor: string;
}
class Hub{
  id: number;
  hub: string;
  sensors: Sensor[] = [];
}
class Zone{
  id: number;
  zone: string;
  hubs: Hub[] = [];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  loggedin : any;
  pagerefresh : any;
  reportto: string;
  userrole: string;
  zones: any[] =[];
  hubs: any[] =[];
  sensors: any[] =[];
  loading: boolean;
  user: string;
  selectedzone: string;
  step = 0;

  isExpanded = true;
  showZoneMenu: boolean[] = [];
  showHubMenu: boolean[] = [];
  showSensormenu: boolean[] = [];
  isShowing = true;
  data: any[] = [];
  isAvailable: boolean = true;
  isAdmin: string;
  count: any;
  selectedhub: any;
  constructor(private globalSrv: GlobalService, private toastr: ToastrService, private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem("isAdmin");
    this.loggedin = JSON.parse(localStorage.getItem('loggedin'));
    this.pagerefresh = JSON.parse(localStorage.getItem('pagerefresh'));
    
    this.user = localStorage.getItem("loggedinusername");
    var json={
      "mode": 0,
      "username": this.user
    }
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      if(res.hub){
        this.count = res.hub.length;
      }
    var json = 
    {
      "mode": 4,
      "username": this.user
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      debugger;
      if(res.zone){
        this.isAvailable = false;
      }
      else{
        if(res[0].zone==="No data Available")
        {
          this.isAvailable = false;
        }
        else{
        this.isAvailable = true;
        
        let zonecounter = 0;
        let hubcounter = 0;
        this.data = res;
        let allZones = this.data.map(x=>x.zone);
        let distinctZones = [...new Set(allZones)];
        this.showZoneMenu = [res.length];
        this.showHubMenu = [res.length];
        distinctZones.forEach((z: any)=>{
          let zone = new Zone();
          zone.zone = z;
          zone.id = zonecounter+1;
          let allHubs = this.data.filter(x=>x.zone === z).map(y=>y.hub);
          let distinctHubs = [...new Set(allHubs)];
          distinctHubs.forEach((h: any)=>{
            let hub = new Hub();
            hub.hub = h;
            hub.id = hubcounter + 1;
            let allSensors = this.data.filter(x=>x.zone === z && x.hub === h).map(y=>y.sensor);
            let distinctSensors = [...new Set(allSensors)];
            distinctSensors.forEach(s=>{
              hub.sensors.push(s);
            });
            zone.hubs.push(hub);
            hubcounter = hubcounter + 1;
          });
          this.zones.push(zone);
          zonecounter = zonecounter + 1;
        });
        this.zones.forEach((val: any)=>{
          this.showZoneMenu[val.id] = false;
          val.hubs.forEach(element => {
            this.showHubMenu[element.id] = false;
          });
        })
      }
      }
      
    });
  });
  }
  selecthub(hub: any){
    this.selectedhub = hub;
    this.globalSrv.theItem = hub;
    localStorage.setItem("selectedhub", hub);
    
  }
  unassign(){
    this.toastr.info("Please wait while we are unassigning the hub");
    var json = {
      zone: "",
      hub: this.selectedhub,
      sensor: "",
      username: this.user,
      mode: 2,
      choice: 1
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{
      if(res.status === "Success"){
        this.toastr.success("Your hub was successfully unassigned");
        location.reload();
      }
      else{
        this.toastr.error(res.status);
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DataAddComponent, {
      data: {
        user: "NA",
        hub: "NA",
        sensor: "NA",
        type: 5
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }
  openzone(name: any){
    this.showZoneMenu[name] = !this.showZoneMenu[name];
  }
  openhub(name: any){
    this.showHubMenu[name] = !this.showHubMenu[name];
  }
   getSensorDetail(index: any){

   }
  getHubs(index: any) {
    this.loading = true;
    
  }

  getSensors(index: any) {
    this.loading = true;
    
  }

 

  close(){
    this.isExpanded = !this.isExpanded;
    this.isShowing = !this.isShowing;
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl('/' + ROUTE_BASIC);
  }
}
