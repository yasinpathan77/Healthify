using System.Text;
using Healthify.Database;
using Healthify.Models;
using Healthify.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace Healthify
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));

            services.AddAuthentication(
                option => {
                    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidAudience = Configuration["JWT:ValidAudience"],
                        ValidIssuer = Configuration["JWt:ValidIssuer"],
                        //RequireExpirationTime = 
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWt:Secret"])),
                    };
                });

            services.AddDbContext<HealthifyDbContext>(options => options.UseMySQL(Configuration.GetConnectionString("default")));

            services.AddIdentity<User_,IdentityRole>().AddEntityFrameworkStores<HealthifyDbContext>().AddDefaultTokenProviders();

            services.AddControllers().AddNewtonsoftJson();

            services.AddTransient<IUserRegister, UserRegister>();

            services.AddTransient<IAdminUser, AdminUser>();

            services.AddTransient<IUserEmail, UserEmail>();

            services.AddTransient<ITokenGeneration, TokenGeneration>();

            services.AddTransient<IUserClaimService, UserClaimService>();

            services.AddTransient<IDoctorRegistration, DoctorRegistration>();

            services.AddTransient<IFilesService, FilesService>();

            services.AddTransient<ISearchEngine, SearchEngine>();

            services.AddTransient<IDoctorPanel, DoctorPanel>();

            services.AddTransient<IAppointmentService,AppointmentService>();

            services.AddTransient<IUserPanelInterface, UserPanelService>();

            services.AddCors(options => { options.AddDefaultPolicy(bulder => { bulder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); }); });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles();

            app.UseStaticFiles();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
