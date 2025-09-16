import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsuarioReadDTO } from './DTO/UsuarioDTO/UsuarioReadDTO';
import { UsuarioModel } from './Models/UsuarioModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front';
}
