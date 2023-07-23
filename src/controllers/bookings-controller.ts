import { AuthenticatedRequest } from '../middlewares';
import { Response } from 'express';
import bookingsService from '../services/bookings-service';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const booking = await bookingsService.getBooking(userId);

  return res.status(httpStatus.OK).send(booking);
}

export async function newBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const roomId = req.body.roomId as number;
  const newBooking = await bookingsService.newBooking(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: newBooking.id });
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const roomId = req.body.roomId as number;
  const bookingId = parseInt(req.params.bookingId);
  await bookingsService.changeBooking(userId, roomId, bookingId);

  return res.status(httpStatus.OK).send({ bookingId });
}
