import React, { useState, useEffect } from "react";

import { BiArrowBack } from "react-icons/bi";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { remove, set } from "../redux/product-modal/productModalSlice";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
const ProductViewPopUp = (props) => {
  const dispatch = useDispatch();

  let product = props.product;
  const history = useNavigate();

  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };
  const [done, setDone] = useState(false);
  const [response, setResponse] = useState(false);
  const [hide, setHide] = useState(false);
  const [previewImg, setPreviewImg] = useState(product.image01);

  

  const [color, setColor] = useState(undefined);

  const [size, setSize] = useState(undefined);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      setResponse(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
      return false;
    }

    if (size === undefined) {
      setResponse(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
      return false;
    }

    return true;
  };

  const addToCart = () => {
    setDone(true);
    setHide(false);
    if (check()) {
      let newItem = {
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        setResponse(true);

        setTimeout(() => {
          setHide(true);
        }, 3000);
      } else {
        setResponse(false);
        setTimeout(() => {
          setHide(true);
        }, 3000);
      }
    }
  };

  const goToCart = () => {
    setDone(true);
    setHide(false);
    if (check()) {
      let newItem = {
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        setResponse(true);

        setTimeout(() => {
          setHide(true);
        }, 3000);
        dispatch(remove());
        history("/cart");
      } else {
        setResponse(false);
        setTimeout(() => {
          setHide(true);
        }, 3000);
      }
    }
  };

  return (
    <div className="product ">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
        </div>
      </div>

      {done && response ? (
        <Popup
          icon={<BsCheckCircleFill style={{ color: "green" }} />}
          status="Đã thêm vào giỏ hàng"
          hide={!hide ? false : true}
        />
      ) : (
        ""
      )}
      {done && !response ? (
        <Popup
          icon={<MdCancel style={{ color: "red" }} />}
          status="Chưa chọn thông tin sản phẩm"
          hide={!hide ? false : true}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductViewPopUp;
