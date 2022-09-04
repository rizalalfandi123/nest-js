import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { SignUpDto } from '../dto';
import { PrismaService } from '../prisma';

const argon2 = require('argon2');

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUpDto) {
    const { password } = dto;

    // TODO: generate the  password hash
    const hash = await argon2.hash(password, { hashLength: 50 });
    delete dto.password;

    // TODO: save user data to database
    try {
      const user = await this.prisma.user.create({
        data: {
          hash,
          ...dto,
        },
      });

      // TODO: response with email and name
      return {
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ForbiddenException(`Credential Taken ${error.meta?.target}`);
      }

      return error;
    }
  }

  signin() {
    return {
      message: 'sign up',
    };
  }
}
