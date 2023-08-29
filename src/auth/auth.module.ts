import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    //passport module
    PassportModule.register({defaultStrategy: 'jwt'}),//defaultStrategy is a property of register method

    //jwt module
     JwtModule.register ({ //register is a static method of JwtModule class which takes an object as argument
      secret  :"topsecret5",//secret key -needs be more complex in real world
      signOptions: {
        expiresIn: 3600,//1 hour - after 1 hour token will expire
      },
     }),

    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy  
  ],
  exports: [//to be used as a middleware in other modules
    JwtStrategy,//export JwtStrategy to be used in other modules
    PassportModule,
  ],
})
export class AuthModule {}
