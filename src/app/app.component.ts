import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NewsletterService } from './newsletter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';

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
    private router: Router, private meta: Meta, private titleService: Title,
    public newsletterService: NewsletterService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.setMetaTags();
    // });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(event => {
      this.titleService.setTitle(event['title']);
      this.meta.updateTag({ name: 'description', content: event['description'] });
      this.meta.updateTag({ name: 'keywords', content: event['keywords'] });
    });
  }
  

  ngAfterViewInit() {
    this.addDragFunctionality(this.scrollContainer.nativeElement);
  }

  setMetaTags() {
    // Here you can set different meta tags based on the route
    const route = this.router.url;

    if (route === '/home') {
      this.titleService.setTitle('Home Page - My Application');
      this.meta.updateTag({ name: 'description', content: 'This is the home page of my application' });
      this.meta.updateTag({ name: 'keywords', content: 'home, angular, example' });
    } else if (route === '/about') {
      this.titleService.setTitle('About Us - My Application');
      this.meta.updateTag({ name: 'description', content: 'Learn more about us' });
      this.meta.updateTag({ name: 'keywords', content: 'about, angular, example' });
    } else {
      // Default meta tags
      this.titleService.setTitle('My Application');
      this.meta.updateTag({ name: 'description', content: 'Welcome to my application' });
      this.meta.updateTag({ name: 'keywords', content: 'angular, example, application' });
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

}
