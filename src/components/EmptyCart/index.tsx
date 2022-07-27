import React from "react";
import styles from "./EmptyCart.module.scss";
import emptyCartImg from "../../assets/img/empty-cart.png";
import { GoBackButton } from "../GoBackButton";

export const EmptyCart: React.FC = () => (
  <div className={styles.emptyCart}>
    <img className={styles.emptyCartImg} src={emptyCartImg} alt="" />
    <p className={styles.emptyCartText}>
      <b>Ваша корзина пуста</b>
    </p>
    <GoBackButton emptyCart />
  </div>
);
