import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from '../newsletter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected to styleUrls from styleUrl
})
export class HomeComponent implements OnInit {
  subscriptionForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  title = 'Keepintouch';
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  currentImage: string = '';

  constructor(
    private fb: FormBuilder,
    public newsletterService: NewsletterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.addDragFunctionality(this.scrollContainer.nativeElement);
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  changePage() {
    this.router.navigate(['blog'])
  }

}
