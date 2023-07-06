import { prisma } from '@/config';

async function getTicketPayment(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id,
    },
  });
}

async function getTicketByPayment(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function getEnrollmentByTicket(enrollmentId: number) {
    return prisma.enrollment.findFirst({
      where: {
        id: enrollmentId,
      },
    });
}

const paymentRepository = { getTicketPayment, getTicketByPayment, getEnrollmentByTicket };

export default paymentRepository;
