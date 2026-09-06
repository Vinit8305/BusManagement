using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusManagement.Server.Entity
{
    public class MeterInfo
    {
        [Key]
        public int MeterId { get; set; }
        [Required]
        public int BusId { get; set; }

        [ForeignKey(nameof(BusId))]
        public Bus? Bus { get; set; }   

        [Required]
        [Column("MMR", TypeName = "decimal(18,2)")]
        public decimal MorningMeterReading { get; set; }

        [Required]
        [Column("EMR", TypeName = "decimal(18,2)")]
        public decimal EveningMeterReading { get; set; }

        [Column("MMRImgUrl")]
        [StringLength(500)]
        public string? MorningMeterImgUrl { get; set; }

        [Column("EMRImgUrl")]
        [StringLength(500)]
        public string? EveningMeterImgUrl { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime TravelDate { get; set; }
    }
}
