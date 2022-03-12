import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import { FaMoneyBill, FaCreditCard, FaWallet } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Popup from "../components/Popup";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { set } from "../redux/product-modal/productModalSlice";
const paidmethod = [
  {
    id: 1,
    method: "Tiền mặt",
    icon: <FaMoneyBill />,
  },
  {
    id: 2,
    method: "Thẻ ATM",
    icon: <FaCreditCard />,
  },
  {
    id: 3,
    method: "ZaloPay",
    icon: <SiZalo />,
  },
  {
    id: 4,
    method: "Ví MoMo",
    icon: <FaWallet />,
  },
];

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  const [check, setCheck] = useState(false);

  const checkRef = useRef();

  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems)
  );

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  const [modal, setModal] = useState(false);
  const cart =
    localStorage.getItem("cartItems") !== null
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
  const openModal = () => {
    if (!modal && cart.length !== 0) {
      setModal(true);
    } else setModal(false);
  };
  console.log(modal);

  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const [done, setDone] = useState(false);
  const [response, setResponse] = useState(false);
  const [hide, setHide] = useState(false);
  const acceptPay = () => {
    setDone(true);
    setHide(false);
    if (
      (nameRef.current.value === "" ||
        addressRef.current.value === "" ||
        phoneRef.current.value === "" &&
      method === undefined)
    ) {
      setResponse(false);
    } else {
      setResponse(true);
      setModal(false);
      setMethod(undefined);
      nameRef.current.value = null;
      addressRef.current.value = null;
      phoneRef.current.value = null;
    }
    setTimeout(() => {
      setHide(true);
    }, 3000);
  };

  console.log(hide);
  const [method, setMethod] = useState(undefined);
  const [showmethod,setShowMethod] = useState(false)

  const paymentMethod = (item) => {
    setMethod(item)
    if (item.id !== 1) {
      setShowMethod(true)
    } else {
      setShowMethod(false)
    }
  }
  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block" onClick={openModal}>
              Đặt hàng
            </Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>

        <div className="accept-pay-popup">
          <div className={`modal ${modal ? "show" : ""}`}>
            <span className="close" onClick={openModal}>
              X
            </span>
            <form className="modal-content">
              <div className="container">
                <div className="accept-pay-bill">
                  <h1>Xác nhận thanh toán</h1>
                  <p>Tổng hóa đơn của bạn (+25,000đ phí Ship)</p>
                  <h2> {numberWithCommas(Number(totalPrice) + 25000)} đ </h2>
                </div>
                <div className="accept-pay-information">
                  <label htmlFor="name">Tên người nhận</label>
                  <input type="text" placeholder="Tên của bạn" ref={nameRef} />
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    ref={phoneRef}
                  />
                  <label htmlFor="address">Địa chỉ nhận hàng</label>
                  <input
                    type="text"
                    placeholder="Địa chỉ nhận hàng"
                    ref={addressRef}
                  />
                  <h2>Phương thức thanh toán</h2>

                  <div className="accept-pay-information__payment">
                    {paidmethod.map((item, index) => (
                      <div
                        key={index}
                        className={`${method === item ? "activated" : ""} `}
                        onClick={() => paymentMethod(item)}
                      >
                        {item.icon}
                        <span>{item.method}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`accept-pay-information banking ${
                      showmethod ? "show" : "unshow"
                    }`}
                  >
                    <label htmlFor="name">Ngân hàng</label>
                    <input
                      type="text"
                      placeholder="Ngân hàng giao dịch"
                      ref={nameRef}
                    />
                    
                    <label htmlFor="phone">Số thẻ</label>
                    <input
                      type="text"
                      placeholder="Số in trên thẻ"
                      ref={phoneRef}
                    />
                    <label htmlFor="address">Số tài khoản</label>
                    <input
                      type="text"
                      placeholder="Số tài khoản Mobile-Banking"
                      ref={addressRef}
                    />
                  </div>
                </div>

                <div className="clearfix">
                  <button
                    type="button"
                    className="cancelbtn"
                    onClick={openModal}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="deletebtn"
                    onClick={acceptPay}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {done && response ? (
          <Popup
            icon={<BsCheckCircleFill style={{ color: "green" }} />}
            status="Mua hàng thành công"
            hide={!hide ? false : true}
          />
        ) : (
          ""
        )}
        {done && !response ? (
          <Popup
            icon={<MdCancel style={{ color: "red" }} />}
            status="Hãy nhập đủ thông tin !!"
            hide={!hide ? false : true}
          />
        ) : (
          ""
        )}
      </div>
    </Helmet>
  );
};

export default Cart;
