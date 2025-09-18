import { PostagemModel } from "src/app/Models/PostagemModel";
import { SeguidorModel } from "src/app/Models/SeguidorModel";

export interface UsuarioReadDTO
{
    id: number;
    nome: string;
    userName: string;
    postagens: PostagemModel[];
    seguindo: SeguidorModel[];
    seguidores: SeguidorModel[];
}