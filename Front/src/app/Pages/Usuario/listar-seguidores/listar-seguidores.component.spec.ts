import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSeguidoresComponent } from './listar-seguidores.component';

describe('ListarSeguidoresComponent', () => {
  let component: ListarSeguidoresComponent;
  let fixture: ComponentFixture<ListarSeguidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSeguidoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
