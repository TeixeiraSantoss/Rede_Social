using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.DTO.UsuarioDTO
{
    public class UsuarioLoginDTO
    {
        public int id { get; set; }
        public string email { get; set; }
        public string senha { get; set; }
    }
}