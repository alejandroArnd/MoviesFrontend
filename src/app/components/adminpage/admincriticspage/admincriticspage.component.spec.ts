import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincriticspageComponent } from './admincriticspage.component';

describe('AdmincriticspageComponent', () => {
  let component: AdmincriticspageComponent;
  let fixture: ComponentFixture<AdmincriticspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincriticspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincriticspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
