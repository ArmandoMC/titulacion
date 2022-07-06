import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnthewayOrdersComponent } from './ontheway-orders.component';

describe('OnthewayOrdersComponent', () => {
  let component: OnthewayOrdersComponent;
  let fixture: ComponentFixture<OnthewayOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnthewayOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnthewayOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
