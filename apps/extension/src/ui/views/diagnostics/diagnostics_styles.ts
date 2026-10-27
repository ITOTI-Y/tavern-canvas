import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./diagnostics.module.css";
import stylesheet from "./diagnostics.module.css?inline";

register_deferred_stylesheet("diagnostics", stylesheet);

export default styles;
