import { Joi } from "celebrate";

export interface User {
    id?: string;
    name?: string;
    email?: string;
}

export const newAuthSchema = Joi.object().keys({
    name: Joi.string().max(30).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(30).trim().required(),
});
