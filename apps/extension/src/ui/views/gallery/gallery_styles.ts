import { register_deferred_stylesheet } from "../../styles/deferred_stylesheets.js";
import styles from "./gallery.module.css";
import stylesheet from "./gallery.module.css?inline";

register_deferred_stylesheet("gallery", stylesheet);

export default styles;
