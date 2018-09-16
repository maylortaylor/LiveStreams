using LiveStreams.IdentityServer.Models.Entities;
using AutoMapper;
using LiveStreams.IdentityServer.ViewModels;

namespace LiveStreams.IdentityServer.Models.Mappings
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, ApplicationUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}