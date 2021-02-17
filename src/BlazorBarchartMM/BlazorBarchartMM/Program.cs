using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace BlazorBarchartMM
{
    public class Program
    {
		public static async Task Main(string[] args)
		{
            //await Task.Delay(3000);
			var builder = WebAssemblyHostBuilder.CreateDefault(args);
			builder.RootComponents.Add<App>("#app");

			builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

			builder.Logging.SetMinimumLevel(LogLevel.Debug);
			builder.Services.AddLogging();
			await builder.Build().RunAsync();
		}
    }
}
