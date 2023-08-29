import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(//define arrow function
   
    (data, req):User => {
        return req.user;
    }   
);