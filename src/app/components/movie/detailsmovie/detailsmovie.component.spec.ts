import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmovieComponent } from './detailsmovie.component';

describe('DetailsmovieComponent', () => {
  let component: DetailsmovieComponent;
  let fixture: ComponentFixture<DetailsmovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsmovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
