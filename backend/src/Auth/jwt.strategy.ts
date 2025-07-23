import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
   super({
  jwtFromRequest: (req) => {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    return token;
  },
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET || 'mysecret',
});
  }


async validate(payload: any) {

  if (!payload?.userId) throw new Error('User ID missing in JWT payload');
  return { userId: payload.userId, email: payload.email }; 
}
  }
