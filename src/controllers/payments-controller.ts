import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { PaymentInfo } from '@/protocols';
import paymentsService from '@/services/payments-service';

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const payment = await paymentsService.getTicketPayment(ticketId, req.userId);
  return res.status(httpStatus.OK).send(payment);
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const PaymentInfo = req.body as PaymentInfo;
  const payment = await paymentsService.postPayment(PaymentInfo, req.userId);
  return res.status(httpStatus.OK).send(payment);
}
