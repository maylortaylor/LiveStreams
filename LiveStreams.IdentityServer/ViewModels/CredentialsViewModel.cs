using LiveStreams.IdentityServer.ViewModels.Validations;
// using FluentValidation.Attributes;

namespace LiveStreams.IdentityServer.ViewModels
{
    // [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}