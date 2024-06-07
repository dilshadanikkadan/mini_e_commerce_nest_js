import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HelperModule } from 'src/helper/helper.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [HelperModule],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy]
})
export class AuthModule {

}
