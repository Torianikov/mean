import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import{ RouterModule, Routes } from '@angular/router'; // для отслеживания ссылок
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms'; //для работы с формами

import { CheckFormService } from './check-form.service'; // подключения сервиса для проверки на коректность

import { FlashMessagesModule } from 'angular2-flash-messages'; //для работы со всплыющтит окнами

import { AuthService } from './auth.service'; // подключения сервиса для регестрации пользователей

import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";

import { IsLoggedIn } from './isLogged.guard';
import { MathComponent } from './math/math.component';
import { NavComponent } from './nav/nav.component';
import { UkrComponent } from './ukr/ukr.component';
import { EngComponent } from './eng/eng.component';

let appRoute: Routes = [
  {path: '', component: HomeComponent},
  {path: 'reg', component: RegComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn]},
  {path: 'math', component: MathComponent},
  {path: 'ukr', component: UkrComponent},
  {path: 'eng', component: EngComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    DashboardComponent,
    HomeComponent,
    FooterComponent,
    MathComponent,
    NavComponent,
    UkrComponent,
    EngComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  providers: [
    CheckFormService,
    AuthService,
    IsLoggedIn
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
