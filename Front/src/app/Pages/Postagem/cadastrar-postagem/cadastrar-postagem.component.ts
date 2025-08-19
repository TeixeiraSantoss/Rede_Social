import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PostagemCreatDTO } from 'src/app/DTO/PostagemDTO/PostagemCreatDTO';

@Component({
  selector: 'app-cadastrar-postagem',
  templateUrl: './cadastrar-postagem.component.html',
  styleUrls: ['./cadastrar-postagem.component.scss']
})
export class CadastrarPostagemComponent {
  constructor(private client: HttpClient){}

  titulo: string = ""
  conteudo: string = ""
  UsuarioId: number = 0

  teste(): void{
    console.log(this.titulo)
    console.log(this.conteudo)
    console.log(this.UsuarioId)
  }

  cadastrar(): void{
    let novaPostagem: PostagemCreatDTO = {
      titulo: this.titulo,
      conteudo: this.conteudo,
      UsuarioId: this.UsuarioId
    }
    this.client.post<PostagemCreatDTO>("https://localhost:7088/api/postagem/cadastrar", novaPostagem)
    .subscribe({
      next: () =>{
        console.log("Postagem cadastrao com sucesso")
      },
      error: (erro) =>{
        console.log(erro)
      }
    })
  }
}
