import { register_deferred_stylesheet } from "../styles/deferred_stylesheets.js";
import styles from "./prompt_field.module.css";
import stylesheet from "./prompt_field.module.css?inline";

register_deferred_stylesheet("prompt_field", stylesheet);

export default styles;
