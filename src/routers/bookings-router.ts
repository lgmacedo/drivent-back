import { Router } from 'express';

import { authenticateToken } from '../middlewares';
import { changeBooking, getBooking, newBooking } from '../controllers';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken);
bookingsRouter.get('/', getBooking);
bookingsRouter.post('/', newBooking);
bookingsRouter.put('/:bookingId', changeBooking);

export { bookingsRouter };
