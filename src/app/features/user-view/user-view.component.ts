import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ApiService} from '../../../shared/services/service';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD } from 'src/shared/constants/constant';
import { SENSOR_API } from 'src/shared/services/api.url-helper';
import { User } from '../create-user/user.component';
import { DataAddComponent } from '../data-add/data-add.component';
import { UserAddComponent } from '../user-add/user-add.component';

export interface UserTable {
  username: string;
  hub: string;
  sensor1: string;
  sensor2: string;
  sensor3: string;
  sensor4: string;
  sensor5: string;
  sensor6: string;
}

export class UserTable {
  username: string;
  hub: string;
  sensor1: string;
  sensor2: string;
  sensor3: string;
  sensor4: string;
  sensor5: string;
  sensor6: string;
}

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  allData: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['username', 'hub', 'sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6'];
  dataSource: MatTableDataSource<UserTable>;
  pagerefrsh2: any;
  pagerefrsh: any;
  constructor(private router: Router,private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {
    
   }
   ngOnInit() : void {
    this.pagerefrsh = JSON.parse(localStorage.getItem('pagerefresh'));
    this.pagerefrsh2 = JSON.parse(localStorage.getItem('pagerefresh2'));
     if(this.pagerefrsh2 == "0"){
        localStorage.setItem('pagerefresh2', "1");
        location.reload();
      }
    var json = 
    {
      "mode": 4,
      "username": "IOT-ALL-USER"
    };
    this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
      
      this.allData = res;
      this.setupdata();
    });
   }
   setupdata(){
    let userData: UserTable[] = []; 
    let uniqueUsers = [...new Set(this.allData.map(x=>x.username))];
    if(uniqueUsers.length > 1 || ( uniqueUsers.length === 1 && uniqueUsers[0])){
      uniqueUsers.forEach((user: any)=>{
        
          let distinctHubs = [...new Set(this.allData.filter(x=>x.username === user).map(y=>y.hub))];
          if(distinctHubs.length > 0){
              distinctHubs.forEach((hub: any)=>{
                  let eachUserData: UserTable = new UserTable();
                  eachUserData.username = user;
                  eachUserData.hub = hub;
                  let sensorRows = [...new Set(this.allData.filter(x=>x.username === user && x.hub === hub).map(y=>y.sensor))];
                  let count = 0;
                  sensorRows.forEach(sensor =>{
                      if(count === 0){
                          eachUserData.sensor1 = sensor;
                      }
                      if(count === 1){
                          eachUserData.sensor2 = sensor;
                      }
                      if(count === 2){
                          eachUserData.sensor3 = sensor;
                      }
                      if(count === 3){
                          eachUserData.sensor4 = sensor;
                      }
                      if(count === 4){
                          eachUserData.sensor5 = sensor;
                      }
                      if(count === 5){
                          eachUserData.sensor6 = sensor;
                      }
                      count = count + 1;
                  });
                  userData.push(eachUserData);
              });
          }
          else{
              let eachUserData: UserTable;
              eachUserData.username = user;
              userData.push(eachUserData);
          }
      });
    }
    
    if(userData.length > 0){
      this.dataSource = new MatTableDataSource(userData);
    }
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  adduser(){
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: "800px",
      height: "250px"
    });
  }
  addhub(){
    const dialogRef = this.dialog.open(DataAddComponent, {
      data: {
        user: "NA",
        hub: "NA",
        sensor: "NA",
        type: 0
      }
    });
  }
  adduserhub(row: any){
    const dialogRef = this.dialog.open(DataAddComponent, {
      data: {
        user: row.username,
        hub: "NA",
        sensor: "NA",
        type: 1
      }
    });
  }
  addusersensor(row: any){
    const dialogRef = this.dialog.open(DataAddComponent, {
      data: {
        user: row.username,
        hub: row.hub,
        sensor: "NA",
        type: 2
      }
    });
  }
  editusersensor(row: any, sensor: any){
    const dialogRef = this.dialog.open(DataAddComponent, {
      data: {
        user: row.username,
        hub: row.hub,
        sensor: sensor,
        type: 3
      }
    });
  }
  deleteusersensor(row: any, sensor: any){
    var r = confirm("Are you sure that you want to delete this sensor ?");
    if (r == true) {
      
      var json = 
      {
        "mode":2,
        "choice": 3,
        "hub": row.hub,
        "sensor": sensor,
        "username": row.username
      }
      this.apiService.post(SENSOR_API, json).then((res: any)=>{ 
        if(res.status === "Success"){
          this.toastr.success("Your data was successfully deleted",'Success');
          location.reload();
        }
      }); 
    }
  }
  /* openEditSensorDialog(id: any) {
    const dialogRef = this.dialog.open(GenerateOTComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  } */
  /* openAddHubDialog(id: any) {
    localStorage.setItem('selecteddriverid', id);
    const dialogRef = this.dialog.open(AddDriverComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  } */
  /* deleteDriver(id: any){
    var r = confirm("Are you sure that you want to delete this record ?");
    if (r == true) {
      
      var json = 
      {
        "mode":3,
        "drivercode": id
      }
      this.apiService.post(DRIVER_API, json).then((res: any)=>{ 
        this.toastr.success("Your data was successfully saved",'Success');
        location.reload();
      });
    }
  } */
}
