import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotelWithRooms() {
  const hotel = {
    name: faker.company.companyName(),
    image: faker.image.imageUrl(),
    Rooms: generateRooms(),
  };

  return await prisma.hotel.create({
    data: {
      name: hotel.name,
      image: hotel.image,
      Rooms: {
        createMany: {
          data: hotel.Rooms,
        },
      },
    },
  });
}

function generateRooms() {
  const numRooms = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  const rooms = [];

  for (let i = 0; i < numRooms; i++) {
    const room = {
      name: faker.random.word(),
      capacity: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
    };

    rooms.push(room);
  }

  return rooms;
}
