import { prisma } from '../../config';

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getHotelById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = { getHotels, getHotelById };

export default hotelRepository;
