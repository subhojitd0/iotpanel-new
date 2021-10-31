import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SideNavComponent } from './common/sidenav/sidenav.component';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import { DataViewComponent } from './features/data-view/data-view.component'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import { UserRightComponent } from './features/user-rights/user-right.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { UserComponent } from './features/create-user/user.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DataAddComponent } from './features/data-add/data-add.component';
import { UserViewComponent } from './features/user-view/user-view.component';
import { UserAddComponent } from './features/user-add/user-add.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FunctionComponent } from './features/function-modal/function.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { UpdateComponent } from './features/update-details/update.component';
import { DateRangeComponent } from './features/date-range/daterange.component';
import { ReportComponent } from './features/report/report.component';
import { SidenavService } from './common/sidenav/sidenav.service';
import { Dashboard1Component } from './features/dashoard-1/dashboard.component';
import { SwitchComponent } from './features/switch/dashboard.component';
import { GaugeChartModule } from 'angular-gauge-chart';
/* import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '54.251.21.255',
  port: 1883,
  path: ''
} */
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    SideNavComponent,
    HeaderComponent,
    DataViewComponent,
    UserComponent,
    UserRightComponent,
    DataAddComponent,
    UserViewComponent,
    UserAddComponent,
    FunctionComponent,
    UpdateComponent,
    DateRangeComponent,
    ReportComponent,
    Dashboard1Component,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    NgxChartsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatTableExporterModule,
    MatExpansionModule,
    GaugeChartModule,
    //MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    ToastrModule.forRoot() 
  ],
  providers: [SidenavService, MatDialog,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
