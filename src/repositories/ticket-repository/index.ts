import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getEnrollmentByUser(id: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId: id,
    },
  });
}

async function getTicketByEnrollment(id: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id,
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function createNewTicket(ticketTypeId: number, enrollmentId: number){
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId,
      enrollmentId,
    }
  });
}

const ticketRepository = { getTicketTypes, getEnrollmentByUser, getTicketByEnrollment, createNewTicket };

export default ticketRepository;
