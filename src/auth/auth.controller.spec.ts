import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let userRepositoryMock: any;

  beforeEach(async () => {
    userRepositoryMock = {
      findOne: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '12h' },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a JWT when credentials are valid', async () => {
    userRepositoryMock.findOne.mockImplementation(() => Promise.resolve(new User({ password: 'test' })));
    const signInDto = { username: 'test', password: 'test' };
    const result = await controller.signIn(signInDto);
    expect(result).toHaveProperty('access_token');
    expect(typeof result.access_token).toBe('string');
  });

  it('should return user profile', async () => {
    const req = { user: { username: 'test', password: 'test' } };
    const result = await controller.getProfile(req);
    expect(result).toEqual(req.user);
  });
});
