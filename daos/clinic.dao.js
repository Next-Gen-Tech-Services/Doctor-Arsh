const ClinicModel = require("../models/clinic.model");
const getNextSequenceValue = require("../utils/helpers/counter.util");
const log = require("../configs/logger.config");
const { hashItem } = require("../utils/helpers/bcrypt.util");

class ClinicDao {
  async getClinicById(id) {
    try {
      const clinic = await ClinicModel.findOne({ ClinicId: id });
      if (!clinic) {
        return {
          message: "Clinic not found",
          status: "failed",
          data: null,
          code: 201,
        };
      } else {
        return {
          message: "Clinic found",
          status: "success",
          data: clinic,
          code: 200,
        };
      }
    } catch (error) {
      log.error("Error from [Clinic DAO]: ", error);
      throw error;
    }
  }

  async getClinicByEmail(email) {
    try {
      const clinicExist = await ClinicModel.findOne({ email });
      if (clinicExist) {
        return {
          message: "Successfully",
          status: "success",
          data: clinicExist,
          code: 200,
        };
      } else {
        return {
          message: "Clinic not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
    } catch (error) {
      log.error("Error from [Clinic DAO]: ", error);
      throw error;
    }
  }

  async getClinicByResetToken(resetToken) {
    try {
      const clinicExist = await ClinicModel.findOne({ resetToken });
      if (clinicExist) {
        return {
          message: "Successfully",
          status: "success",
          data: clinicExist,
          code: 200,
        };
      } else {
        return {
          message: "Clinic not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
    } catch (error) {
      log.error("Error from [Clinic DAO]: ", error);
      throw error;
    }
  }

  async createClinic(data) {
    try {
      const clinic = new ClinicModel(data);
      const result = await clinic.save();

      if (!result) {
        throw new Error("Clinic creation error");
      }

      return {
        message: "Clinic created successfully",
        data: result,
        status: "success",
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Clinic DAO]: ", error);
      throw error;
    }
  }

  async updateClinic(data) {
    try {
      if (data?.password) {
        data.password = await hashItem(data.password);
      }

      const result = await ClinicModel.findOneAndUpdate(
        { email: data.email },
        data,
        { new: true }
      );

      if (!result) {
        return {
          message: "Something went wrong",
          data: null,
          status: "fail",
          code: 201,
        };
      }

      return {
        message: "Clinic updated successfully",
        data: result,
        status: "success",
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Clinic DAO]: ", error);
      throw error;
    }
  }
}

module.exports = new ClinicDao();
