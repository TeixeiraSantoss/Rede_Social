import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPostagemSeguidosComponent } from './listar-postagem-seguidos.component';

describe('ListarPostagemSeguidosComponent', () => {
  let component: ListarPostagemSeguidosComponent;
  let fixture: ComponentFixture<ListarPostagemSeguidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPostagemSeguidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPostagemSeguidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
