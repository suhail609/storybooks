const express = require('express');
const router = express.Router();

//@desc   login/landig page
//@route GET /


//explicitly set layout to ligin.hbs
router.get('/', (req, res) => {
    res.render('login', {layout: 'login'})
})

//@desc   Dashboard
//@route GET /dashboard

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

module.exports = router;