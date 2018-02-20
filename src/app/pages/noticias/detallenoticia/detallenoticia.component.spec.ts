import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallenoticiaComponent } from './detallenoticia.component';

describe('DetallenoticiaComponent', () => {
  let component: DetallenoticiaComponent;
  let fixture: ComponentFixture<DetallenoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallenoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallenoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
