import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portalequipos } from './portalequipos';

describe('Portalequipos', () => {
  let component: Portalequipos;
  let fixture: ComponentFixture<Portalequipos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portalequipos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portalequipos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
