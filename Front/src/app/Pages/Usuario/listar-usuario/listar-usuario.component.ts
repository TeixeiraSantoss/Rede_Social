import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent {
  constructor(private client: HttpClient, private route: Router){}

  usuarios: UsuarioReadDTO[] = []

  ngOnInit():void {
    this.client.get<UsuarioReadDTO[]>("https://localhost:7088/api/usuario/listar")
    .subscribe({
      next: (usuarios)=>{
        this.usuarios = usuarios;
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  editar(id: number):void {
    this.route.navigate([`usuario/editar/${id}`])
  }
}
