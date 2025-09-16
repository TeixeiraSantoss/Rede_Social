import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioEditDTO } from 'src/app/DTO/UsuarioDTO/UsuarioEditDTO';
import { UsuarioModel } from 'src/app/Models/UsuarioModel';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent {
  constructor(private client: HttpClient, private router: Router){}

  usuario: UsuarioEditDTO = {
    nome: "testeNome",
    userName: "testeUserName"
  }

  ngOnInit():void{
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario))
  }

  
}
