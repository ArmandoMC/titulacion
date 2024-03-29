const UserService = require('./user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require("nodemailer");

const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    // delete user.rows[0].password;
    return user;
  }
  async getProfile(token) {
    try {
      
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      console.log('ver user',user)
      return user;
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  signToken(user) {

    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    delete user.recovery_token;
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {

    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtRecoverySecret, { expiresIn: '15min' });
    console.log(token)
    const link = `http://localhost:4200/recovery/new-password/${token}`;

    await service.updateRecoveryField(user.id, token);
    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`,  // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
     
      // plain text body
      html: `<p>Por favor da click en el siguiente enlace para restablecer tu contraseña.</p> </br>
      <a href=${link}>Restablecer contraseña</a> </br>
      <p>El enlace solo será válido por 15 minutos.</p></br>
      <p>Si presentas problemas para hacer clic en el enlace, entonces copia y pega el siguiente link
      en tu navegador:</p> </br>
      <p>${link}</p>`


    }
    // <b>Ingresa a este link =>${link} </b>`, 
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecoverySecret);
      const user = await service.findOne(payload.sub);
      if (user.recovery_token !== token) {
        throw boom.unauthorized();
      }
      const passwordReal=newPassword;
      const hash = await bcrypt.hash(newPassword, 10);
      const recoveryToken = null;
      await service.updatePasswordField(user.id, recoveryToken, hash,passwordReal);
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
  async sendMail(infoMail) {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false,
      port: 587,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' }
  }
}

module.exports = AuthService;
