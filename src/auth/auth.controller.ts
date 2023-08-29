import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(
        @Body() authCredentialsDto : AuthCredentialsDto //cast Body to AuthCredentialsDto
    )
    : Promise<void> 
    {
        // console.log('authCredentialsDto', authCredentialsDto);
        return this.authService.signUp(
            authCredentialsDto 
        );
    }

    @Post('/signin')
    signIn(
        @Body() authCredentialsDto : AuthCredentialsDto //cast Body to AuthCredentialsDto
    )
    : Promise<{accessToken: string}>
    {
        // console.log('authCredentialsDto', authCredentialsDto);
        return this.authService.signIn(
            authCredentialsDto 
        );
    }

    //test
    @Post('/test')
    @UseGuards(AuthGuard())
    test(
        // @GetUser() user: User
        @Req() req
        ){
        console.log('Req', req);
        return req.user;
    }

}
