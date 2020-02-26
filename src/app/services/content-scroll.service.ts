import { Injectable } from '@angular/core';
import { ContentScrollInstance } from '../models/content-scroll-instance';

@Injectable({
  providedIn: 'root'
})
export class ContentScrollService {
  private _contentScrollComponentInstanceStore: Map<string, ContentScrollInstance> = new Map();

  constructor() {
  }

  /**
   * Method to update an existing or add a new content-scroll instance to our Map
   * @param {string} id the DI token value
   * @param {ContentScrollInstance} instance see properties
   */
  public upsert(id: string, instance: ContentScrollInstance) {
    this._contentScrollComponentInstanceStore.set(id, instance);
  }

  /**
   * Method to find a Map entry by ID
   * @param {string} id dependency injection token for content-scroll instance
   */
  public find(id: string): ContentScrollInstance | undefined {
    return this._contentScrollComponentInstanceStore.get(id);
  }
}
