import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PostgresErrorCode } from '@/app/common/enum/postgres-error-code.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async loginViaGoogle(data) {
    try {
      let user = await this.userRepository.findOne({
        where: { googleId: data.user.id },
      });

      if (!user) {
        user = await this.userRepository.save({
          googleId: data.user.id,
          email: data.user.email,
        });
      }

      return this.getToken(user.id, user.email);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        console.log("User already exists, didn't create new ");
        return this.getToken(data.user.id, data.user.email);
      }
    }
  }

  async getToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { access_token: token };
  }
}
