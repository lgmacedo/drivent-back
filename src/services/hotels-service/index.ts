import hotelRepository from '../../repositories/hotel-repository';
import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { notFoundError, paymentRequiredError } from '../../errors';
import { TicketStatus } from '@prisma/client';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === TicketStatus.RESERVED || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();
  const hotels = await hotelRepository.getHotels();
  return hotels;
}

const hotelService = { getHotels };

export default hotelService;
