import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSeguindoComponent } from './listar-seguindo.component';

describe('ListarSeguindoComponent', () => {
  let component: ListarSeguindoComponent;
  let fixture: ComponentFixture<ListarSeguindoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSeguindoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSeguindoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
