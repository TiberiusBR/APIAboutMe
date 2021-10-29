const express = require('express');
const router = express.Router();
const AboutInfo = require('../models/aboutInfoModel');
const mongoose = require('mongoose');

//DEBUG
router.get('/', async (req, res) => {
  console.log('Retrieving All Info...');
  try {
    const info = await AboutInfo.find();
    res.json(info);
  } catch (err) {
    res.send('Error ' + err);
  }
});
//DEBUG

//Procurar uma página pelo login do usuário.
router.get('/:userlogin', async (req, res) => {
  console.log('Retrieving a Page...');
  try {
    const login = req.params.userlogin;
    const info = await AboutInfo.findOne({ userLogin: login });

    if (info != null) {
      return res.json({ status: true, info: info });
    } else {
      return res.json({ status: false, message: 'Página não encontrada.' });
    }
  } catch (err) {
    res.send('Error ' + err);
  }
});

router.post('/', async (req, res) => {
  console.log('Creating a AboutInfo...');
  const aboutInfo = new AboutInfo({
    userID: req.body.userID,
    itens: req.body.itens,
  });

  try {
    const a1 = await aboutInfo.save();
    res.json(a1);
  } catch (err) {
    res.send('Error');
  }
});

router.patch('/:id', async (req, res) => {
  console.log('Updating a aboutInfo...');
  try {
    const aboutInfo = await AboutInfo.findById(req.params.id);
    aboutInfo.login = req.body.login;
    const a1 = await aboutInfo.save();
    res.json(a1);
  } catch (err) {
    res.send('Error');
  }
});

module.exports = router;
