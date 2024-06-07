import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICart } from 'src/models/cart.schema';
import { CartDTO } from './cart.dto';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<ICart>) {}

  async createCart(cartData: any) {
    const { userId,items } = cartData;
     if (!items || items.length === 0) {
      throw new Error('Items array must have at least one item.');
    }

    const userHaveCart = await this.cartModel.findOne({ userId });
    if (userHaveCart) {
      userHaveCart.items.push(items[0]);
      const updatedCart = await userHaveCart.save();
      return updatedCart;
    } else {
      const createCart = await this.cartModel.create({
        ...cartData,
      });
      return createCart;
    }
  }

 async getCartDetails(id:string){
      const  userCart= await this.cartModel.findOne({userId:id}).populate( "items.productId");
      return userCart;
  }
}
