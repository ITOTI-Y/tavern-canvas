import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./prompt.module.css";
import stylesheet from "./prompt.module.css?inline";

register_deferred_stylesheet("prompt", stylesheet);

export default styles;
