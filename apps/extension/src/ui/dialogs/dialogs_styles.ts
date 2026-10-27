import { register_deferred_stylesheet } from "../styles/deferred_stylesheets.js";
import styles from "./dialogs.module.css";
import stylesheet from "./dialogs.module.css?inline";

register_deferred_stylesheet("dialogs", stylesheet);

export default styles;
