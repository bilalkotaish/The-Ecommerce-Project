const User = require("./../db/Users")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

async function registerUser(model) {
    const hashPassword = await bcrypt.hash(model.password,10)
    let user=new User({
        name:model.name,
        email:model.email,
        password:hashPassword,
    })
    await user.save()

}
async function loginUser(model) {
    // Find the user by email
    const user = await User.findOne({ email: model.email });
    
    // If no user is found, return null
    if (!user) {
        return null;
    }

    // Compare the provided password with the stored hashed password
    const isMatched = await bcrypt.compare(model.password, user.password);
    
    // If passwords match, generate a token
    if (isMatched) {
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin:user.isAdmin
            },
            "secret", // Use a strong secret from environment variables in production
            {
                expiresIn: "1h"
            }
        );

        // Return the token and user details
        return { token, user };
    } else {
        return null;
    }
}
module.exports={registerUser,loginUser}