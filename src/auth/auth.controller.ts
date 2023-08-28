import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

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
    : Promise<string> 
    {
        // console.log('authCredentialsDto', authCredentialsDto);
        return this.authService.signIn(
            authCredentialsDto 
        );
    }

}
