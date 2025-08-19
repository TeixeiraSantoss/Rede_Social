using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;

namespace Back.DTO.PostagemDTO
{
    public class PostagemReadDTO
    {
        public int id { get; set; }
         public string titulo { get; set; }
        public string conteudo { get; set; }
        public int UsuarioId { get; set; }
    }
}