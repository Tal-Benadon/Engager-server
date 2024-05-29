const err = (c, m) => {
  return { code: c, message: m };
};

const errMessage = Object.freeze({
  DOCUMENTS_NOT_FOUND: err(999, "documents not found"),
  CAN_NOT_CREATE_TOKEN: err(999, "can't create token"),
  UNAUTHORIZED: err(403, "user not authorized"),
  USER_NOT_FOUND: err(401, "user not found"),
  USER_IS_EXIST: err(999, "user already exists"),
  PASSWORDS_ARE_NOT_CORRECT: err(999, "passwords are not correct"),
  DUPLICATE: err(500, "some details are duplicate"),
});

const sendError = (res, err = {}) => {
  console.log(err);
  if (err.code < 100 || err.code > 999)
    res.status(500).send("some details are duplicate");
  else res.status(err.code || 500).send(err.message || "try again later");
};

module.exports = {
  errMessage,
  sendError,
};
