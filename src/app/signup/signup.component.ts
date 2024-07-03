import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private url: string = 'http://127.0.0.1:8000/api/register/';
  private ddata: any = {}

  nameVal($event: any) {
    const nameVal = $event.target.value;
    this.ddata["name"] = nameVal
  }

  emailVal($event: any) {
    const emailVal = $event.target.value;
    this.ddata["email"] = emailVal
  }
  
  passVal($event: any) {
    const passVal = $event.target.value;
    this.ddata["password1"] = passVal
  }

  conpassVal($event: any) {
    const conpassVal = $event.target.value;
    if (this.ddata["password1"] === conpassVal) {
      this.ddata["password2"] = conpassVal
    }
  }
  
  signup(): void {
    console.log(this.ddata);

    let sendData = {
      "email" : this.ddata.email,
      "password" : this.ddata.password1,
      "name" : this.ddata.name,
      "ismerchant" : this.ddata.ismerchant
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
        window.location.href = "/signin";
      });
    }

  step(sectionId: string, toSectionId: string, opt: boolean) {
    if (opt === true) {
      this.ddata["ismerchant"] = true;
      document.getElementById(sectionId)?.classList.add('hidden');
      document.getElementById(toSectionId)?.classList.remove('hidden');
    } else {
      this.ddata["ismerchant"] = false;
      document.getElementById(sectionId)?.classList.add('hidden');
      document.getElementById(toSectionId)?.classList.remove('hidden');
    }
  }

  stepper(sectionId: string, toSectionId: string) {
    document.getElementById(sectionId)?.classList.add('hidden');
    document.getElementById(toSectionId)?.classList.remove('hidden');
  }

}
