import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-eng',
  templateUrl: './eng.component.html',
  styleUrls: ['./eng.component.css']
})
export class EngComponent implements OnInit {

  @ViewChild("container", {read: ElementRef}) private container: ElementRef;


  constructor(private renderer: Renderer2, private flashMessage: FlashMessagesService) { }

  active: boolean = true;
  schet: number = 0;
  result: string;

  img_zadaniy = [
    "https://img.icons8.com/color/144/000000/madagaskar.png",
    "https://img.icons8.com/color/144/000000/mouse-animal.png",
    "https://img.icons8.com/color/144/000000/cat-head.png",
    "https://img.icons8.com/color/144/000000/elephant.png",
    "https://img.icons8.com/color/144/000000/snake.png",
    "https://img.icons8.com/color/144/000000/trotting-horse.png",
    "https://img.icons8.com/color/144/000000/pig.png",
    "https://img.icons8.com/color/144/000000/cow.png",
    "https://img.icons8.com/color/144/000000/wolf.png",
    "https://img.icons8.com/color/144/000000/sheep.png"
  ];

  slova_otveta = [
    "lion",
    "mouse",
    "cat",
    "elephant",
    "snake",
    "horse",
    "pig",
    "cow",
    "wolf",
    "sheep"
  ];



  ngOnInit(): void {
  }

  search(){
    this.active = !this.active;
    this.zapolnit();
  }

  answer(){
    this.result = this.renderer.selectRootElement('#result_eng').value.toLowerCase();
    if( this.result == this.slova_otveta[this.schet-1]){
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
  }


  zapolnit(){
    let img_answer = this.renderer.createElement('img');
    this.renderer.setAttribute(img_answer, 'src', this.img_zadaniy[this.schet]);
    this.renderer.setAttribute(img_answer, 'id', 'eng_img');
    this.renderer.appendChild(this.container.nativeElement, img_answer);

    let result_eng = this.renderer.createElement('input');
    this.renderer.setAttribute(result_eng, 'id', 'result_eng');
    this.renderer.setAttribute(result_eng, 'class', 'number');
    this.renderer.appendChild(this.container.nativeElement, result_eng);

    this.schet++;
  }

  clear(){
    let parents = this.container.nativeElement;
    this.renderer.removeChild(parents, this.renderer.selectRootElement('#eng_img'));
    this.renderer.removeChild(parents, this.renderer.selectRootElement('#result_eng'));
  }
}
