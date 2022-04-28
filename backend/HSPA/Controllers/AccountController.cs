using HSPA.Dtos;
using HSPA.Interfaces;
using HSPA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HSPA.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public AccountController(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LogInReqDto logInReqDto)
        {
            var user = await _unitOfWork.UserRepository.Authenticate(logInReqDto.UserName, logInReqDto.Password);

            if (user == null || user.PasswordKey == null)
                return Unauthorized();

            var userResponse = new LogInResDto
            {
                UserName = user.UserName,
                Token = CreateJWT(user)
            };

            return Ok(userResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Register(LogInReqDto logInReqDto)
        {
            if (string.IsNullOrEmpty(logInReqDto.UserName))
                return BadRequest("Username required");

            if (await _unitOfWork.UserRepository.UserAlreadyExist(logInReqDto.UserName))
                return BadRequest("User already exists, Please try something else");

            _unitOfWork.UserRepository.Register(logInReqDto.UserName, logInReqDto.Password);

            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        private string CreateJWT(User user)
        {
            var secretKey = _configuration.GetSection("AppSetting:SecretKey").Value;
            //generate secret key for token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));


            //add user details as claims for token payload info
            var claims = new Claim[]
            {
                 new Claim(ClaimTypes.Name, user.UserName),
                 new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            //define algorithm with key and generate sign-in credentials
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);


            //create necessary info with claims, sign-in credentials and other stuffs
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = signingCredentials
            };

            //create token by jwt token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
