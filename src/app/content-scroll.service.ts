import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContentScrollInstance } from './content-scroll-instance';

@Injectable({
  providedIn: 'root'
})
export class ContentScrollService {

  private _contentScrollComponentInstanceStore: Map<string, ContentScrollInstance> = new Map();

  // TODO: create directive to add unique id from this service to each content scroll instance so we can pull it from the DOM

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

  public upsertInstanceToStore(id: string, instance: ContentScrollInstance) {
    this._contentScrollComponentInstanceStore.set(id, instance);
    console.log('upsert instance: ', this._contentScrollComponentInstanceStore);
  }

  public findInstanceInStore(id): ContentScrollInstance | undefined {
    console.log('find instance: ', this._contentScrollComponentInstanceStore);
    return this._contentScrollComponentInstanceStore.get(id);
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
