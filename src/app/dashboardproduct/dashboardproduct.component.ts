import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboardproduct',
  standalone: true,
  imports: [],
  templateUrl: './dashboardproduct.component.html',
  styleUrl: './dashboardproduct.component.css'
})
export class DashboardproductComponent {

  private url: string = 'https://karthik37.pythonanywhere.com/api/user/';
  
  ngOnInit(): void {
    let sendData = {
      "jwt" : String(sessionStorage["jwt"])
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
        if (data.ismerchant === true) {
          window.location.href = "/dashboardmerchant";
        }
      });
    }

}
