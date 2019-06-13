import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventcatcherDirective } from './eventcatcher.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TripsComponent } from './trips/trips.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransportComponent } from './transport/transport.component';
import { ChoiceComponent } from './choice/choice.component';
import { ResetComponent } from './reset/reset.component';
import { RidesComponent } from './rides/rides.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
    EventcatcherDirective,
    SidebarComponent,
    TripsComponent,
    RegisterComponent,
    SettingsComponent,
    LoginComponent,
    ContactComponent,
    PageNotFoundComponent,
    TransportComponent,
    ChoiceComponent,
    ResetComponent,
    RidesComponent,
    ChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
