import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { set } from "../redux/product-modal/productModalSlice";

import Button from "./Button";

import numberWithCommas from "../utils/numberWithCommas";
import { BsFillHeartFill } from "react-icons/bs";
import { setValue, removeValue } from "../redux/setvalue-cart/showvalue";
import Popup from "./Popup";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { change } from "../redux/accountslice/accountslice";



const ProductCard = (props) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [done, setDone] = useState(false);
  const [response, setResponse] = useState(false);
  const [hide, setHide] = useState(false);
const toggleActionWithList = useSelector(state=>state.account.value)
  const toggleActive = () => {
    setDone(true);
    setHide(false);
    if (!like) {
      setLike(true);

      const favouList = {
        img: props.img01,
        name: props.name,
        slug: props.slug,
      };
      setResponse(true);

      setTimeout(() => {
        setHide(true);
      }, 3000);

      dispatch(setValue(favouList));

      console.log(favouList);
    } else {
      setLike(false);

      const favouList = {
        img: props.img01,
        name: props.name,
        slug: props.slug,
      };
      setResponse(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);

      dispatch(removeValue(favouList));
    }
  };
  const random = Math.round(Math.random() * 10000000 + 2000000);
  return (
    <div className="product-card">
      <Link to={`/catalog/${props.slug}`}>
        <div className="product-card__image">
          <img src={props.img01} alt="" />
          <img src={props.img02} alt="" />
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">
          {numberWithCommas(props.price)}
          <span className="product-card__price__old">
            <del>{numberWithCommas(random)}</del>
          </span>
        </div>
        <div className="product-card__sale">
          -{100 - Math.round((props.price / random) * 100)}%
        </div>
      </Link>
      <div
        className={`product-card__favourite ${like ? "active" : ""}`}
        onClick={toggleActive}
      >
        <BsFillHeartFill />
      </div>
      <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => dispatch(set(props.slug))}
        >
          chọn mua
        </Button>
      </div>
      {done && response && toggleActionWithList ? (
        <Popup
          icon={<BsCheckCircleFill style={{ color: "green" }} />}
          status="Đã thêm sản phẩm vào ưa thích"
          hide={!hide ? false : true}
        />
      ) : (
        ""
      )}
      {done && !response && toggleActionWithList ? (
        <Popup
          icon={<MdCancel style={{ color: "red" }} />}
          status="Đã bỏ thích sản phẩm !!"
          hide={!hide ? false : true}
        />
      ) : (
        ""
      )}
      {done && response && !toggleActionWithList ? (
        <Popup
          icon={<MdCancel style={{ color: "red" }} />}
          status="Bạn cần đăng nhập !!"
          hide={!hide ? false : true}
        />
      ) : (
        ""
      )}
      {done && !response && !toggleActionWithList ? (
        <Popup
          icon={<MdCancel style={{ color: "red" }} />}
          status="Bạn cần đăng nhập !!"
          hide={!hide ? false : true}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductCard;
