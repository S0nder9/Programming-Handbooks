using Microsoft.EntityFrameworkCore;

namespace JWTAUTH.Entities.Data
{
    public class UserDBContext (Microsoft.EntityFrameworkCore.DbContextOptions<UserDBContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
    }
}
