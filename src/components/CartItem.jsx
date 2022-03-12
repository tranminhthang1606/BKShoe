import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";
import {removeValue} from "../redux/setvalue-cart/showvalue"

import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";


const CartItem = (props) => {
  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);
  const cartLength =
    localStorage.getItem("cartItems") !== null
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    if (opt === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };
 

  
  const denyDel = () => {
    console.log("done");
    setActive(false);
  };
  const [active, setActive] = useState(false);
  const openConfirmPop = () => {
    setActive(true)
  };
  const removeCartItem = () => {
    dispatch(removeItem(item));
    setActive(false)
    
  };

  console.log(active);
  return (
    <>
      <div className="cart__item" ref={itemRef}>
        <div className="cart__item__image">
          <img src={item.product.image01} alt="" />
        </div>
        <div className="cart__item__info">
          <div className="cart__item__info__name">
            <Link to={`/catalog/${item.slug}`}>
              {`${item.product.title} - ${item.color} - ${item.size}`}
            </Link>
          </div>
          <div className="cart__item__info__price">
            {numberWithCommas(item.price)}
          </div>
          <div className="cart__item__info__quantity">
            <div className="product__info__item__quantity">
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("-")}
              >
                <i className="bx bx-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                {quantity}
              </div>
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("+")}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
          <div className="cart__item__del">
            <i className="bx bx-trash" onClick={openConfirmPop}></i>
          </div>
        </div>
      </div>
      <div className={`modal ${active ? "active" : ""}`}>
        <form className="modal-content">
          <div className="modal-content-container">
            <h1>Xóa mặt hàng</h1>
            <p>Bạn có chắc muốn xóa mặt hàng ?</p>

            <div className="clearfix">
              <button className="cancelbtn" onClick={denyDel}>
                Hủy bỏ
              </button>
              <button className="deletebtn" onClick={removeCartItem}>
                Xóa
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
