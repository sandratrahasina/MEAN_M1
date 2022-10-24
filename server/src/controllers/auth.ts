import { Response, Request, RequestHandler } from 'express'
import {
  createUser,
  // returnUser,
  isUserExists,
  findUserByMail,
} from '../utils/functions'
import { comparePassword, tokenSign } from '../utils/tools'

export const signup: RequestHandler = async (req: Request, res: Response) => {
  const { userType } = req.params
  try {
    if (await isUserExists(userType, req.body.email)) {
      res.status(400).send('User already exists')
      return
    }

    const photoUrl =
      userType === 'admin'
        ? undefined
        : {
            originalname: (req as any).file.originalname,
            mimetype: (req as any).file.mimetype,
            buffer: (req as any).file.buffer,
          }
    const createdUser = await createUser(userType, {
      ...req.body,
      photoUrl,
    })
    // const returnedUser = returnUser(userType, createdUser)
    res.status(200).send({
      // user: returnedUser,
      user: createdUser,
      token: tokenSign({ userID: createdUser.id, userType }, '24h'),
    })
  } catch (error) {
    // TODO: don't forget to remove 'console.error' before send in prod
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(400).send(error)
  }
}

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { userType } = req.params
  const { email, motDePasse } = req.query
  try {
    const userFound = await findUserByMail(userType, email as string)
    if (!userFound) {
      res.status(400).send("User doesn't exists")
      return
    }
    if (
      await comparePassword(motDePasse as string, userFound.compte.motDePasse)
    ) {
      // const returnedUser = returnUser(userType, userFound)
      res.status(200).send({
        // user: returnedUser,
        user: userFound,
        token: tokenSign({ userID: userFound.id, userType }, '24h'),
      })
    } else res.status(400).send('Wrong Password')
  } catch (error) {
    // TODO: don't forget to remove 'console.error' before send in prod
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(400).send('Something went wrong, please verify your request')
  }
}
