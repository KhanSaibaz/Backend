import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const LoginSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

LoginSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {email: this.email },
        "saibazKhan",  
        { expiresIn: "1h" }
    );
};

const Login = mongoose.model("Login", LoginSchema);

export default Login;  
