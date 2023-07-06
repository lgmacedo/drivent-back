import ticketRepository from '@/repositories/ticket-repository';
import { badRequestError, notFoundError } from '@/errors';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  return ticketTypes;
}

async function checkEnrollmentAndTicket(id: number) {
  const enrollment = await ticketRepository.getEnrollmentByUser(id);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketRepository.getTicketByEnrollment(enrollment.id);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function getTicket(id: number) {
  const ticket = await checkEnrollmentAndTicket(id);
  return ticket;
}

async function newTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId || isNaN(ticketTypeId) || ticketTypeId <= 0) throw badRequestError('Ticket Type is not valid!');
  const enrollment = await ticketRepository.getEnrollmentByUser(userId);
  if (!enrollment) throw notFoundError();
  await ticketRepository.createNewTicket(ticketTypeId, enrollment.id);
  return await ticketRepository.getTicketByEnrollment(enrollment.id);
}

const ticketsService = { getTicketTypes, getTicket, newTicket };

export default ticketsService;
