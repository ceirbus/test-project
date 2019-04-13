import { TestBed } from '@angular/core/testing';

import { ContentScrollService } from './content-scroll.service';

describe('ContentScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentScrollService = TestBed.get(ContentScrollService);
    expect(service).toBeTruthy();
  });
});
