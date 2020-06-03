import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmoviespageComponent } from './adminmoviespage.component';

describe('AdminmoviespageComponent', () => {
  let component: AdminmoviespageComponent;
  let fixture: ComponentFixture<AdminmoviespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmoviespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmoviespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
