import { model,Schema } from "mongoose"
import { IUser } from "utils/constants"
import bcrypt from "bcryptjs"

const userSchema = new Schema<IUser>({
    email: { type: "string", required: true,unique: true },
    password: {type: "string",required: true}
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    }
    next()
} )

const userModel = model('User', userSchema)

export default userModel