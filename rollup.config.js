import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import pkg from "./package.json";

const plugins = [
  babel({
    exclude: "node_modules/**",
    presets: [
      [
        "env",
        {
          modules: false
        }
      ]
    ],
    plugins: ["external-helpers"]
  })
];

if (process.env.BUILD === "production") {
  plugins.push(uglify());
}

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    sourceMap: true,
    output: {
      name: "AcastEmbed",
      file: pkg.browser,
      format: "umd"
    },
    plugins
  }
];
