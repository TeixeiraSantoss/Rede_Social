using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.DTO.PostagemDTO;
using Back.DTO.SeguidorDTO;
using Back.Models;

namespace Back.DTO.UsuarioDTO
{
    public class UsuarioFindDTO
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string senha { get; set; }
        public List<PostagemReadDTO> Postagens { get; set; } = new();
        public List<UsuarioSeguidoDTO> Seguindo { get; set; } = new();
        public List<UsuarioSeguidorDTO> Seguidores { get; set; } = new();
    }
}