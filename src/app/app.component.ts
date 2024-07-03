import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NewsletterService } from './newsletter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subscriptionForm: FormGroup = this.fb.group({ // Initialize directly
    email: ['', [Validators.required, Validators.email]]
  });
  title = 'Keepintouch';
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  currentImage: string = '';

  constructor(
    private fb: FormBuilder,
    public newsletterService: NewsletterService
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.addDragFunctionality(this.scrollContainer.nativeElement);
  }
  

  addDragFunctionality(container: HTMLElement) {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      container.scrollLeft = scrollLeft - walk;
    });
  }

  addFormValidation() {
    const form = document.querySelector<HTMLFormElement>('form');
    const emailInput = document.querySelector<HTMLInputElement>('#emailInput');

    if (form && emailInput) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailValue = emailInput.value;
        if (this.validateEmail(emailValue)) {
          alert('Email is valid. Form submitted!');
          // Add form submission logic here
        } else {
          alert('Please enter a valid email address.');
        }
      });
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      const email = this.subscriptionForm.get('email')?.value;
      this.newsletterService.subscribe(email).subscribe(
        (response) => {
          console.log('Subscription successful', response);
          alert('Subscription successful!');
        },
        (error) => {
          console.error('Subscription failed', error);
          alert(error.error.message);
        }
      );
    } else {
      alert('Please enter a valid email address.');
    }
  }


  changeImage(item: string) {
    const images: any = {
      'Tomate': '../assets/Tabs/Tomate.svg',
      'VinRouge': '../assets/Tabs/Vin Rou.svg',
      'Epices': '../assets/Tabs/Epic.svg',
      'Pomme': '../assets/Tabs/Pomo.svg',
      'Fromage': '../assets/Tabs/From.svg',
      'Viande': '../assets/Tabs/Via.svg'
    };
    this.currentImage = images[item];
  }

}
