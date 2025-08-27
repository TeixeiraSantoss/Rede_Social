using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.DTO.SeguidorDTO
{
    public class SeguidorReadDTO
    {
        public int seguidorId { get; set; }
        public string nomeSeguidor { get; set; }
        public string userNameSeguidor { get; set; }
        public int seguidoId { get; set; }
        public string nomeSeguido { get; set; }
        public string userNameSeguido { get; set; }
    }
}