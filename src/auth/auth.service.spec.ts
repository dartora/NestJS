import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService; // Add this line



  const userRepositoryMock = {
    findOne: jest.fn().mockImplementation(() => Promise.resolve(new User())),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService, {
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

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService); // Add this line

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('signIn', () => {

    it('should return a JWT when credentials are valid', async () => {
      userRepositoryMock.findOne.mockImplementation(() => Promise.resolve(new User({ password: 'test' })));
      //console.log(jwtService); // Add this line
      const result = await service.signIn('test', 'test');
      expect(result).toHaveProperty('access_token');
      expect(typeof result.access_token).toBe('string');
    });


    it('should throw UnauthorizedException when credentials are invalid', async () => {
      userRepositoryMock.findOne.mockImplementation(() => Promise.resolve(null));
      await expect(service.signIn('test', 'test')).rejects.toThrow(UnauthorizedException);
    });
  });

});
