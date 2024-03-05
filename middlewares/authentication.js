const { validateToken } = require("../utils/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req, res, next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
         return  next();
        }

        try {
            // console.log('Received token:', tokenCookieValue);
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) { 
            console.log(error);
            console.error('Token validation error:', error);
        }
       return next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}