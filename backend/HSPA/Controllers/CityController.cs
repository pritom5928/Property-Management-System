using HSPA.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult GetAll()
        {
            var cities = _db.Cities.ToList();
            return Ok(cities);
        }

    }
}
