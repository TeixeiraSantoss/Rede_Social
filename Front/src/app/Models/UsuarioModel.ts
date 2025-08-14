import { PostagemModel } from "./PostagemModel";
import { SeguidorModel } from "./SeguidorModel";

export interface UsuarioModel
{
    id: number;
    nome: string;
    userName: string;
    email: string;
    senha: string;
    Postagens: PostagemModel[];
    Seguindo: SeguidorModel[];
    Seguidores: SeguidorModel[];
}