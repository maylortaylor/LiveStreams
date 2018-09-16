using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.Extensions.Configuration;

namespace LiveStreams.IdentityServer
{
    public class Config
    {
        // An identity resource allows you to model a scope that will return a certain set of claims
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource> {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource {
                    Name = "role",
                    UserClaims = new List<string> {"role"}
            }
        };
        }

        // An API resource scope allows you to model access to a protected resource (typically an API)
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource> {
                new ApiResource {
                    Name = "LiveStreams.Api",
                    DisplayName = "My API",
                    Description = "Custom API Access",
                    UserClaims = new List<string> {"role"},
                    ApiSecrets = new List<Secret> {new Secret("scopeSecret".Sha256())},
                    Scopes = new List<Scope> {
                        new Scope("LiveStreams.Api.read"),
                        new Scope("LiveStreams.Api.write")
                    }
                }
            };
        }

        public static List<TestUser> GetTestUsers()
        {
            return new List<TestUser> {
            new TestUser {
                SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
                Username = "maylor",
                Password = "Pa55word",
                Claims = new List<Claim> {
                    new Claim(JwtClaimTypes.Email, "maylortaylor@gmail.com"),
                    new Claim(JwtClaimTypes.Role, "admin")
                }
            }
        };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients(IConfiguration configuration)
        {
            // client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientId = "clientApp",

                    ClientName = "Example Client",

                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = new List<string> { "LiveStreams.Api" }
                },

                // OpenID Connect implicit flow client (MVC)
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,

                    RequireConsent = true,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    RedirectUris = { $"{configuration["ClientAddress"]}/signin-oidc" },
                    PostLogoutRedirectUris = { $"{configuration["ClientAddress"]}/signout-callback-oidc" },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "LiveStreams.Api"
                    },
                    AllowOfflineAccess = true
                },

                // OpenID Connect implicit flow client (Angular)
                new Client
                {
                    ClientId = "openIdConnectClient",
                    ClientName = "Angular Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = true,

                    RedirectUris = new List<string> { $"{configuration["ClientAddress"]}/signin-oidc" },
                    PostLogoutRedirectUris = new List<string>  { $"{configuration["ClientAddress"]}/home" },
                    AllowedCorsOrigins = { configuration["ClientAddress"] },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "role",
                        "LiveStreams.Api.write",
                    },

                }

            };
        }
    }
}