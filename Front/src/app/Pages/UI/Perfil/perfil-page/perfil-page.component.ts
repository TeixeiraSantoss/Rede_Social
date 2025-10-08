import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.scss']
})
export class PerfilPageComponent {
  constructor(private auth: AuthService, private router: Router, private client: HttpClient){}

  usuario: UsuarioReadDTO | null = null
  
  ngOnInit():void{
    this.usuario = this.auth.getUsuario()
    console.log(this.usuario)
  }

  irParaEditarUsuario(): void{
    this.router.navigate([`usuario/editar/${this.usuario?.id}`])
  }

  teste(): void{
    this.router.navigate([""]) 
  }

  excluir():void{
    this.client.delete(`https://localhost:7088/api/usuario/excluir/${this.usuario?.id}`)
    .subscribe({
      next:() => {
        this.auth.logout()
        this.router.navigate([""])
        console.log("usuario deletado")
      }
    })
  }
}
