import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('product')
export class ProductController {

    @Get('/protect')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    route(@Res() res: Response) {
        res.json('this is protected route');
    }
}
