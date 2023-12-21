const _ = require("lodash");

module.exports = {
  object: (obj = {}, fields = []) => {
    return _.pick(obj, ..._.values(fields));
  },

  request: (
    req,
    {
      body = [],
      params = [],
      query = [],
      headers = [],
    }
  ) => {
    return _.merge(
      _.pick(req.body, ..._.values(body)),
      _.pick(req?.params, ..._.values(params)),
      _.pick(req?.query, ..._.values(query)),
      _.pick(req?.headers, ..._.values(headers))
    );
  },
};
