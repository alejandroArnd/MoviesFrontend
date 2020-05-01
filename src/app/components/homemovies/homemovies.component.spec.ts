import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemoviesComponent } from './homemovies.component';

describe('HomemoviesComponent', () => {
  let component: HomemoviesComponent;
  let fixture: ComponentFixture<HomemoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
