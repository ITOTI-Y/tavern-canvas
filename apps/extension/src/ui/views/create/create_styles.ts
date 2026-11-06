import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./create.module.css";
import stylesheet from "./create.module.css?inline";

register_deferred_stylesheet("create", stylesheet);

export default styles;
