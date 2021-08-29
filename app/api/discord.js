const express = require('express');
const btoa = require('btoa')
const fetch = require('node-fetch');
const { encodeFormData } = require('../../utils/utils');
const { response } = require('express');

const router = express.Router();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirect = 'http://localhost:5000/discord/callback';

router.get('/login', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientID}&scope=identify guilds&response_type=code&redorect_uri=${redirect}`)
})

router.get('/callback', async(req, res) => {
    if (!req.query.code) {
        return res.status(400).json({message: "No Code provided"})
    }
    const code = req.query.code;
    const data = {
        'client_id': clientID,
        'client_secret': clientSecret,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect
    }
    const accessRes = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: encodeFormData(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
    const tokenRes = await accessRes.json();
    res.cookie('token', tokenRes.access_token, {
        maxAge: 604800000
    })
    res.cookie('loggedIn', true, {
        maxAge: 604800000
    })
    const userInfo = await fetch('https://discord.com/api/v9/users/@me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${tokenRes.access_token}`
        }
    }).then(response => response.json()).then((discordResponse) => {
        res.cookie('username', discordResponse.username, {
            maxAge: 604800000
        });
        res.cookie('imgurl', `https://cdn.discordapp.com/avatars/${discordResponse.id}/${discordResponse.avatar}.png`, {
            maxAge: 604800000,
        })
        res.cookie('userID', discordResponse.id, {
            maxAge: 604800000
        })
    })
    res.redirect('/')
})

router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.clearCookie('loggedIn');
    res.clearCookie('username');
    res.clearCookie('imgurl');
    res.clearCookie('userID');
    res.redirect('/')
})

module.exports = router;