import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostagemEditDTO } from 'src/app/DTO/PostagemDTO/PostagemEditDTO';
import { PostagemReadDTO } from 'src/app/DTO/PostagemDTO/PostagemReadDTO';

@Component({
  selector: 'app-editar-postagem',
  templateUrl: './editar-postagem.component.html',
  styleUrls: ['./editar-postagem.component.scss']
})
export class EditarPostagemComponent {
  constructor(private client: HttpClient, private router: ActivatedRoute){}
   
  //Receber o id da postagem ao clicar nela
  id: number = 0
  titulo: string = ""
  conteudo: string = ""
  usuarioId: number = 0

  ngOnInit(): void{
    //Recebe o id da URL
    this.router.params.subscribe({
      next:(parametros) => {
        let {id} = parametros

        //Carregando os dados da Postagem antes dela ser editada
        this.client.get<PostagemReadDTO>(`https://localhost:7088/api/postagem/buscar/${id}`)
        .subscribe({
          next:(postagem) => {
            this.id = postagem.id
            this.titulo = postagem.titulo
            this.conteudo = postagem.conteudo
            this.usuarioId = postagem.usuarioId
          },
          error:(erro) => {
            console.log(erro)
          }
        })
      },
      error:(erro) =>{
        console.log(erro)
      }
    })
  }

  public Editar(): void{

    let postagemEditada: PostagemEditDTO = {
      titulo: this.titulo,
      conteudo: this.conteudo
    }

    this.client.patch<PostagemEditDTO>(`https://localhost:7088/api/postagem/editar/${this.id}`, postagemEditada)
    .subscribe({
      next: () => {
        console.log("Postagem alterada com sucesso")
      },
      error: (erro) => {
        console.log(erro)
      }
    })
  }
}
