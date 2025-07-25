const LabModel = require("../models/lab.model");
const getNextSequenceValue = require("../utils/helpers/counter.util");
const log = require("../configs/logger.config");
const { hashItem } = require("../utils/helpers/bcrypt.util");

class LabDao {
  async getLabById(id) {
    try {
      const lab = await LabModel.findOne({ LabId: id });
      if (!lab) {
        return {
          message: "Lab not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
      return {
        message: "Lab found",
        status: "success",
        data: lab,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Lab DAO]: ", error);
      throw error;
    }
  }

  async getLabByEmail(email) {
    try {
      const lab = await LabModel.findOne({ email });
      if (!lab) {
        return {
          message: "Lab not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
      return {
        message: "Successfully",
        status: "success",
        data: lab,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Lab DAO]: ", error);
      throw error;
    }
  }

  async getLabByResetToken(resetToken) {
    try {
      const lab = await LabModel.findOne({ resetToken });
      if (!lab) {
        return {
          message: "Lab not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
      return {
        message: "Successfully",
        status: "success",
        data: lab,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Lab DAO]: ", error);
      throw error;
    }
  }

  async createLab(data) {
    try {
      const lab = new LabModel(data);
      const result = await lab.save();

      log.info("Lab saved");
      return {
        message: "Lab created successfully",
        data: result,
        status: "success",
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Lab DAO]: ", error);
      throw error;
    }
  }

  async updateLab(data) {
    try {
      if (data?.password) {
        data.password = await hashItem(data.password);
      }

      const result = await LabModel.findOneAndUpdate(
        { email: data.email },
        data,
        { new: true }
      );

      if (!result) {
        log.error("Error from [Lab DAO]: Lab updation error");
        return {
          message: "Something went wrong",
          data: null,
          status: "fail",
          code: 201,
        };
      }

      return {
        message: "Lab updated successfully",
        data: result,
        status: "success",
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Lab DAO]: ", error);
      throw error;
    }
  }
}

module.exports = new LabDao();
