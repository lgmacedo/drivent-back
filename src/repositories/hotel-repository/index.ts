import { prisma } from '../../config';

async function getHotels() {
  return prisma.hotel.findMany();
}

const hotelRepository = { getHotels };

export default hotelRepository;
