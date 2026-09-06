using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusManagement.Server.Entity
{
    public class EmployeeInfo
    {
        [Key]
        public int EmpId { get; set; }

        [Required]
        [StringLength(50)]
        public string? Name { get; set; }

        [Required]
        [StringLength(50)]
        public string? Role { get; set; }

        [StringLength(20)]
        public string? ContactNumber { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Salary { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime JoinDate { get; set; }

        [Required]
        public int BusId { get; set; }

        [ForeignKey(nameof(BusId))]
        public Bus? Bus { get; set; }

    }
}
