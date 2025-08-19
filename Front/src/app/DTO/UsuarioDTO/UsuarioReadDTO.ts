import { PostagemModel } from "src/app/Models/PostagemModel";
import { SeguidorModel } from "src/app/Models/SeguidorModel";

export interface UsuarioReadDTO
{
    id: number;
    nome: string;
    userName: string;
    Postagens: PostagemModel[];
    Seguindo: SeguidorModel[];
    Seguidores: SeguidorModel[];
}