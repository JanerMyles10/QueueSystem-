import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Front } from './front';

describe('Front', () => {
  let component: Front;
  let fixture: ComponentFixture<Front>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Front]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Front);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
