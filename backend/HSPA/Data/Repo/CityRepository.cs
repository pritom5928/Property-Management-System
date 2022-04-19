using HSPA.Interfaces;
using HSPA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPA.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private AppDbContext _db;
        public CityRepository(AppDbContext db)
        {
            _db = db;
        }

        public void AddCity(City city)
        {
            _db.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = _db.Cities.Find(cityId);
            _db.Cities.Remove(city);

        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _db.Cities.ToListAsync();
        }

    }
}
