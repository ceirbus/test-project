import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['./text-content.component.css']
})
export class TextContentComponent implements OnInit {

  @ViewChild('dummyContent') dummyContent: ElementRef

  constructor() { }

  ngOnInit() {
  }

  public click(): void {
    const node = '<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>';
    this.dummyContent.nativeElement.insertAdjacentHTML('beforeend', node);
    console.log(this.dummyContent);
  }

}
