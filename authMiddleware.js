import jwtService from 'jsonwebtoken';

const middleware = (req, res, next) => {
    const path = req.path;
    const method = req.method;
    let token = req.headers.authorization;

    const nonAuthorizedPaths = ["/api/user", "/api/user/login", "/api-docs"];

    if (nonAuthorizedPaths.includes(path) && method === "POST" || method === "GET") {
        return next();
    } else if (!token) {
        return res.status(401).json({ message: "Token não encontrado!" });
    } else {
        token = token.split(" ")[1];
    }

    try {
        const result = jwtService.verify(token, process.env.SECRET);

        if (result) {
            return next();
        }
    } catch (e) {
        return res.status(401).json({ message: e.message, content: e });
    }
}

export default middleware;