import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./settings.module.css";
import stylesheet from "./settings.module.css?inline";

register_deferred_stylesheet("settings", stylesheet);

export default styles;
