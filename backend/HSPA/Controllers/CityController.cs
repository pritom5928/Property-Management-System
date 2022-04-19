using HSPA.Data;
using HSPA.Data.Repo;
using HSPA.Dtos;
using HSPA.Interfaces;
using HSPA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPA.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CityController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var cities = await _unitOfWork.CityRepository.GetCitiesAsync();
            return Ok(cities);
        }


        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = new City
            {
                Name = cityDto.Name
            };

             _unitOfWork.CityRepository.AddCity(city);
            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
             _unitOfWork.CityRepository.DeleteCity(id);

            await _unitOfWork.SaveAsync();

            return Ok(id);
        }
    }

}
