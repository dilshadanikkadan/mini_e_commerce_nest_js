import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartDTO } from './cart.dto';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/addToCart')
  async addToCart(@Body() cartDto: CartDTO) {
    return await this.cartService.createCart(cartDto);
  }

  @Get('getCart/:id')
  @UseGuards(AuthGuard('jwt'))
  async getCart(@Param('id') id: string) {
    return await this.cartService.getCartDetails(id);
  }
}
