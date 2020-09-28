"use strict";

module.exports.hello = async (event) => {
  console.log(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
    }),
  };
};
