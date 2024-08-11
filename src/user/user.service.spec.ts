import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@example.com',
        name: 'Test User',
      };
      const createdUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
      };

      jest.spyOn(prisma.user, 'create').mockResolvedValue(createdUser);

      const result = await service.createUser(userData);

      expect(result).toEqual(createdUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
    });

    it('should throw an error if user with the email already exists', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@example.com',
        name: 'Test User',
      };
      jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('User already exists'));

      await expect(service.createUser(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 1;
      const updatedData: Prisma.UserUpdateInput = {
        email: 'updated@example.com',
        name: 'Updated User',
      };
      const updatedUser = {
        id: userId,
        email: 'updated@example.com',
        name: 'Updated User',
        createdAt: new Date(),
      };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);

      const result = await service.updateUser(userId, updatedData);

      expect(result).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updatedData,
      });
    });

    it('should throw an error if the database is unreachable when updating a user', async () => {
      const userId = 1;
      const updatedData: Prisma.UserUpdateInput = {
        email: 'updated@example.com',
        name: 'Updated User',
      };

      jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('Database unreachable'));

      await expect(service.updateUser(userId, updatedData)).rejects.toThrow('Database unreachable');
    });
  });

  describe('getUser', () => {
    it('should retrieve a user by ID', async () => {
      const userId = 1;
      const user = {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);

      const result = await service.getUser(userId);

      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
    });

    it('should throw an error if the database is unreachable when retrieving a user by ID', async () => {
      const userId = 1;

      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Database unreachable'));

      await expect(service.getUser(userId)).rejects.toThrow('Database unreachable');
    });
  });

  describe('getUsers', () => {
    it('should retrieve all users', async () => {
      const users = [
        { id: 1, email: 'user1@example.com', name: 'User One', createdAt: new Date() },
        { id: 2, email: 'user2@example.com', name: 'User Two', createdAt: new Date() },
      ];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);

      const result = await service.getUsers();

      expect(result).toEqual(users);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });

    it('should throw an error if the database is unreachable when retrieving users', async () => {
      jest.spyOn(prisma.user, 'findMany').mockRejectedValue(new Error('Database unreachable'));

      await expect(service.getUsers()).rejects.toThrow('Database unreachable');
    });
  });

  describe('Jest Features', () => {
    it('should spy on the PrismaService create method', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@example.com',
        name: 'Test User',
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
      };

      jest.spyOn(prisma.user, 'create').mockResolvedValue(user);
      const createUserSpy = jest.spyOn(prisma.user, 'create');

      await service.createUser(userData);

      expect(createUserSpy).toHaveBeenCalledWith({ data: userData });
    });
  });
});
