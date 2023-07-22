import { prisma } from '../../config';

async function getBookingByUserId(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function createNewBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function checkNumberOfEnrollmentsByRoom(roomId: number) {
  return await prisma.booking.count({
    where: {
      roomId,
    },
  });
}

async function changeRoomId(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

const bookingRepository = { getBookingByUserId, createNewBooking, checkNumberOfEnrollmentsByRoom, changeRoomId };

export default bookingRepository;
