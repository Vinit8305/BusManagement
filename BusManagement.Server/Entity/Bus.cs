using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BusManagement.Server.Entity
{
    public class Bus
    {
        [Key]
        public int BusId { get; set; }

        [Required]
        [StringLength(150)]
        public string BusNum { get; set; } = string.Empty;

        [Column(TypeName = "datetime2")]
        public DateTime BusStartedDateAt { get; set; } 
        public bool IsActive { get; set; } = true;    
        
        public ICollection<MeterInfo> MeterInfos { get; set; } = new List<MeterInfo>();
        public ICollection<EmployeeInfo> EmployeeInfos { get; set; } = new List<EmployeeInfo>();
        public ICollection<DailyTripInfo> DailyTripInfos { get; set;} = new List<DailyTripInfo>();

    }
}
