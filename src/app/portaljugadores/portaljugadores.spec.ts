import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaljugadores } from './portaljugadores';

describe('Portaljugadores', () => {
  let component: Portaljugadores;
  let fixture: ComponentFixture<Portaljugadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaljugadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaljugadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
