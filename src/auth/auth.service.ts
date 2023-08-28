import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        ) {}


    async signUp(authCredentialsDto : AuthCredentialsDto ): Promise<void> {
        // console.log('authCredentialsDto', authCredentialsDto);
        return  this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto : AuthCredentialsDto ): Promise<string> {
        // console.log('authCredentialsDto', authCredentialsDto);
        const result = await this.userRepository.validateUserPassword(authCredentialsDto);
        console.log('result', result);
        return result;
    }


}
