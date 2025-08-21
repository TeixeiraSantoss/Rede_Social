import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PostagemReadDTO } from 'src/app/DTO/PostagemDTO/PostagemReadDTO';

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent {
  constructor(private client: HttpClient, private route: Router){}

  postagens: PostagemReadDTO[] = []

  ngOnInit(): void{
    this.client.get<PostagemReadDTO[]>("https://localhost:7088/api/postagem/listar")
    .subscribe({
      next:(postagens) => {
        this.postagens = postagens
        console.table(this.postagens)
      },
      error:(erro) => {
        console.log(erro)
      }
    })
  }

  Editar(id: number): void{
    console.log(id)
    this.route.navigate([`postagem/editar/${id}`])
  }
}
