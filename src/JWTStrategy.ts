import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './User/UserRepository';
import Container, { Inject } from 'typedi';

const userRepository:UserRepository = Container.get(UserRepository);
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwtSeretKey'
};
