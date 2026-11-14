import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./opening.module.css";
import stylesheet from "./opening.module.css?inline";

register_deferred_stylesheet("opening", stylesheet);

export default styles;
