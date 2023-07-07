import { badRequestError, notFoundError, unauthorizedError } from '@/errors';
import { PaymentInfo } from '@/protocols';
import paymentRepository from '@/repositories/payment-repository';

async function getEnrollmentByPaymentTicketId(ticketId: number, userId: number) {
  const ticket = await paymentRepository.getTicketByPayment(ticketId);
  if (!ticket) throw notFoundError();
  const enrollment = await paymentRepository.getEnrollmentByTicket(ticket.enrollmentId);
  if (enrollment.userId !== userId) throw unauthorizedError();

  return { ticket, enrollment };
}

async function getTicketPayment(ticketId: any, userId: number) {
  if (!ticketId) throw badRequestError("Ticket ID wasn't sent");
  const ticketIdNumber = parseInt(ticketId);
  if (isNaN(ticketIdNumber) || ticketIdNumber <= 0) throw badRequestError("Ticket ID isn't valid");

  await getEnrollmentByPaymentTicketId(ticketIdNumber, userId);

  const payment = await paymentRepository.getTicketPayment(ticketIdNumber);
  if (!payment) throw notFoundError();
  return payment;
}

async function postPayment(PaymentInfo: PaymentInfo, userId: number) {
  const { ticket } = await getEnrollmentByPaymentTicketId(PaymentInfo.ticketId, userId);

  const ticketType = await paymentRepository.getTicketPrice(ticket.ticketTypeId);
  await paymentRepository.createNewPayment(PaymentInfo, ticketType.price);
  await paymentRepository.updateTicket(ticket.id);
  const payment = await paymentRepository.getTicketPayment(ticket.id);
  return payment;
}

const paymentsService = { getTicketPayment, postPayment };

export default paymentsService;
