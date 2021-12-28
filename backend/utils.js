import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    };
    const options = {
        expiresIn: '30d'
    };
    return jwt.sign(payload, process.env.JWT_SECRECT || "BruhThisIsJustaSecretYouKnow", options);
};