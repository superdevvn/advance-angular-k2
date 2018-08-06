using System;

namespace SuperDev.Models
{
    public interface IApprover
    {
        DateTime ApprovedDate { get; set; }

        Guid? ApprovedBy { get; set; }

        User Approver { get; set; }
    }
}
