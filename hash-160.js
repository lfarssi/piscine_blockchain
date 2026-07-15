const { createHash: h } = require("crypto"),
  { readFile: r } = require("fs").promises;
module.exports.hashFile = async (f) =>
  h("sha256")
    .update(await r(f))
    .digest("hex");
