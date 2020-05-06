import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviessearchComponent } from './moviessearch.component';

describe('MoviessearchComponent', () => {
  let component: MoviessearchComponent;
  let fixture: ComponentFixture<MoviessearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviessearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviessearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
