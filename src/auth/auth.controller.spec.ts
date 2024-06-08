import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserHelper } from 'src/helper/user.helper';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let helper :UserHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide:UserHelper,
          useValue:{
            createUser:jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const loginDto = { username: 'dilshad', password: 'dilshad4321', email: 'dilshad@gmail.com' };
      await controller.login(loginDto);
      expect(helper.createUser).toHaveBeenCalledWith(loginDto);
    });
  });


});
