import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';   

@Injectable({providedIn: 'root'})
export class GlobalService {
 itemValue = new BehaviorSubject(this.theItem);
 itemValueSensor = new BehaviorSubject(this.itemSensor);
 set theItem(value) {
   this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
   localStorage.setItem('selectedhub', value);
 }

 get theItem() {
   return localStorage.getItem('selectedhub');
 }
 

 set itemSensor(value) {
   this.itemValueSensor.next(value); // this will make sure to tell every subscriber about the change.
   localStorage.setItem('selectedsensor', value);
 }

 get itemSensor() {
   return localStorage.getItem('selectedsensor');
 }
}