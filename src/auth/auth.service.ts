import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        //inject the jwt service
        private jwtService: JwtService,
        ) {}


    async signUp(authCredentialsDto : AuthCredentialsDto ): Promise<void> {
        // console.log('authCredentialsDto', authCredentialsDto);
        return  this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto : AuthCredentialsDto ): Promise<{accessToken: string}> {
        // console.log('authCredentialsDto', authCredentialsDto);
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        console.log('result', username);
        if (!username)
        {
            throw new UnauthorizedException('Invalid credentials');
        }
        //generate token
        const payload: JwtPayload = { username };//u can add more data to payload
        const accessToken = await this.jwtService.sign(payload);//cuz we inherit from jwtService
        console.log('accessToken', accessToken);
        //return the user and its token
        return  { accessToken } ;
    }


}
