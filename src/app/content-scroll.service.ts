import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentScrollService {

  // TODO: create component instance array with url/uuid/x and y scroll positions

  constructor(private router: Router) {
    this.initialize();
  }

  /**
   * Method to initialize the service router event subscriptions
   */
  public initialize() {
    this.listenNavigationStart();
    this.listenNavigationEnd();
  }

   /**
   * Method to listen to Navigation router events
   */
  private listenNavigationStart() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart)
      )
      .subscribe((event: RouterEvent) => {
        console.log('router event start: ', event.url);
      });
  }

  /**
   * Method to listen to NavigationEnd router events
   */
  private listenNavigationEnd() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((event: RouterEvent) => {
        console.log('router event end: ', event.url);
      });
  }
}
