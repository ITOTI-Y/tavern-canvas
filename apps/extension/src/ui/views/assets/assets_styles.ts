import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./assets.module.css";
import stylesheet from "./assets.module.css?inline";

register_deferred_stylesheet("assets", stylesheet);

export default styles;
