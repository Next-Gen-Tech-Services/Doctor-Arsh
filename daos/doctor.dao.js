const DoctorModel = require("../models/doctor.model");
const getNextSequenceValue = require("../utils/helpers/counter.util");
const log = require("../configs/logger.config");
const { hashItem } = require("../utils/helpers/bcrypt.util");

class DoctorDao {
  async getDoctorById(id) {
    try {
      const doctor = await DoctorModel.findOne({ DoctorId: id });
      if (!doctor) {
        return {
          message: "Doctor not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
      return {
        message: "Doctor found",
        status: "success",
        data: doctor,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Doctor DAO]: ", error);
      throw error;
    }
  }

  async getDoctorByEmail(email) {
    try {
      const doctor = await DoctorModel.findOne({ email });
      if (!doctor) {
        return {
          message: "Doctor not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
      return {
        message: "Successfully",
        status: "success",
        data: doctor,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Doctor DAO]: ", error);
      throw error;
    }
  }

  async getDoctorByResetToken(resetToken) {
    try {
      const doctor = await DoctorModel.findOne({ resetToken });
      if (!doctor) {
        return {
          message: "Doctor not found",
          status: "failed",
          data: null,
          code: 201,
        };
      }
      return {
        message: "Successfully",
        status: "success",
        data: doctor,
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Doctor DAO]: ", error);
      throw error;
    }
  }

  async createDoctor(data) {
    try {
      const doctor = new DoctorModel(data);
      const result = await doctor.save();

      log.info("Doctor saved");
      return {
        message: "Doctor created successfully",
        data: result,
        status: "success",
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Doctor DAO]: ", error);
      throw error;
    }
  }

  async updateDoctor(data) {
    try {
      if (data?.password) {
        data.password = await hashItem(data.password);
      }

      const result = await DoctorModel.findOneAndUpdate(
        { email: data.email },
        data,
        { new: true }
      );

      if (!result) {
        log.error("Error from [Doctor DAO]: Doctor updation error");
        return {
          message: "Something went wrong",
          data: null,
          status: "fail",
          code: 201,
        };
      }

      return {
        message: "Doctor updated successfully",
        data: result,
        status: "success",
        code: 200,
      };
    } catch (error) {
      log.error("Error from [Doctor DAO]: ", error);
      throw error;
    }
  }
}

module.exports = new DoctorDao();
