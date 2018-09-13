using System.Threading.Tasks;

namespace LiveStreams.IdentityServer.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
