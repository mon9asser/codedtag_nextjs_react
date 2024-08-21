const { verifyToken } = require('./../secure/auth');

// Middleware for hash request (token and API)
var middlewareTokens = (req, res, next) => {
     
    const notAuthed = ['/api/hash-request', '.xml', '.txt'];
    const isNotAuthed = notAuthed.some(path => req.path.includes(path));

    if (!isNotAuthed) {
        return verifyToken(req, res, next);
    } 
    
    next();

};


module.exports = { middlewareTokens };