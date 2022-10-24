import express from 'express'
import multer from 'multer'
import { login, signup } from '../controllers/auth'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/signup/:userType', upload.single('photo'), signup)
router.get('/login/:userType', login)

export default router
