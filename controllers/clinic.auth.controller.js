const clinicService = require("../services/clinic.auth.service");

class ClinicController {
  async register(req, res) {
    try {
      const result = await clinicService.registerService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /*
  async login(req, res) {
    try {
      const result = await authService.loginService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async googleLogin(req, res) {
    try {
      const result = await authService.googleLoginService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async forgetPassword(req, res) {
    try {
      const result = await authService.forgetPasswordService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async resetPassword(req, res) {
    try {
      const result = await authService.resetPasswordService(req, res);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  */

}

module.exports = new ClinicController();
