import { HttpException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VALIDATORS_ERRORS } from 'src/other/constants/constants';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async login(authDto: AuthDto) {
    const { email, password } = authDto
    const JWT_SECRET = "E2Fs#6xex#Uq7upHDrkj"
    try {
      const user = await this.prisma.users.findUnique({ where: { email } })
      if (!user) {
        throw new HttpException(VALIDATORS_ERRORS.NOT_FOUND, 404);
      }

      const canLogin = () => (
        user.email === email &&
        user.password === password
      )

      if (!canLogin()) {
        throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 401);
      }

      const commonParamenters = { id: user.id, email: user.email, name: user.name }
      return this.encryptJwt(commonParamenters, JWT_SECRET)
    } catch {
      console.error('Error in encryptJwt')
      throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 401);
    }
  }

  async encryptJwt(commonParamenters, privateKey) {
    try {
      return sign(commonParamenters, privateKey)
    } catch (error) {
      console.error('error in sign auth', error)
      throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 400);
    }
  }

}
