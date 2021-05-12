import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.css']
})
export class MathComponent implements OnInit {

  first_number: number;
  second_number: number;
  symbol: any;
  active: boolean = true;
  otvet: number;
  clear: any;
  counter: number = 0;


  constructor(private flashMessage : FlashMessagesService) { }

  ngOnInit(): void {
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  WhichSymb(sign, num1, num2){
    if(sign == 1){
        return '+';
    }
    if(sign == 2){
        if(num2 > num1){
            return '+';
        }
        else{
        return "-";
        }
    }
    if(sign == 3){
        if(num1 + num2 > 20){
            return '+';
        }
        else{
        return "*";
        }
    }
    if(sign == 4){
        if(num1 % num2 == 0 ){
        return "/";
    }
        else{
            return '+';
        }
    }
}

  zapolnit(){
    this.first_number = this.getRandomInt(1, 100);
    this.second_number = this.getRandomInt(1, 100);

    if(this.first_number + this.second_number >= 100){
      this.first_number = this.getRandomInt(1, 50);
      this.second_number = this.getRandomInt(1, 50);
    }

    this.symbol = this.WhichSymb(this.getRandomInt(1,5), this.first_number, this.second_number);
    console.log(this.first_number, this.second_number, this.symbol);
    // this.active = !this.active;
    return false;
  }

  search(){
    this.zapolnit();
    this.active = !this.active;

  }

  answer(result){
    console.log(result);
    if(result == ""){
      this.flashMessage.show('Пусте поле(',
      {
        cssClass : 'alert-danger',
        timeout : 3000
      });
    } else{

      if(this.symbol == '+'){
        this.otvet = this.first_number + this.second_number;
      }
      if(this.symbol == '-'){
        this.otvet = this.first_number - this.second_number;
      }
      if(this.symbol == '*'){
        this.otvet = this.first_number * this.second_number;
      }
      if(this.symbol == '/'){
        this.otvet = this.first_number / this.second_number;
      }
      if(this.otvet == result){
        this.flashMessage.show('Відповідь вірна',
        {
        cssClass : 'alert-success',
        timeout : 3000
        });
        this.counter++;
      }else{
        this.flashMessage.show('Відповідь не вірна',
      {
        cssClass : 'alert-danger',
        timeout : 3000
      });
        this.counter++;
      }
      this.zapolnit();
      this.clear= '';
      console.log(this.counter);
    }
    return false;
  }

}
