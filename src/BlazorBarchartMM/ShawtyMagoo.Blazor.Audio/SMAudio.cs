using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace ShawtyMagoo.Blazor.Audio
{
    public class SMAudio 
    {
        public event EventHandler<short[]> OnGotFrequencyData;        

        [JSInvokable("Analyse")]
        public Task AnalyseFrequencies(short[] values)
        {
            RaiseGotFrequencyDataEvent(values);
            return Task.CompletedTask;
        }

        private void RaiseGotFrequencyDataEvent(short[] values)
        {
            var handler = OnGotFrequencyData;
            if (handler is object)
            {
                handler.Invoke(this, values);
            }
        }

        public async Task Play(IJSRuntime runtime, string filename)
        {
            await runtime.InvokeAsync<object>($"window.{nameof(SMAudio)}.playAndAnalyse", filename, new DotNetObjectRef(this));
        }

        public async Task Stop(IJSRuntime runtime)
        {
            await runtime.InvokeAsync<object>($"window.{nameof(SMAudio)}.stopAudio");
        }
    }
}
