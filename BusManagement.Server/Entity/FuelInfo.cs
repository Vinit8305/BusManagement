using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusManagement.Server.Entity
{
    public class FuelInfo
    {
        [Key]
        public int FuelId { get; set;  }

        [Required]
        public int BusId { get; set; }

        [ForeignKey(nameof(BusId))]
        public Bus? Bus { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal FuelQuentity { get; set; }

        [Column(TypeName = "decimal(18,2)")] 
        public decimal FuelAmount { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime RefuleDate { get; set; } 
    }
}
