import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { LandingComponent } from './landing/landing.component';
import { LandingnewComponent } from './landingnew/landingnew.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardproductComponent } from './dashboardproduct/dashboardproduct.component';
import { DashboardmerchantComponent } from './dashboardmerchant/dashboardmerchant.component';
import { ProfileComponent } from './profile/profile.component';
import { ListviewComponent } from './listview/listview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'landing',
    component: HomeComponent
  },
  {
    path: 'landingnew',
    component: LandingnewComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'home',
    component: LandingComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboardproduct',
    component: DashboardproductComponent
  },
  {
    path: 'dashboardmerchant',
    component: DashboardmerchantComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'list',
    component: ListviewComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
