using HSPA.Interfaces;
using HSPA.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPA.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;

        public UserRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<User> Authenticate(string userName, string password)
        {
            return await _db.Users.FirstOrDefaultAsync(f => f.UserName == userName && f.Password == password);
        }
    }
}
