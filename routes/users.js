const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");
const randomString = require("../utils/randomString");

//DEBUG
//Retorna todos os usuários
router.get("/", async (req, res) => {
  console.log("Retrieving All Users...");
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error " + err);
  }
});
//DEBUG

//ROTA LOGIN
router.post("/login", async (req, res) => {
  console.log("Retrieving a User...");
  try {
    const login = req.body.login;
    const password = req.body.password;
    const searchUser = await User.findOne({ login: login });
    if (!searchUser.ativado) {
      return res.json({ status: false, message: "Usuário não ativado." });
    }
    if (searchUser == null) {
      return res.json({ status: false, message: "Usário não existente" });
    }
    if (password == searchUser["password"]) {
      return res.json({ status: true, searchUser });
    } else {
      return res.json({ status: false, message: "wrong password" });
    }
  } catch (err) {
    res.send("Error " + err);
  }
});

//CRIAR USUÁRIO
//Cria um usuário com login e senha aleatória.
//Os usuários virão desativados.
router.post("/create", async (req, res) => {
  var login = randomString(12);
  var password = randomString(12);
  var checkCreation = false;
  try {
    const searchUser = await User.findOne({ login: login });
    while (!checkCreation) {
      if (searchUser == null) {
        const user = new User({
          login: login,
          password: password,
        });
        const newUser = await user.save();
        return res.json(newUser);
      } else {
        var login = randomString(12);
        var password = randomString(12);
      }
    }
  } catch (error) {
    res.send("Error - " + error);
  }
});

//ATIVA UM USUÁRIO
//A database virá com usuários pré cadastrados que estão desativados
//Essa rota permite passar a id de um usuário e cadastrar ele, ativando
router.post("/ativar/:id", async (req, res) => {
  console.log("Activating a User...");
  try {
    const searchUser = await User.findById(req.params.id);
    if (searchUser != null) {
      if (searchUser.ativado) {
        return res.json({ status: false, message: "ID/Usuário já ativado." });
      }
      const login = req.body.login;
      const password = req.body.password;
      const searchUserLogin = await User.findOne({ login: login });
      if (password.length < 6) {
        return res.json({
          status: false,
          message: "Senha deve ter no mínimo 6 caracteres.",
        });
      }
      if (login == searchUserLogin.login) {
        return res.json({ status: false, message: "Login já existente." });
      }

      searchUser.login = login || searchUser.login;
      searchUser.password = password || searchUser.password;
      searchUser.ativado = true;

      return res.json({ status: true, searchUser });
    } else {
      return res.json({ status: false, message: "ID não encontrada." });
    }
  } catch (error) {
    return res.send("Error - " + error);
  }
});

//ROTA DE ATUALIZAR INFORMAÇÕES DO USUÁRIO
//Envia as informações no body
//Mantem o que já existia.
router.patch("/update/", async (req, res) => {
  console.log("Updating a user...");
  try {
    const searchUser = await User.findOne({ login: req.body.login });
    console.log(searchUser);
    if (searchUser != null) {
      if (
        searchUser.login == req.body.login &&
        searchUser.password == req.body.password
      ) {
        searchUser.login = req.body.newLogin || req.body.login;
        searchUser.password == req.body.newPassword || req.body.password;
        await searchUser.save();

        return res.json({ status: true, searchUser });
      } else {
        return res.json({ status: false, message: "Usuário/Senha errada." });
      }
    } else {
      return res.json({ status: false, message: "Usuário não encontrado." });
    }
  } catch (err) {
    res.send("Error - " + err);
  }
});

//DELETAR USUÁRIO POR ID
router.delete("/delete/", async (req, res) => {
  console.log("Deleting a user..");
  try {
    const searchUser = await User.findByIdAndDelete(req.body.id);
    if (searchUser != null) {
      return res.json({ status: true, deletedUser: searchUser });
    } else {
      return res.json({ status: false, message: "Usuário não encontrado." });
    }
  } catch (error) {}
});

module.exports = router;
