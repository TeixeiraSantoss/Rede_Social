import { Location } from '@angular/common';
import { UsuarioEditDTO } from './../../../DTO/UsuarioDTO/UsuarioEditDTO';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioFindDTO } from 'src/app/DTO/UsuarioDTO/UsuarioFindDTO';
import { UsuarioReadDTO } from 'src/app/DTO/UsuarioDTO/UsuarioReadDTO';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  constructor(private client: HttpClient, 
    private router: ActivatedRoute, 
    private route: Router, 
    private auth: AuthService,
    private fb: FormBuilder,
    private location: Location){}
    
  //Representa o formulario
  form!: FormGroup

  //controla as mensagens de sucesso
  mensagemSucesso: string | null = null

  //flag de envio
  isSubmitting = false

  //array que recebe mensagens de erro
  serverErrors: string[] = []

  usuario: UsuarioFindDTO | null = null
  id: number = 0

  ngOnInit():void{

    //Define quais são os requisitos de cada campo de formulario
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacoValidator]],
      userName: ['', [Validators.required, Validators.minLength(3), this.naoSoEspacoValidator]]
    })

    this.router.params
    .subscribe({
      next: (parametros)=>{
        let {id} = parametros
        this.id = id
      },
      error: (erro)=>{
        console.log(erro)
      }
    })

    this.client.get<UsuarioFindDTO>(`https://localhost:7088/api/usuario/buscar/${this.id}`)
    .subscribe({
      next: (usuario)=>{
        this.usuario = usuario

        //Preenche os inputs com os dados vindos da API
        this.preencherCampos()
      },
      error: (erro)=>{
        console.log(erro)
      }
    })
  }

  //Valida e retira espaços vazios
  naoSoEspacoValidator(control: AbstractControl): ValidationErrors | null{
    const v = control.value as string | null

    if(v == null) return null

    return v.trim().length === 0 ? {apenasEspacos: true} : null
  }

  //Getters
  get nome(): AbstractControl | null {return this.form.get('nome')}
  get userName(): AbstractControl | null {return this.form.get('userName')}

  editar():void {
    //verifica se o formulario ja foi enviado
    if(this.isSubmitting) return

    //Valida o formulario
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

    //Verifica se existe usuario logado
    let dadosUsuario = this.auth.getUsuario()

    if(!dadosUsuario){
      this.serverErrors = ["Nenhum usuario logado, não foi possivel realizar a operação"]
      return
    }

    //construindo DTO
    const formValue = this.form.value
    const usuarioEditado: UsuarioEditDTO = {
      nome: (formValue.nome as string).trim(),
      userName: (formValue.userName as string).trim()
    }

    this.client.patch<UsuarioEditDTO>(`https://localhost:7088/api/usuario/editar/${this.id}`, usuarioEditado)
    .subscribe({
      next: ()=>{
        this.auth.setUsuarioEditado(usuarioEditado)
        
        this.mensagemSucesso = "Dados do Usuario alterados com sucesso"

        setTimeout(() => {
          this.mensagemSucesso = null
          
          this.form.reset()
          this.isSubmitting = false

          this.route.navigate(["/perfil"])
        }, 3000)

      },
      error: (erro)=>{
        console.log(erro)

        this.isSubmitting = false
      }
    })    
    
  }

  preencherCampos(): void{
    this.form.patchValue({
      nome: this.usuario?.nome,
      userName: this.usuario?.userName
    })
  }

  voltarPagina():void {
    this.location.back()
  }
}
