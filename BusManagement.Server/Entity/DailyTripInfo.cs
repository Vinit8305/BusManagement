using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusManagement.Server.Entity
{
    public class DailyTripInfo
    {
        [Key]
        public int TripId { get; set; }

        [Required]
        public int BusId { get; set; }

        [ForeignKey(nameof(BusId))]
        public Bus? Bus { get; set; }

        [Required]
        public int EmpId { get; set; }

        [ForeignKey(nameof(EmpId))]
        public EmployeeInfo? EmployeeInfo { get; set; }

        [Required]
        public int MeterId { get; set; }

        [ForeignKey(nameof(MeterId))]
        public MeterInfo? MeterInfo { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime TripDate { get; set; }

        [Required]
        [StringLength(150)]
        public string BusNum { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Name { get; set; }

        [Column("MMR", TypeName = "decimal(18,2)")]
        public decimal MorningMeterReading { get; set; }

        [Column("EMR", TypeName = "decimal(18,2)")]
        public decimal EveningMeterReading { get; set; }

        [Column(TypeName="decimal(18,2)")]
        public decimal DistanceCoverd {get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ReFuelQuentity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ReFuelAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Average { get; set; }
    }
}
