import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailyhistory } from './dailyhistory';

describe('Dailyhistory', () => {
  let component: Dailyhistory;
  let fixture: ComponentFixture<Dailyhistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dailyhistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dailyhistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
