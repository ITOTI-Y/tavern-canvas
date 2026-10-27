import { register_deferred_stylesheet } from "../styles/deferred_stylesheets.js";
import styles from "./illustrate_dialog.module.css";
import stylesheet from "./illustrate_dialog.module.css?inline";

register_deferred_stylesheet("illustrate_dialog", stylesheet);

export default styles;
