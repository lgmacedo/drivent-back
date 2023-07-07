import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getTicketTypes, getTickets, postTicket } from '../controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/types', getTicketTypes);
ticketsRouter.get('/', getTickets);
ticketsRouter.post('/', postTicket);

export { ticketsRouter };
