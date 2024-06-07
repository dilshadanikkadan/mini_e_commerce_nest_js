import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('i reached inside the admin ');

    const user = request.user;
    if (user.isAdmin) return true;

    throw new UnauthorizedException('you are not an admin');
  }
}
