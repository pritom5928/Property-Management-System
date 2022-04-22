﻿using AutoMapper;
using HSPA.Data;
using HSPA.Data.Repo;
using HSPA.Dtos;
using HSPA.Interfaces;
using HSPA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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
        private readonly IMapper _mapper;

        public CityController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var cities = await _unitOfWork.CityRepository.GetCitiesAsync();

            var cityDtos = _mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(cityDtos);
        }


        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = _mapper.Map<City>(cityDto);

            _unitOfWork.CityRepository.AddCity(city);
            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto updateCityDto)
        {
            var getCity = await _unitOfWork.CityRepository.FindAsync(id);

            _mapper.Map(updateCityDto, getCity);

            await _unitOfWork.SaveAsync();

            return StatusCode(200);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFromdb = await _unitOfWork.CityRepository.FindAsync(id);

            cityToPatch.ApplyTo(cityFromdb, ModelState);

            await _unitOfWork.SaveAsync();

            return StatusCode(200);
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
