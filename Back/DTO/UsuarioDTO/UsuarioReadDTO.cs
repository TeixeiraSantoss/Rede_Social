using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;

namespace Back.DTO.UsuarioDTO
{
    public class UsuarioReadDTO
    {
         public int id { get; set; }
        public string nome { get; set; }
        public string userName { get; set; }
        public List<PostagemModel> Postagens { get; set; } = new();
        public List<SeguidorModel> Seguindo { get; set; } = new();
        public List<SeguidorModel> Seguidores { get; set; } = new();
    }
}