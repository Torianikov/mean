import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'; //для работы со всплыющтит окнами
import { AuthService } from '../auth.service'; // подключения сервиса для регестрации пользователей
import { Router }  from '@angular/router'//для переадресации

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  // dataUser(){
  //   return localStorage.setItem('name', this.authService.user.name)

  // }
  // name = this.authService.user.name;
  // localStoage.setItem('name', name);
  // email = this.authService.user.email;
  // login = this.authService.user.login;
  // localStorage.setItem('token', token);

  logoutUser(){
    this.authService.logout(); //выход с учетной записи
    this.flashMessage.show('Вы вышли с учетной записи', {
      cssClass: 'alert-warning',
      timeout: 4000,
    });
    this.router.navigate(['/auth']);
    return false;
  }
}
