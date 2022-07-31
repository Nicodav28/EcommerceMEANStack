import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductoComponent } from './update-producto.component';

describe('UpdateProductoComponent', () => {
  let component: UpdateProductoComponent;
  let fixture: ComponentFixture<UpdateProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
