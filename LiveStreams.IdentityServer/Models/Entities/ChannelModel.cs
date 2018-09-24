using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace LiveStreams.IdentityServer.Models.Entities
{
    public class PersonModel
    {
        public string Id { get; set; }
        public string IdentityId { get; set; }
        public ApplicationUser Identity { get; set; }  // navigation property
        public string Gender { get; set; }
        public string Zipcode { get; set; }
        public string Location { get; set; }
        public string Locale { get; set; }
    }
}
