import module1 from "./module1";
import module2 from "./module2";

let $ = require("jquery");

console.log(module1, module2, $);

import("./asyncModule1").then((asyncModule1) => {
  console.log(asyncModule1);
});
