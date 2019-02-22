import { Component, ViewChild } from '@angular/core';
import { ContentScrollComponent } from './content-scroll/content-scroll.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public iterator: number = 0;
  public filler: string;
  @ViewChild('contentScroll') contentScroll: ContentScrollComponent;

  public changeContent() {
    switch(this.iterator) {
      case 0: {
        this.iterator += 1;
        this.filler = 'Lorem Ipsum';
        break;
      }
      case 1: {
         this.iterator += 1;
         this.filler = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
         break;
      }
      default: {
         this.iterator = 0;
         this.filler = '<div style="height: 5000px; width: 5000px; background: red; background-image: radial-gradient(white, gray, black, red, blue, yellow);"></div>';
         break;
      }
   } 
   this.contentScroll.content.nativeElement.innerHTML = this.filler;
  }
}


