import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/models/product.schema';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async create(productDTO: ProductDTO): Promise<any> {

    const product = await this.productModel.create({
      ...productDTO,
    });
    const savedProduct = await product.save();
    return savedProduct;
  } 
  
}
