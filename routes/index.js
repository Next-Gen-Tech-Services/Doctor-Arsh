const AuthRouter = require("./clinic.auth.routes");
const ClincAuthRouter = require("./clinic.auth.routes");
const DoctorAuthRouter = require("./doctor.auth.routes");
const LabAuthRouter = require("./lab.auth.routes");

module.exports = {
  ClincAuthRouter,
  DoctorAuthRouter,
  LabAuthRouter
};
