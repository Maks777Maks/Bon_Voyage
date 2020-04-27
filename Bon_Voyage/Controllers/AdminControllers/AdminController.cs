﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bon_Voyage.MediatR.Client.Queries.GetAllClients;
using Bon_Voyage.MediatR.Client.ViewModels;
using Bon_Voyage.MediatR.Hotel.Queries.GetAllHotels;
using Bon_Voyage.MediatR.Hotel.ViewModels;
using Bon_Voyage.MediatR.Manager.Commands.CreateManager;
using Bon_Voyage.MediatR.Manager.Queries.GetAllManagersQuery;
using Bon_Voyage.MediatR.Manager.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bon_Voyage.Controllers.AdminControllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : ApiController
    {
        [HttpPost("CreateManager")]
        public async Task<IActionResult> CreateManager (CreateManagerCommand command)
        {
            var result = await Mediator.Send(command);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("GetAllManagers")]
        public async Task<ActionResult<ICollection<ManagerViewModel>>> GetAllManagers()
        {
            var res = await Mediator.Send(new GetAllManagersQuery());//calls a mediator's command
            return Ok(res);
        }

        [HttpGet("GetAllHotels")]
        public async Task<ActionResult<ICollection<HotelViewModel>>> GetAllHotels()
        {
            var res = await Mediator.Send(new GetAllHotels());//calls a mediator's command
            return Ok(res);
        }

        [HttpGet("GetAllClients")]
        public async Task<ActionResult<ICollection<ClientViewModel>>> GetAllClients()
        {
            var res = await Mediator.Send(new GetAllClients());//calls a mediator's command
            return Ok(res);
        }
    }
}