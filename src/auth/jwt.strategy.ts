import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {
    ExtractJwt,
    Strategy,
  } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest:
              ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: 'topsecret5',
          });
    }

    async validate(payload : JwtPayload): Promise<User>{//validate the token
        const {username} = payload;
        const user = await this.userRepository.findOne({where : {username}});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

    

}