import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TripsComponent } from './trips/trips.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransportComponent } from './transport/transport.component';
import { ChoiceComponent } from './choice/choice.component';
import { ResetComponent } from './reset/reset.component';
import { RidesComponent } from './rides/rides.component';
import { ChangeComponent } from './change/change.component';

const routes: Routes = [
  
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'choice',
    component:ChoiceComponent,
  },
  {
    path:'trips',
    component:TripsComponent,
  },
  {
    path:'rides',
    component:RidesComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'settings',
    component:SettingsComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'reset',
    component:ResetComponent,
  },
  {
    path:'contact',
    component:ContactComponent,
  },
  {
    path:'transport',
    component:TransportComponent,
  },
  {
    path:'change',
    component:ChangeComponent,
  },
  {
    path:'**',
    component:PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
