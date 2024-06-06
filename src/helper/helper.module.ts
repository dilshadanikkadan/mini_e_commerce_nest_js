import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { UserHelper } from './user.helper';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [
      UserHelper
    ],
    exports: [UserHelper],
})
export class HelperModule {}
