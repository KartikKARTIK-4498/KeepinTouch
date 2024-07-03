import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  private url: string = 'https://karthik37.pythonanywhere.com/api/login/';
  private ddata: any = {}

  emailVal($event: any) {
    const emailVal = $event.target.value;
    this.ddata["email"] = emailVal
  }
  
  passVal($event: any) {
    const passVal = $event.target.value;
    this.ddata["password"] = passVal
  }
  
  login(): void {
    let sendData = {
      "email" : this.ddata.email,
      "password" : this.ddata.password
    }
    fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData)
    })
    .then(response => response.json())
    .then(data => {
      // do something with data
        console.log(data);
        sessionStorage.setItem("jwt", data["jwt"]);
        window.location.href = "/dashboardproduct";
      });
    }
  }
