import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './auth.dto';
import { UserHelper } from 'src/helper/user.helper';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private UserHelper: UserHelper,private authService:AuthService) {}
  @Post('/register')
  async register(@Body() registerDto: RegisterDTO) {
    const user = await this.UserHelper.createUser(registerDto);
    const payload: any = {
      email: user.email,
      _id: user._id,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
