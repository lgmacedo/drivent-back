import { prisma } from '../../config';

async function checkRoom(roomId: number) {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const roomRepository = { checkRoom };

export default roomRepository;
