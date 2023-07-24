import bookingsService from '@/services/booking-service/index';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors/not-found-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';
import { forbiddenError } from '@/errors/forbidden-error';
import faker from '@faker-js/faker';
import roomRepository from '@/repositories/room-repository';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('showing a booking', () => {
  it('should throw a 404 error when booking is not found', async () => {
    jest.spyOn(bookingRepository, 'getBookingByUserId').mockImplementationOnce((): any => {
      return undefined;
    });

    async function getBooking() {
      await bookingsService.getBooking(1);
    }

    expect(getBooking()).rejects.toEqual(notFoundError());
  });

  it('should return booking info when everything is ok', async () => {
    const Room = {
      id: 1,
      name: 'String',
      capacity: 1,
      hotelId: 1,
      createdAt: '24/07/2023',
      updatedAt: '24/07/2023',
    };

    const Booking = {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: '24/07/2023',
      updatedAt: '24/07/2023',
      Room,
    };

    jest.spyOn(bookingRepository, 'getBookingByUserId').mockImplementationOnce((): any => {
      return Booking;
    });

    const booking = await bookingsService.getBooking(1);

    expect(booking.id).toBe(1);
    expect(booking.Room).toBe(Room);
  });
});

describe('creating a booking', () => {
  it('should throw error 403 when user ticket is remote', () => {
    const Enrollment = {
      id: 1,
    };

    const Ticket = {
      status: TicketStatus.PAID,
      TicketType: {
        name: 'TicketType',
        isRemote: true,
        includesHotel: false,
      },
    };

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return Enrollment;
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce((): any => {
      return Ticket;
    });

    async function newBooking() {
      await bookingsService.newBooking(1, 1);
    }

    expect(newBooking()).rejects.toEqual(forbiddenError());
  });

  it("should throw error 403 when user ticket doesn't include hotel", () => {
    const Enrollment = {
      id: 1,
    };

    const Ticket = {
      status: TicketStatus.PAID,
      TicketType: {
        name: 'TicketType',
        isRemote: false,
        includesHotel: false,
      },
    };

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return Enrollment;
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce((): any => {
      return Ticket;
    });

    async function newBooking() {
      await bookingsService.newBooking(1, 1);
    }

    expect(newBooking()).rejects.toEqual(forbiddenError());
  });

  it("should throw error 403 when user ticket isn't paid", () => {
    const Enrollment = {
      id: 1,
    };

    const Ticket = {
      status: TicketStatus.RESERVED,
      TicketType: {
        name: 'TicketType',
        isRemote: false,
        includesHotel: true,
      },
    };

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockImplementationOnce((): any => {
      return Enrollment;
    });

    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockImplementationOnce((): any => {
      return Ticket;
    });

    async function newBooking() {
      await bookingsService.newBooking(1, 1);
    }

    expect(newBooking()).rejects.toEqual(forbiddenError());
  });
});

describe('changing a booking', () => {
  it("should throw error 403 when user doesn't have booking", async () => {
    jest.spyOn(bookingRepository, 'getBookingByUserId').mockImplementationOnce((): any => {
      return undefined;
    });

    async function changeBooking() {
      await bookingsService.changeBooking(1, 1, 1);
    }

    expect(changeBooking()).rejects.toEqual(forbiddenError());
  });

  it('should throw error 403 when room is full', async () => {
    jest.spyOn(bookingRepository, 'getBookingByUserId').mockImplementationOnce((): any => {
      return { id: 1 };
    });

    jest.spyOn(roomRepository, 'checkRoom').mockImplementationOnce((): any => {
      return {
        capacity: 3,
      };
    });

    jest.spyOn(bookingRepository, 'checkNumberOfBookingsByRoom').mockImplementationOnce((): any => {
      return 3;
    });

    async function changeBooking() {
      await bookingsService.changeBooking(1, 1, 1);
    }

    expect(changeBooking()).rejects.toEqual(forbiddenError());
  });

  it('should return status code 200 and bookingId when everything is ok', async () => {
    jest.spyOn(bookingRepository, 'getBookingByUserId').mockImplementationOnce((): any => {
      return { id: 1 };
    });

    jest.spyOn(roomRepository, 'checkRoom').mockImplementationOnce((): any => {
      return {
        capacity: 3,
      };
    });

    jest.spyOn(bookingRepository, 'checkNumberOfBookingsByRoom').mockImplementationOnce((): any => {
      return 2;
    });

    jest.spyOn(bookingRepository, 'changeRoomId').mockImplementationOnce((): any => {});

    await bookingsService.changeBooking(1, 1, 1);

    expect(bookingRepository.changeRoomId).toBeCalled();
  });
});
