import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioSeguidoDTO } from 'src/app/DTO/SeguidorDTO/UsuarioSeguidoDTO';
import { UsuarioSeguidorDTO } from 'src/app/DTO/SeguidorDTO/UsuarioSeguidorDTO';

@Component({
  selector: 'app-listar-seguidores',
  templateUrl: './listar-seguidores.component.html',
  styleUrls: ['./listar-seguidores.component.scss']
})
export class ListarSeguidoresComponent {
  constructor(private client: HttpClient, private route: ActivatedRoute){}
  
    id: number = 0
  
    //Lista de Usuarios que estão seguindo outro usuario
    seguidores: UsuarioSeguidorDTO[] = []
  
    //Lista de Usuarios que estão SENDO seguidos por outros usuarios
    seguidos: UsuarioSeguidoDTO[] = []
  
    ngOnInit(): void{
  
      this.route.params
      .subscribe({
        next:(parametros) =>{
          let {id} = parametros
          this.id = id
        },
        error:(erro) =>{
          console.log(erro)
        }
      })
  
      //Recebe a Lista de usuarios que estão seguindo outros usuarios
      this.client.get<UsuarioSeguidorDTO[]>(`https://localhost:7088/api/seguidor/listarSeguidores/${this.id}`)
      .subscribe({
        next:(seguidores) =>{
          this.seguidores = seguidores
          console.log("Lista de seguidores:")
          console.table(this.seguidores)
        },
        error:(erro) =>{
          console.log(erro)
        }
      });
  
      //Recebe a lista de usuarios que estão SENDO seguidos
      this.client.get<UsuarioSeguidoDTO[]>(`https://localhost:7088/api/seguidor/listarSeguidos/${this.id}`)
      .subscribe({
        next:(seguidos) =>{
          this.seguidos = seguidos
          console.log("Lista de seguidos:")
          console.table(this.seguidos)
        },
        error:(erro) =>{
          console.log(erro)
        }
      });
    }
}
