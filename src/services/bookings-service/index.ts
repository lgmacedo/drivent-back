import { forbiddenError, notFoundError, unauthorizedError } from '../../errors';
import bookingRepository from '../../repositories/booking-repository';
import enrollmentRepository from '../../repositories/enrollment-repository';
import roomRepository from '../../repositories/room-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking) throw notFoundError();

  return {
    id: booking.id,
    Room: booking.Room,
  };
}

async function newBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === TicketStatus.RESERVED) {
    throw forbiddenError();
  }

  const room = await roomRepository.checkRoom(roomId);
  if (!room) throw notFoundError();

  const roomSpotsTaken = await bookingRepository.checkNumberOfBookingsByRoom(roomId);
  if (roomSpotsTaken === room.capacity) throw forbiddenError();

  const newBooking = await bookingRepository.createNewBooking(userId, roomId);
  return newBooking;
}

async function changeBooking(userId: number, roomId: number, bookingId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking) throw forbiddenError();

  if (booking.userId !== userId) throw unauthorizedError();

  const room = await roomRepository.checkRoom(roomId);
  if (!room) throw notFoundError();

  const roomSpotsTaken = await bookingRepository.checkNumberOfBookingsByRoom(roomId);
  if (roomSpotsTaken === room.capacity) throw forbiddenError();

  await bookingRepository.changeRoomId(bookingId, roomId);
}

const bookingsService = { getBooking, newBooking, changeBooking };

export default bookingsService;
