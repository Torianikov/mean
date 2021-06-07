import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt' //если пользователь авторизован тру если не фолс

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user:any;

  constructor(private http: Http) { }

  registerUser(user){// функция регестрации
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')// какой тип данных будет отправляться
    return this.http.post(//отправляем данные
      'account/reg',// куда передаем
      user, // что передаем
      {headers: headers}).pipe(map((res: any) => res.json()));// map отвечает за то что у нас будет json формат передаваться
  }

  authUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')// какой тип данных будет отправляться
    return this.http.post(//отправляем данные
      'account/auth',// куда передаем
      user, // что передаем
      {headers: headers}).pipe(map((res: any) => res.json()));// map отвечает за то что у нас будет json формат передаваться

  }

  storeUser(token, user){
    localStorage.setItem('token', token);// обращаемся к локальному хранилищу и устанавливаем параметры
    localStorage.setItem('user', JSON.stringify(user)); // обращаемся к локальному хранилищу и устанавливаем параметры параметр должен быть строкой
    this.token = token;
    this.user = user;
  }

  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear();//очищаем локальное хранилище
  }

  isLoggedIn(){
    return tokenNotExpired();
  }

}

