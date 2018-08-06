using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperDev.Models
{
    public interface IModifier
    {
        DateTime ModifiedDate { get; set; }

        Guid? ModifiedBy { get; set; }

        User Modifier { get; set; }
    }
}
