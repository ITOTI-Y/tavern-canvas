import { register_deferred_stylesheet } from "../styles/deferred_stylesheets.js";
import styles from "./components.module.css";
import stylesheet from "./components.module.css?inline";

register_deferred_stylesheet("components", stylesheet);

export default styles;
