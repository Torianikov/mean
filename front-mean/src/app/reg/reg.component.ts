import { Component, OnInit } from '@angular/core';
import { CheckFormService } from '../check-form.service'; // подключения сервиса для проверки на коректность
import { FlashMessagesService } from 'angular2-flash-messages'; //для работы со всплыющтит окнами
import { AuthService } from '../auth.service'; // подключения сервиса для регестрации пользователей
import { Router }  from '@angular/router'//для переадресации

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  name: String;
  login: String;
  email: String;
  password: String;

  constructor(private checkForm: CheckFormService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  userRegisterClick(){
    let user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };
    if(!this.checkForm.checkName(user.name)){
      this.flashMessage.show('Имя пользовтеля не введено', {
      cssClass: 'alert-danger',
      timeout: 4000,
    });

      return false; // чтобЫ не было перезагрузки страницы
    } else if(!this.checkForm.checkLogin(user.login)){
      this.flashMessage.show('Логин не введено', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false; // чтобЫ не было перезагрузки страницы
    } else if(!this.checkForm.checkEmail(user.email)){
      this.flashMessage.show('Email не введено', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false; // чтобЫ не было перезагрузки страницы
    } else if(!this.checkForm.checkPassword(user.password)){
      this.flashMessage.show('Пароль не введено', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
      return false; // чтобЫ не было перезагрузки страницы
    }

    this.authService.registerUser(user).subscribe(data => {//передаем обьек для регестарации
      if(!data.success){//если не получилось
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
        this.router.navigate(['/reg']);//переадресация
      }else{
        this.flashMessage.show(data.msg, {
        cssClass: 'alert-success',
        timeout: 2000,
      });
      this.router.navigate(['/auth']);// переадресация

      }
    });
}
}
