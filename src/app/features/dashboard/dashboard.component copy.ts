import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTE_DASHBOARD, ROUTE_DATA_ADD, ROUTE_SWITCH } from 'src/shared/constants/constant';
import { GRAPH_API, SENSOR_READ_API, SWITCH_API, SENSOR_API } from 'src/shared/services/api.url-helper';
import { GlobalService } from 'src/shared/services/gloalservice';
import { ApiService } from 'src/shared/services/service';
import { DateRangeComponent } from '../date-range/daterange.component';
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
  selector: 'app-dashboard1',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})





export class Dashboard1Component implements OnInit {
  //Gauge
  public canvasWidth = 300
  public needleValue = 2
  public centralLabel = '200';
  public name = ''

  bottomLabel1 = 'CH-1';
  centralLabel1 = '';
  options1 = {
      hasNeedle: false,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['orange', 'lightgray'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  }

  bottomLabel2 = 'CH-2'
  centralLabel2 = '';
  options2 = {
      hasNeedle: false,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['black', 'lightgray'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  }

  

  bottomLabel3 = 'CH-3'
  centralLabel3 = '';
  options3 = {
      hasNeedle: false,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['green', 'lightgray'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  }


  bottomLabel4 = 'CH-4'
  centralLabel4 = '';
  options4 = {
      hasNeedle: false,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(44, 151, 222)', 'lightgray'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  }

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
  flag=0;
  c1:any;
  c2:any;
  c3:any;
  c4:any;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Hours';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  selectedfilter: any;
  selecteddata: any = "All";
  selectedsensor: any;
  multi: any[] = [];
  defaultSensor = {
    sensor: "Unavailable",
    da: "0.00",
    db: "0.00",
    dc: "0.00",
    dd: "0.00",
    type: "1",
    status: "NA"
  };
  staticFunctions = [
    { functionid: "0", functionname: "No Function"},
    { functionid: "1", functionname: "Climate Control" },
    { functionid: "2", functionname: "Delay Timer" },
    { functionid: "3", functionname: "RTC" }
  ]
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  temps: any;
  humidity: any;
  co2: any;
  allSensors: any[] = [];
  topSensors: any[] = [];
  bottomSensors: any[] = [];
  sensornames: any[];
  visible: any[] = [true, true, true, true, true, true, true];
  multi2: any[];
  selectedsensordata: any = {
    sensor: "Unavailable",
    da: "0.00",
    datext : "",
    dbtext : "",
    dctext : "",
    ddtext : "",
    daicon : "",
    dbicon : "",
    dcicon : "",
    ddicon : "",
    db: "0.00",
    dc: "0.00",
    dd: "0.00",
    type: "1",
    status: "NA"
  };
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



//-----------------------------------------------------CONSTRUCTOR-----------------------------------------------------------

  constructor(private toastr: ToastrService, private dialog: MatDialog, private router: Router, private apiService: ApiService,private globalSrv: GlobalService) { 
    //Object.assign(this, { multi });
    globalSrv.itemValue.subscribe((nextValue) => {
      this.selectedHub = nextValue;
      if(nextValue){
        this.calldata(); 
      }
    })

    globalSrv.itemValueSensor.subscribe((nextValue) => {
      this.selectedsensor = nextValue;
      if(nextValue){
        //this.calldata(); 
      }
    })
  }
//--------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------UNIT CHANGE DROPDOWN----------------------------------------------
onSelectUnit(ch:any,val:any){
  let selsensor = localStorage.getItem("selectedsensor");
  var unitdata ={
              "mode": 5,
              "sensor": selsensor,
              "channel":ch,
              "unit":val
            };
  this.apiService.post(SENSOR_API, unitdata).then((res: any)=>{ 
    this.flag = res.flag;
  });

}
//-------------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------SWITCH----------------------------------------------------------- 
  switch(){
    localStorage.setItem("switchurl","1");
    this.router.navigateByUrl('/' + ROUTE_SWITCH);
  }
//--------------------------------------------------------------------------------------------------------------------------  




//-----------------------------------------------------CHANGE VISIBLE-------------------------------------------------------  

  changevisible(index){
    this.visible[index] = !this.visible[index];
  }
//--------------------------------------------------------------------------------------------------------------------------  





//-----------------------------------------------------CHANGED--------------------------------------------------------------  
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
                if(!el.name)
                  el.name = "S"+(i+1);
                el.statusbool = el.status.toString() === "1" ? true: false;
                el.functionname = this.staticFunctions.filter(x=>x.functionid === el.func)[0].functionname;
                if(!el.statusbool)
                  el.functionname = this.staticFunctions.filter(x=>x.functionid === "0")[0].functionname;
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
        func: "0",
        highval: "0",
        lowval: "0"
      };
      this.apiService.post(SWITCH_API, json).then((res: any)=>{
        if(res.status === "Success"){
          this.toastr.info("The switch has been turned off");
        }
      });
    }
  }



//------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------CALL DATA FUNCTION--------------------------------------------------



  calldata(){
    let unitjson={
      "mode":6,
      "sensor": localStorage.getItem("selectedsensor")
    };
    this.apiService.post(SENSOR_API, unitjson).then((res: any)=>{
      this.c1=res.c1;
      this.c2=res.c2;
      this.c3=res.c3;
      this.c4=res.c4;
    });

    var json = 
    {
      "mode": 0,
      "hub": this.selectedHub
    };
    this.apiService.post(SWITCH_API, json).then((res: any)=>{
      //this.multi = []; 
      //this.selectedsensor = "";
      //this.selectedsensor = "";
      
      //----------------------------------------switch Data----------------------------------------
      this.switchData = res.result;
      let i=0;
      this.switchData.forEach((el: any)=>{
        if(!el.name)
          el.name = "S"+(i+1);
        el.statusbool = el.status.toString() === "1" ? true: false;
        el.functionname = this.staticFunctions.filter(x=>x.functionid === el.func)[0].functionname;
        if(!el.statusbool)
          el.functionname = this.staticFunctions.filter(x=>x.functionid === "0")[0].functionname;
        i=i+1;
      });


      //----------------------------------------Read Sensor Data------------------------------------
      let json2 = {
        hub: this.selectedHub 
      }
      this.apiService.post(SENSOR_READ_API, json2).then((res: any)=>{
          
          this.allSensors = res;
          //-----------------------------status of sensor------------------------------
          this.allSensors.forEach(x=>{
            x.status = Math.abs((new Date().getTime() - new Date(x.time*1000).getTime())/1000) > 10 ? "Offline" : "Online";
          })
          
          this.sensornames = this.allSensors.map(x=>x.sensor);
          let remct = 6 - res.length;
          for(let j=0; j<remct; j++){
            this.allSensors.push({
              sensor: "Unavailable",
              da: "0.00",
              db: "0.00",
              dc: "0.00",
              dd: "0.00",
              type: "1",
              status: "NA"
            });
          }
          let i = 0;

          this.allSensors.forEach(x=>{
            
            if(x.hasOwnProperty('error')){
              x.sensor= "No Data Available";
              x.da= "0.00";
              x.db= "0.00";
              x.dc= "0.00";
              x.dd= "0.00";
              x.type= "1";
            }
            
            x.sl = i+1;
            if(x.status === "NA")
              this.visible[x.sl] = false;
            i = i + 1;
          })
          this.topSensors = this.allSensors.slice(0,3);
          this.bottomSensors = this.allSensors.slice(3,6);
          
          this.selectedsensordata = this.allSensors.filter(x=>x.sensor === this.selectedsensor)[0];
          this.centralLabel1 = parseFloat(this.selectedsensordata.da).toFixed(1).toString() + "°C";
          this.centralLabel2 = Math.round(this.selectedsensordata.db).toString() + " %";
          this.centralLabel3 = Math.round(this.selectedsensordata.dc).toString() + " PPM";
          this.centralLabel4 = Math.round(this.selectedsensordata.dd).toString() + " PPM";
          this.options1.rangeLabel = ['0','50'];
          this.options2.rangeLabel = ['0','100'];
          this.options3.rangeLabel = ['0','2000'];
          this.options4.rangeLabel = ['0','2000'];
          this.options1.arcDelimiters = [(parseInt(Math.round(this.selectedsensordata.da).toString())/50)*100];
          this.options2.arcDelimiters = [(parseInt(Math.round(this.selectedsensordata.db).toString())/100)*100];
          this.options3.arcDelimiters = [(parseInt(Math.round(this.selectedsensordata.dc).toString())/2000)*100];
          this.options4.arcDelimiters = [(parseInt(Math.round(this.selectedsensordata.dc).toString())/2000)*100];
          /* this.selectedsensor = "S001";
          this.selectedfilter = "weekly"; */
        /* } */
          // let json3 = {
          //   sensor: this.selectedsensor ? this.selectedsensor : this.sensornames.length > 0 ? this.sensornames[0] : "",
          //   day: this.selectedfilter ? parseInt(this.selectedfilter) : 0
          // }
          // this.selectedsensor = this.selectedsensor ? this.selectedsensor : this.sensornames.length > 0 ? this.sensornames[0] : "";
          // this.selectedfilter = this.selectedfilter ? this.selectedfilter : "0";
          // this.apiService.post(GRAPH_API, json3).then((res: any)=>{
            
          //   this.temps = res.temp;
          //   this.humidity = res.humidity;
          //   this.co2 = res.co2;
          //   let multi2 = [];
          //   if(this.selecteddata === "All"){
          //     multi2.push({
          //       name: "Temparature",
          //       series: this.temps
          //     });
          //     multi2.push({
          //       name: "Humidity",
          //       series: this.humidity
          //     });
          //     multi2.push({
          //       name: "CO2 / 10",
          //       series: this.co2
          //     });
          //   }
          //   if(this.selecteddata === "Temparature"){
          //     multi2.push({
          //       name: "Temparature",
          //       series: this.temps
          //     });
          //   }
          //   if(this.selecteddata === "CO2"){
          //     multi2.push({
          //       name: "CO2 / 10",
          //       series: this.co2
          //     });
          //   }
          //   if(this.selecteddata === "Humidity"){
          //     multi2.push({
          //       name: "Humidity",
          //       series: this.humidity
          //     });
          //   }
          //   this.multi = multi2;
          // });
      }); 
    });
    
  }
 
 
 //----------------------------------------------------------------------------------------------------------------
 
 
 //--------------------------------------------------SAVE SWITCH NAME----------------------------------------------
 
  saveswitchname(data: any){
    
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

//------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------EXPORT DATA---------------------------------------------------
  export(se){
    localStorage.setItem("selectedsensor", se.sensor);
    localStorage.setItem("selectedsensortype", se.type);
    const dialogRef = this.dialog.open(DateRangeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }
//------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------- NG ONINIT------------------------------------------------------
  ngOnInit(): void {
    let timervariale = 5000;
    
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
//-------------------------------------------------------------------------------------------------------------------

}
