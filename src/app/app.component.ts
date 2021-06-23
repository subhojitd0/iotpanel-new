import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IOT Web';
  ngOnInit(): void {
    //localStorage.setItem('loggedin', "0");
  }
}
