import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalContentComponent } from './vertical-content.component';

describe('VerticalContentComponent', () => {
  let component: VerticalContentComponent;
  let fixture: ComponentFixture<VerticalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
