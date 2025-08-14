import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPostagemComponent } from './cadastrar-postagem.component';

describe('CadastrarPostagemComponent', () => {
  let component: CadastrarPostagemComponent;
  let fixture: ComponentFixture<CadastrarPostagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarPostagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPostagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
