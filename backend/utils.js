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

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRECT || "BruhThisIsJustaSecretYouKnow", (err, decode) => {
            if (err) {
                req.stauts(401).send({ message: 'Invalid Token' });
            }
            else{
                req.user = decode;
                next();
            }
        });
    }
    else {
        req.status(401).send({ message: 'No Token' });
    }
};