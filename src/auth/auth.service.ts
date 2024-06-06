import { Injectable } from '@nestjs/common';
import { UserHelper } from 'src/helper/user.helper';
import { sign } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private userHelper: UserHelper) {}
  async validateUser(payload: any) {
    return await this.userHelper.findByPayload(payload);
  }
  async signPayload(payload: any) {
    return sign(payload, process.env.SECRET_KEY || 'mymine', { expiresIn: '12h' });
  }
}
