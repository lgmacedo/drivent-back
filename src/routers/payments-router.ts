import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getTicketPayment } from '../controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', getTicketPayment);
    
export { paymentsRouter };
