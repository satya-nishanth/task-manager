import { Request, Router } from "express"
import userModel from "model/user"
import { IUser, JWT_SECRET } from "utils/constants"
import jwt from "jsonwebtoken"
import bycrypt from "bcryptjs"
import { authenticateUser } from "utils/middlewares"
const router = Router()


router.post("/register", async (req: Request<{}, {}, IUser>, res) => {
    try {
        const { email, password } = req.body
        const user = new userModel({ email, password })
        await user.save()
        const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET!)
        req.session = { token }
        return res.status(201).json(user)
    }
    catch (error:any) {
        res.status(500).json({ error: error?.message })
  }  
})

router.post('/login', async (req: Request<{}, {}, IUser>, res) => {
    try {
       const { email, password } = req.body;
       const user = await userModel.findOne({ email });
       if (!user) {
         throw new Error('user not found');
       }
        
        const isPasswordMatched = await bycrypt.compare(password, user.password)
        
        if (!isPasswordMatched) {
            throw new Error("invalid password")
        }
        
       const token = jwt.sign(
         { _id: user._id, email: user.email },
         JWT_SECRET!
       );
       req.session = { token };
       return res.status(200).json(user);
    
  } catch (error:any) {
        res.status(500).send({ error: error?.message })
  }  
 
});

router.get('/',authenticateUser, async (req, res) => {
  return res.send({user: req.user});
});

router.get('/logout', async (req, res) => {
  req.session = null;
  return res.send({});
});


export default router