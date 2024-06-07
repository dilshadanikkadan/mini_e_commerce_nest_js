import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AdminGuard } from 'src/guard/admin.guard';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/protect')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  route(@Res() res: Response) {
    res.json('this is protected route');
  }

  @Post('addProduct')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async addProduct(@Body() productDTO: ProductDTO) {
    return await this.productService.create(productDTO);
  }
}
