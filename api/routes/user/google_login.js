const express = require('express');
const router = express.Router();
const { USER_GOOGLE_ID, USER_GOOGLE_SECRET, GOOGLE_PUBLIC_KEY, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const argon = require('argon2');
const { User } = require('../../models/models');
const { normalizeUsers } = require('../../controller/normalize');
const { htmlReplacer, transportEmail } = require('../../controller/emailUtils');
const fs = require('fs');
const { getGoogleAuthUrl, getTokens } = require('../../controller/mediaAuth');

router.get('/auth/google/url', async (req, res, next) => {
    try {
        return res.send(getGoogleAuthUrl());
    } catch (error) {
        next(error);
    }
});

router.get('/auth/google', async (req,res,next) => {
    const code = req.query.code;
    const path = '/emailUsersMessages/register_message.html';

    try {
        const tokenGet = await getTokens(code, USER_GOOGLE_ID, USER_GOOGLE_SECRET, 'http://localhost:3001/auth/google');
        const {given_name: name, family_name: surname, email, sub} = await jwt.decode(tokenGet.id_token, GOOGLE_PUBLIC_KEY, ['RS256']);
        
        let userFound = await User.findOne({email});
        if (userFound){
            const token = await jwt.sign({ sub: userFound._id }, JWT_SECRET, { expiresIn: "12h"});
            userFound = normalizeUsers(userFound);
            return res.json({ token,  user: userFound }); 
        }
        
        const password = await argon.hash(sub);
        const category = 'User';

        let userCreated = await User.create({ name, surname, email, password, category }); 
        
        const oldText = ['{name}', '{surname}'];
        const newText = [name, surname];
        const [re, obj] = htmlReplacer(oldText, newText);
        const html = await fs.readFileSync(__dirname + path, 'utf8')
            .replace(re, (match)=>obj[match]);
        await transportEmail(email, html, 'Registro exitoso');
        
        const token = await jwt.sign({ sub: userCreated._id }, JWT_SECRET, { expiresIn: "12h"});
        userCreated = normalizeUsers(userCreated);
        return res.json({ token,  user: userCreated }); 
    } catch (error) {
        next(error);
    }
})

module.exports = router;