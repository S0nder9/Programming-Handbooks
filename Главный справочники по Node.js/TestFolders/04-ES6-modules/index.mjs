import { obj } from "./named-exports.mjs";
import { isRaining, h } from "./inline-exports.mjs";
import func from "./default-export.mjs";
import defServer, {admin, password as pass} from "./mixed-exports.mjs";

console.log(obj.season, obj.temp);
console.log(isRaining, h);
func("Привет!");

console.log(defServer, admin, pass); 