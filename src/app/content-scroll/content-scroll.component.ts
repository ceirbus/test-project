import { AfterContentInit, Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'content-scroll',
  templateUrl: './content-scroll.component.html',
  styleUrls: ['./content-scroll.component.css']
})
export class ContentScrollComponent implements OnInit {

  public hasVerticalScroll: boolean = false;
  public hasHorizontalScroll: boolean = false;

  @ViewChild('content') content: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterContentInit() {
    this.hasVerticalScroll = this.content.nativeElement.scrollWidth > this.wrapper.nativeElement.clientWidth;
    this.hasHorizontalScroll = this.content.nativeElement.scrollHeight > this.wrapper.nativeElement.clientHeight;

    console.log(this.hasVerticalScroll);
    console.log(this.hasHorizontalScroll);
  }

  ngOnDestroy() {

  }

  public scrollTopEdge() {
    console.log(this.content.nativeElement.scrollTop);
  }

  public scrollBottomEdge() {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  }

  public scrollLeftEdge() {
    this.content.nativeElement.scrollLeft = 0;
  }

  public scrollRightEdge() {
    this.content.nativeElement.scrollLeft = this.content.nativeElement.scrollWidth;
  }
}

export class ContentScrollElement {
  
}
