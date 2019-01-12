import { AfterContentInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'content-scroll',
  templateUrl: './content-scroll.component.html',
  styleUrls: ['./content-scroll.component.css']
})
export class ContentScrollComponent implements AfterContentInit, OnDestroy {

  public hasVerticalScroll: boolean = false;
  public hasHorizontalScroll: boolean = false;

  public observer: MutationObserver;

  @ViewChild('content') content: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor() {
    this.observer = new MutationObserver((mutations) => {
      this.initScroll();
    });
  }

  public ngAfterContentInit() {
    this.initScroll();
    this.initObserver();
  }

  public ngOnDestroy() {
    this.observer.disconnect();
  }

  /**
   * Method to initialize the scroll components when the content is updated
   */
  public initScroll(): void {
    this.hasVerticalScroll = this.content.nativeElement.scrollWidth > this.wrapper.nativeElement.clientWidth;
    this.hasHorizontalScroll = this.content.nativeElement.scrollHeight > this.wrapper.nativeElement.clientHeight;
  }

  /**
   * Method to initialize the MutationObserver that detects changes to the content and updates the controls
   */
  public initObserver(): void {
    const config: MutationObserverInit = {
      attributes: true,
      childList: true,
      characterData: true
    }

    try {
      this.observer.observe(this.content.nativeElement, config);
    } catch(error) {
      console.log("Error creating observer: ", error);
    }
  }

  /**
   * Method to scroll all the way to the top
   */
  public scrollTopEdge(): void {
    this.wrapper.nativeElement.scrollTop = 0;
  }

  /**
   * Method to scroll top a bit
   */
  public scrollTop(): void {
    this.wrapper.nativeElement.scrollTop -= this.wrapper.nativeElement.clientHeight;
  }

  /**
   * Method to scroll all the way to the bottom
   */
  public scrollBottomEdge(): void {
    this.wrapper.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  }

  /**
   * Method to scroll to the bottom a bit
   */
  public scrollBottom(): void {
    this.wrapper.nativeElement.scrollTop += this.wrapper.nativeElement.clientHeight;
  }

  /**
   * Method to scroll all the way left
   */
  public scrollLeftEdge(): void {
    this.wrapper.nativeElement.scrollLeft = 0;
  }

  /**
   * Method to scroll to the left a bit
   */
  public scrollLeft(): void {
    this.wrapper.nativeElement.scrollLeft -= this.wrapper.nativeElement.clientWidth;
  }
  /**
   * Method to scroll all the way right
   */
  public scrollRightEdge(): void {
    this.wrapper.nativeElement.scrollLeft = this.content.nativeElement.scrollWidth;
  }

  /**
   * Method to scroll to the right a bit
   */
  public scrollRight(): void {
    this.wrapper.nativeElement.scrollLeft += this.wrapper.nativeElement.clientWidth;
  }
}
