import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import hotelService from '../services/hotels-service';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotels = await hotelService.getHotels(userId);
  return res.status(httpStatus.OK).send(hotels);
}
