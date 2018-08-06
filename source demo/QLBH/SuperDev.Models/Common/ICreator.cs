using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperDev.Models
{
    public interface ICreator
    {
        DateTime CreatedDate { get; set; }

        Guid? CreatedBy { get; set; }

        User Creator { get; set; }
    }
}
