import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(_req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketTypes();
  return res.status(httpStatus.OK).send(ticketTypes);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const ticket = await ticketsService.getTicket(req.userId);
  return res.status(httpStatus.OK).send(ticket);
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body.ticketTypeId as number;
  const newTicket = await ticketsService.newTicket(ticketTypeId, req.userId);
  return res.status(httpStatus.CREATED).send(newTicket);
}
