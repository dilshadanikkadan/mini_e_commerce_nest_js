import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RegisterDTO } from 'src/auth/auth.dto';
export const app = `http://localhost:3000/api`;
describe('start ', () => {
  it('/ (GET)', () => {
    return request(app).get('/').expect(200).expect('Hello World!');
  });
});

describe('auth login',()=>{
  const user: RegisterDTO = {
    username: 'username',
    password: 'password',
    email:'test@gmail.com',
    isAdmin:false
  };
  it('Post',()=>{
    return request(app).post('/auth/register')
    .send(user)
    .expect(201)
  })
})

describe('auth login',()=>{
  const user: RegisterDTO = {
    username: 'username',
    password: 'password',
    email:'87436,m{{{@l;sa',
    isAdmin:false
  };
  it('Post',()=>{
    return request(app).post('/auth/register')
    .send(user)
    .expect(400)
  })
})
