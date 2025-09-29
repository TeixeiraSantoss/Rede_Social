import { Component } from '@angular/core';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.scss']
})
export class PerfilPageComponent {
  constructor(private auth: AuthService){}

  usuario: UsuarioReadDTO | null = null
  
  ngOnInit():void{
    this.usuario = this.auth.getUsuario()
    console.log(this.usuario)
  }
}
