import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { BCRYPT_SALT_ROUND } from './consts'

dotenv.config()

export async function hashPassword(password: string) {
  try {
    return bcrypt.hash(password, BCRYPT_SALT_ROUND)
  } catch (error) {
    throw new Error(`Bcrypt encryption error:\n${error}`)
  }
}

export async function comparePassword(input: string, encrypted: string) {
  try {
    return bcrypt.compare(input, encrypted)
  } catch (error) {
    throw new Error(`Bcrypt compare error:\n${error}`)
  }
}

export function tokenSign(
  payload: string | object | Buffer,
  expiresIn: string | number
) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY || 'TOKEN_SECRET_KEY', {
    expiresIn,
    algorithm: 'HS512',
  })
}

export function tokenVerify(token: string) {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY || 'TOKEN_SECRET_KEY', {
    algorithms: ['HS512'],
  })
}
