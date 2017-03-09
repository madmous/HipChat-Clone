'use strict';

const log    = require ('../../../libs/winston')(module);

let userController = {};

function formatResponse(pUser) {
  return {
    user: {
      _id: pUser._id,
      fullname: pUser.fullname,
    }
  } 
}

function buildResponse(statusCode, data, res) {
  if (statusCode === 200) {
    return res.status(200).json({
      data: formatResponse(data)
    })
  } else if (statusCode === 404) {
    return res.status(404).json({
      data: data
    })
  }
}

userController.getUser = (req, res) => {
  const user = req.user;

  if (!user) {
    buildResponse(404, req.err, res);
  } else {
    buildResponse(200, user, res);
	}
};

userController.updateUser = (req, res) => {
  const errorMessage = 'Sorry. I could not update that user';

  let user = req.user;

  user.name = req.body.name; 
  user.fullname = req.body.fullname;
  user.initials = req.body.initials;

  user.save()
    .then(user => buildResponse(200, user, res))
    .catch(buildResponse(404, errorMessage, res));
};

userController.removeUser = (req, res) => {
  const errorMessage = 'Sorry. I could not remove that user';

  user.remove()
    .then(user => buildResponse(200, user, res))
    .catch(buildResponse(404, errorMessage, res));
};

module.exports = userController;