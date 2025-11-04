import { PostagemModel } from "src/app/Models/PostagemModel";
import { SeguidorModel } from "src/app/Models/SeguidorModel";
import { UsuarioSeguidoDTO } from "../SeguidorDTO/UsuarioSeguidoDTO";
import { UsuarioSeguidorDTO } from "../SeguidorDTO/UsuarioSeguidorDTO";

export interface UsuarioFindDTO
{
    id: number;
    nome: string;
    userName: string;
    email: string;
    senha: string;
    postagens: PostagemModel[];
    seguindo: UsuarioSeguidoDTO[];
    seguidores: UsuarioSeguidorDTO[];
}