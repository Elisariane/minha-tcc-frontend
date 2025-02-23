import { Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingpageComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
