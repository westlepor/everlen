const babelOptions = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
      },
    ],
  ],
  presets: ["babel-preset-gatsby"],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
