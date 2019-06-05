import { AfterContentInit, Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { ContentScrollService } from '../content-scroll.service';
import { ContentScrollInstance } from '../content-scroll-instance';

// modify time constants as necessary
const ONE_SECOND: number = 1000;
const QUARTER_OF_ONE_SECOND: number = 250;

@Component({
  selector: 'content-scroll',
  templateUrl: './content-scroll.component.html',
  styleUrls: ['./content-scroll.component.css']
})

export class ContentScrollComponent implements AfterContentInit, OnDestroy, OnInit {
  public isTouchDevice: boolean = 'ontouchstart' in window;
  public hasVerticalScroll: boolean = false;
  public hasHorizontalScroll: boolean = false;

  public mutationObserver: MutationObserver;

  @ViewChild('content') content: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;

  private _componentIdentifier: string = undefined;
  private _canCheckScroll: boolean = true; // delimiter for the scroll $event

  constructor(private contentScrollService: ContentScrollService) { }

  /**
   * for demo only
   */
  public toggleTouch(): void {
    this.isTouchDevice = !this.isTouchDevice;
  }

  public ngOnInit() {
    this._setComponentIdentifier();
  }

  public ngAfterContentInit(): void {
    this.initScroll();
    this.initMutationObserver();
  }

  public ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }

  /**
   * Method to initialize the scroll components when the content is updated, set timeout if content is slow to render
   */
  public initScroll(): void {
    setTimeout(() => {
      this.hasHorizontalScroll = this.content.nativeElement.scrollWidth > this.wrapper.nativeElement.clientWidth;
      this.hasVerticalScroll = this.content.nativeElement.scrollHeight > this.wrapper.nativeElement.clientHeight;
      this._initScrollRestoration();
    }, this.isContentSlowToRender() ? ONE_SECOND : 0);
  }

  /**
   * Method to determine if the content is slow/not loading quickly by checking height and width.
   * This could mean that no content is inside the element but it is optimistic to think there should be content
   * @returns {boolean} value to determine if height or width is 0
   */
  public isContentSlowToRender(): boolean {
    const noWidthLoaded = this.content.nativeElement.scrollWidth === 0;
    const noHeightLoaded = this.content.nativeElement.scrollHeight === 0;
    return noWidthLoaded || noHeightLoaded;
  } 

  /**
   * Method to initialize the MutationObserver that detects changes to the content and updates the controls
   */
  public initMutationObserver(): void {
    this.mutationObserver = new MutationObserver((mutationsList: MutationRecord[]) => {
      for(var mutation of mutationsList) {
        if (mutation.type === 'childList'
          && mutation.addedNodes.length
          && this.hasVerticalScroll) {
          // if a node was added to the childList and we can scroll vertically
          this.scrollBottomEdge();
          this._forceSaveScroll();
        }
      }
      // when the content is mutated, re-init the scroll position
      this.initScroll();
    });

    const config: MutationObserverInit = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    }

    try {
      this.mutationObserver.observe(this.content.nativeElement, config);
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

  /**
   * Method to update the scroll positions of the component instance, fires on scroll $event
   * This method is delimited by 250 ms to improve performance and reduce redundant saves
   */
  public saveScroll(): void {
    if (!this._canCheckScroll) {
      return;
    }

    this._canCheckScroll = false;

    // rate limit the save to once per 250ms
    setTimeout(() => {
      this.contentScrollService.upsert(
        this._getComponentIdentifier(),
        this._generateComponentInstance()
      );
      this._canCheckScroll = true;
    }, QUARTER_OF_ONE_SECOND);
  }
  /**
   * Method to update the scroll positions of the component instance
   * This method is NOT delimited by 250 ms, this forces the save
   */
  private _forceSaveScroll(): void {
    this.contentScrollService.upsert(
      this._getComponentIdentifier(),
      this._generateComponentInstance()
    );
  }

  /**
   * Method to retrieve the unique universal identifier generated for the component
   * @returns {string} the component identifier
   */
  private _getComponentIdentifier(): string {
    return this._componentIdentifier;
  }
  
  /**
   * Method to drill out of the component instance and find the DI token to identify it
   */
  private _setComponentIdentifier(): void {
    this._componentIdentifier = this.wrapper.nativeElement.offsetParent.parentNode.attributes[0].name;
  }

  /**
   * Method to create a component instance to restore
   * @returns {ContentScrollInstance} the generated component instance
   */
  private _generateComponentInstance(): ContentScrollInstance {
    return {
      horizontalScrollPosition: this.wrapper.nativeElement.scrollLeft,
      verticalScrollPosition: this.wrapper.nativeElement.scrollTop
    };
  }

  /**
   * Method to save initial/restore the scroll position of the content-scroll instance
   */
  private _initScrollRestoration(): void {
    // check if the Map has an entry already
    const instance: ContentScrollInstance = this.contentScrollService.find(this._getComponentIdentifier());

    // if we have an entry in the Map restore scroll position
    if (instance) {
      this.wrapper.nativeElement.scrollTop = instance.verticalScrollPosition;
      this.wrapper.nativeElement.scrollLeft = instance.horizontalScrollPosition;
    }
  }
}
