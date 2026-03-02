import { z } from 'zod';

export const checkUserInfomation=z.object({
    userName:z.string().min(3,"userName must be atleast 3 characters"),
    email:z.string().email(),
    name:z.string().min(3,"name must be atleasr 3 characters"),
    password:z.string().min(2,"password must be atleast 4 characters"),
})










export const oldUserValidation=z.object({
    email:z.string().nonempty('email is required'),
    password:z.string().nonempty('password is required')
});