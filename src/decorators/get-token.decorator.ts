import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const [_, token] = authorizationHeader.split(' ');
      return token;
    }

    return null;
  },
);
