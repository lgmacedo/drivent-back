import Joi from 'joi';
import { CardData, PaymentInfo } from '@/protocols';

export const paymentInfoSchema = Joi.object<PaymentInfo>({
  ticketId: Joi.number().required(),
  cardData: Joi.object<CardData>({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(),
});
