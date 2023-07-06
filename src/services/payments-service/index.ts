import paymentRepository from '@/repositories/payment-repository';
import { badRequestError, notFoundError, unauthorizedError } from '../../errors';

async function getTicketPayment(ticketId: any, userId: number) {
  if (!ticketId) throw badRequestError("Ticket ID wasn't sent");
  const ticketIdNumber = parseInt(ticketId);
  if (isNaN(ticketIdNumber) || ticketIdNumber <= 0) throw badRequestError("Ticket ID isn't valid");
  const ticket = await paymentRepository.getTicketByPayment(ticketIdNumber);
  if(!ticket) throw notFoundError();
  const enrollment = await paymentRepository.getEnrollmentByTicket(ticket.enrollmentId);
  if (enrollment.userId !== userId) throw unauthorizedError();
  const payment = await paymentRepository.getTicketPayment(ticketIdNumber);
  if (!payment) throw notFoundError();
  return payment;
}

const paymentsService = { getTicketPayment };

export default paymentsService;
