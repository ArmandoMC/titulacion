import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNosotrosComponent } from './menu-nosotros.component';

describe('MenuNosotrosComponent', () => {
  let component: MenuNosotrosComponent;
  let fixture: ComponentFixture<MenuNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNosotrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
