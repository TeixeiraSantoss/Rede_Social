import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsuarioReadDTO } from './DTO/UsuarioDTO/UsuarioReadDTO';
import { UsuarioModel } from './Models/UsuarioModel';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router){}
  title = 'Front';

  ocultarTrecho: boolean = false; 

  // Defina as rotas onde o trecho deve ser OCULTADO
  // Exemplo: Login, Cadastro e a rota raiz ('/')
  rotasParaOcultar: string[] = ['/login', '/'];

  ngOnInit(): void {
    // Escuta as mudanças de navegação
    this.router.events
      .pipe(
        // Filtra apenas eventos de navegação concluída
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const urlAtual = event.urlAfterRedirects;
        
        // Verifica se a URL atual INCLUI alguma das rotas de ocultação
        this.ocultarTrecho = this.rotasParaOcultar.some(route => urlAtual.includes(route));

        // Se quiser ser exato na correspondência, use:
        // this.ocultarTrecho = this.rotasParaOcultar.includes(urlAtual);
      });
  }

  navegarParaHome():void{
    this.router.navigate(['feed'])
  }
}
