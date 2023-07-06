import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getTicketTypes, getTickets, postTicket } from '../controllers';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get("/types", getTicketTypes)
    .get("/", getTickets)
    .post("/", postTicket);
    
export { ticketsRouter };
