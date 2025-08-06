using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.DTO.PostagemDTO
{
    public class PostagemCreateDTO
    {
         public string titulo { get; set; }
        public string conteudo { get; set; }
        public int UsuarioId { get; set; }
    }
}