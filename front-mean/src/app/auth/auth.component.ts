import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'; //для работы со всплыющтит окнами
import { AuthService } from '../auth.service'; // подключения сервиса для регестрации пользователей
import { Router }  from '@angular/router'//для переадресации

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String

  constructor( private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  userLoginClick(){
    let user = {
      login: this.login,
      password: this.password
    };
    if(user.password == undefined){// если зарагестрированный юсер не ввел парол
      this.flashMessage.show('Введите пароль', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false;
    }

    this.authService.authUser(user).subscribe(data =>{// проверка на успешную авторизацию
      if(!data.success){ // если не успешно
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
    } else{
      this.flashMessage.show("Вы успешно авторизовались", { // если успешно
        cssClass: 'alert-success',
        timeout: 4000,
        });
        this.router.navigate(['/dashboard'])//переадресация
        this.authService.storeUser(data.token, data.user); // передаем в функцию все данные о юзере и токен с фацда account.js
      }
    });
  }

}
