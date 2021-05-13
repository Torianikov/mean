import { Component, OnInit, NgModule, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-ukr',
  templateUrl: './ukr.component.html',
  styleUrls: ['./ukr.component.css']
})
export class UkrComponent implements OnInit {

  @ViewChild("container", {read: ElementRef}) private container: ElementRef;

  constructor(private renderer: Renderer2,
    private flashMessage: FlashMessagesService) { }

  num : number ;
  search_numb: number = 12;
  result: string;
  active: boolean = true;
  schet : number = 0;
  zadaniy: any =  [
    "с1нце",
    "а1куш",
    "бал1т",
    "ва1он",
    "ва1та",
    "с1ово",
    'узв1р',
    "хо1як",
    "те1ст",
    "я1ода"
  ];
  slova_otveta: any = [
  "о",
  "р",
  "е",
  "г",
  "р",
  "л",
  "а",
  "м",
  "к",
  "г"];

  ngOnInit(): void {
  }




  zapolnit(){
    for(let i = 0; i < 5; i++){

      let bykva = this.zadaniy[this.schet][i];

      if(bykva == '1'){
          this.num = i;
          let dly_otveta = this.renderer.createElement('input');
          this.renderer.addClass(dly_otveta, 'number');
          this.renderer.setAttribute(dly_otveta, 'id', 'symb_otvet');
          this.renderer.setProperty(dly_otveta, '([ngModel]', 'result');
          this.renderer.appendChild(this.container.nativeElement, dly_otveta);
          }

      else{
          let div = this.renderer.createElement('div');
          let text = this.renderer.createText(this.zadaniy[this.schet][i]);
          this.renderer.appendChild(div,text);
          this.renderer.addClass(div,'number');
          this.renderer.setAttribute(div,'id', 'symb' + i);
          this.renderer.appendChild(this.container.nativeElement,div);
          }
      }
      this.schet++;
  }




  search(){
      this.zapolnit();
      this.active = !this.active;
  }

  answer(){
    this.result = this.renderer.selectRootElement('#symb_otvet').value.toLowerCase();
    if(this.result == this.slova_otveta[this.schet - 1]){
      this.flashMessage.show('Відповідь вірна',
      {
        cssClass : 'alert-success',
        timeout : 3000
      });
    }else{
      this.flashMessage.show('Відповідь не вірна',
      {
        cssClass : 'alert-danger',
        timeout : 3000
      });
    }
    this.zapolnit();

    this.clear();
    return false;
  }

  clear(){
    let parents = this.container.nativeElement;

    for(let i = 0; i < 5; i++){
      let bykva = this.zadaniy[this.schet-2][i]

      if(bykva == '1'){
          this.renderer.removeChild(parents, this.renderer.selectRootElement('#symb_otvet'));

      }else{
        this.renderer.removeChild(parents, this.renderer.selectRootElement('#symb'+i));
      }
    }
  }

}
