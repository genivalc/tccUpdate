import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { VALIDATORS_ERRORS } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private prisma: PrismaService) {
        super({
            secretOrKey: "E2Fs#6xex#Uq7upHDrkj",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })
    }
    async validate(payload): Promise<User> {
        const { email } = payload;
        const user = await this.prisma.users.findUnique({ where: { email } })
        if (!user) {
            throw new HttpException(VALIDATORS_ERRORS.UNAUTHORIZED, 400);
        }
        return user;
    }
}
