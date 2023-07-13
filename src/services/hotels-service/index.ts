import { TicketStatus } from '@prisma/client';
import hotelRepository from '../../repositories/hotel-repository';
import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { notFoundError, paymentRequiredError } from '../../errors';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === TicketStatus.RESERVED || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();
  const hotels = await hotelRepository.getHotels();
  if (!hotels.length) throw notFoundError();
  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === TicketStatus.RESERVED || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequiredError();
  const hotel = await hotelRepository.getHotelById(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

const hotelService = { getHotels, getHotelById };

export default hotelService;
