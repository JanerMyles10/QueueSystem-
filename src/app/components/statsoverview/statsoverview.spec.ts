import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statsoverview } from './statsoverview';

describe('Statsoverview', () => {
  let component: Statsoverview;
  let fixture: ComponentFixture<Statsoverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statsoverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Statsoverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
