using HSPA.Data;
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
        private readonly AppDbContext _db;
        public CityController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var cities = await _db.Cities.ToListAsync();
            return Ok(cities);
        }

        [HttpPost("{cityName}")]
        public async Task<IActionResult> AddCity(string cityName)
        {
            var city = new City
            {
                Name = cityName
            };

            await _db.Cities.AddAsync(city);
            await _db.SaveChangesAsync();

            return Ok(city);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {

            await _db.Cities.AddAsync(city);
            await _db.SaveChangesAsync();

            return Ok(city);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _db.Cities.FindAsync(id);

            _db.Cities.Remove(city);
            await _db.SaveChangesAsync();

            return Ok(id);
        }
    }
}
