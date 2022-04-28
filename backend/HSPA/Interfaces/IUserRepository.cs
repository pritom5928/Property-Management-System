﻿using HSPA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPA.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string userName, string passwordText);

        void Register(string userName, string password);

        Task<bool> UserAlreadyExist(string userName);
    }
}
