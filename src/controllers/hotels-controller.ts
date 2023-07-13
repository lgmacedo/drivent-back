import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import hotelService from '../services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotels = await hotelService.getHotels(userId);
  return res.status(httpStatus.OK).send(hotels);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;
  const hotelIdNumber = parseInt(hotelId);
  if (isNaN(hotelIdNumber) || hotelIdNumber <= 0) return res.sendStatus(httpStatus.BAD_REQUEST);
  const hotel = await hotelService.getHotelById(userId, hotelIdNumber);
  return res.status(httpStatus.OK).send(hotel);
}
