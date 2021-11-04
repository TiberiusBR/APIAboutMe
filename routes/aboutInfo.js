const express = require('express');
const router = express.Router();
const AboutInfo = require('../models/aboutInfoModel');
const User = require('../models/userModel');
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
router.get('/search/:userlogin', async (req, res) => {
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
    res.send('Error - ' + err);
  }
});

//Cria uma página passando os parametros
router.post('/create', async (req, res) => {
  console.log('Creating a AboutInfo...');
  try {
    const login = req.body.userLogin;
    const user = await User.findOne({ login: login });
    if (user != null) {
      if (user.ativado) {
        const info = await AboutInfo.findOne({ userLogin: login });
        if (info == null) {
          const aboutInfo = new AboutInfo({
            userLogin: req.body.userLogin,
            nome: req.body.nome,
            itens: req.body.itens,
          });
          await aboutInfo.save();

          return res.json({ status: true, info: aboutInfo });
        } else {
          return res.json({
            status: false,
            message: 'Já existe usuário com essa página!',
          });
        }
      } else {
        return res.json({ status: false, message: 'Usuário não ativado.' });
      }
    } else {
      return res.json({
        status: false,
        message: 'Usuário não cadastrado.',
      });
    }
  } catch (err) {
    res.send('Error - ' + err);
  }
});

//Insere um item
router.put('/insertItem/:id', async (req, res) => {
  console.log('Inserting a item...');
  try {
    const info = await AboutInfo.findById(req.params.id);
    if (info != null) {
      const key = req.body.key;
      const value = req.body.value;

      if (!key || !value) {
        return res.json({
          status: false,
          message: 'Um dos campos chave/valor está vazio.',
        });
      }
      item = {
        _id: mongoose.Types.ObjectId(),
        key: key,
        value: value,
      };

      info.itens.push(item);
      await info.save();

      return res.json({ status: true, itemAdicionado: item });
    } else {
      return res.json({ status: false, message: 'ID não encontrado.' });
    }
  } catch (error) {
    return res.send('Error - ' + error);
  }
});

//Atualiza alguma informação especifica.
router.patch('/update/:id', async (req, res) => {
  console.log('Updating a aboutInfo...');
  try {
    const info = await AboutInfo.findById(req.params.id);
    if (info != null) {
      var algumItemModificado = false;
      const nome = req.body.nome || info.nome;
      info.nome = nome;

      info.itens.forEach((item) => {
        req.body.itens.forEach((reqItem) => {
          if (String(item._id) === String(reqItem.id)) {
            item.key = reqItem.key || item.key;
            item.value = reqItem.value || item.value;
            algumItemModificado = true;
          }
        });
      });

      await info.save();

      return res.json({
        status: true,
        algumItemModificado: algumItemModificado,
        info: info,
      });
    } else {
      return res.json({ status: false, message: 'ID não encontrado.' });
    }
  } catch (err) {
    return res.send('Error - ' + err);
  }
});

//Deleta uma página especifica
router.delete('/deletePage', async (req, res) => {
  console.log('Deleting a page...');
  try {
    const page = await AboutInfo.findByIdAndDelete(req.body.id);
    if (page != null) {
      return res.json({ status: true, deletedPage: page });
    } else {
      return res.json({ status: false, message: 'Página não encontrada.' });
    }
  } catch (error) {
    return res.send('Error - ' + error);
  }
});

//Delete uma info especifica.
router.delete('/deleteItem/:userid', async (req, res) => {
  console.log('Deleting a item.');
  const page = await AboutInfo.findById(req.params.userid);
  if (page != null) {
    const itemId = req.body.itemid;
    var deletedItem = null;
    page.itens.forEach(async (item) => {
      if (String(item._id) === String(itemId)) {
        deletedItem = item;
        item.remove();
        await page.save();
      }
    });

    return res.json({
      status: true,
      message: 'Item Deletado',
      itemRemovido: deletedItem,
    });
  } else {
    return res.json({ status: false, message: 'Página não encontrada.' });
  }
});

module.exports = router;
