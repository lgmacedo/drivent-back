import paymentsService from '@/services/payments-service';
import { AuthenticatedRequest } from '../middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const payment = await paymentsService.getTicketPayment(ticketId, req.userId);
  return res.status(httpStatus.OK).send(payment);
}
