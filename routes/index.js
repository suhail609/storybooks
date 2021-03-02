const express = require('express');
const router = express.Router();

//@desc   login/landig page
//@route GET /

router.get('/', (req, res) => {
    res.render('login')
})

//@desc   Dashboard
//@route GET /dashboard

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

module.exports = router;