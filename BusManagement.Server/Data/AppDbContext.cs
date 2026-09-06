using BusManagement.Server.Entity;
using Microsoft.EntityFrameworkCore;

namespace BusManagement.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Bus> BusInfo {  get; set; }
        public DbSet<MeterInfo> MeterInfo { get; set; }
        public DbSet<EmployeeInfo> EmployeeInfo { get; set; }
        public DbSet<FuelInfo> FuelInfo { get; set; }
        public DbSet<DailyTripInfo> DailyTripInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DailyTripInfo>().HasOne(d => d.Bus).WithMany(b => b.DailyTripInfos).HasForeignKey(d => d.BusId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<DailyTripInfo>().HasOne(d => d.MeterInfo).WithMany().HasForeignKey(d => d.MeterId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<DailyTripInfo>().HasOne(d => d.EmployeeInfo).WithMany().HasForeignKey(d => d.EmpId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
