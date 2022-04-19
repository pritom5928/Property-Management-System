﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HSPA.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepository CityRepository  { get; }

        Task<bool> SaveAsync();
    }
}
