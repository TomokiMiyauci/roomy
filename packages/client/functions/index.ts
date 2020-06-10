const files = {
  ssr: './ssr'
}

if (
  !process.env.FUNCTION_NAME ||
  process.env.FUNCTION_NAME.startsWith(files.ssr)
) {
  module.exports.ssr = require(files.ssr).default
}
