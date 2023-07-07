import { TicketStatus } from '@prisma/client';
import { PaymentInfo } from '@/protocols';
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

async function getTicketPrice(ticketId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function createNewPayment(PaymentInfo: PaymentInfo, price: number) {
  return prisma.payment.create({
    data: {
      ticketId: PaymentInfo.ticketId,
      value: price,
      cardIssuer: PaymentInfo.cardData.issuer,
      cardLastDigits: PaymentInfo.cardData.number.toString().slice(-4),
    },
  });
}

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const paymentRepository = {
  getTicketPayment,
  getTicketByPayment,
  getEnrollmentByTicket,
  createNewPayment,
  getTicketPrice,
  updateTicket,
};

export default paymentRepository;
