import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.AUTHORIZATION_ISSUER_URI,
  clientId: process.env.CLIENT_ID
})

export function unless(path: string, middleware: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith(path)) return next();
    return middleware(req, res, next);
  };
};

async function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      next(new HttpException(401, 'You must send an Authorization header'));
    }
    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') {
      next(new HttpException(401, 'Expected a Bearer token'));
    }
    const { claims } = await oktaJwtVerifier.verifyAccessToken(token, 'api://default')
    if (!claims.scp.includes(process.env.SCOPE)) {
      next(new HttpException(401, 'Could not verify the proper scope'));
    }
    next();
  } catch (error) {
    console.log("error", error)
    next(error.message);
  }
}

export default authorizationMiddleware;