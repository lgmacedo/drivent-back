import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { getTicketPayment, postPayment } from '../controllers/payments-controller';
import { paymentInfoSchema } from '../schemas';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', getTicketPayment);
paymentsRouter.post('/process', validateBody(paymentInfoSchema), postPayment);

export { paymentsRouter };
