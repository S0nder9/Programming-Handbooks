using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace JWTAUTH.Entities.Data
{
    public class UserDBContextFactory : IDesignTimeDbContextFactory<UserDBContext>
    {
        public UserDBContext CreateDbContext(string[] args)
        {
            Env.Load();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = configuration.GetConnectionString("UserDatabase")
                ?? throw new InvalidOperationException("Connection string 'UserDatabase' not configured.");

            var optionsBuilder = new DbContextOptionsBuilder<UserDBContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return new UserDBContext(optionsBuilder.Options);
        }
    }
}
