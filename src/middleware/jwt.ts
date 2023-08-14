import { sign ,JsonWebTokenError, verify } from "jsonwebtoken";

const secretKey = 'my-jwt-secret'

export function generateToken ( payload:any ):string {
    
    const token = sign(payload, secretKey, { expiresIn: '1h'});
    return token
}

export function verifyToken(token:string) {
    try {
        const decoded = verify(token,secretKey);
        return decoded
    } catch (error) {
        throw new Error('invalid token')
    }
}