import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioProductoComponent } from './inventario-producto.component';

describe('InventarioProductoComponent', () => {
  let component: InventarioProductoComponent;
  let fixture: ComponentFixture<InventarioProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
