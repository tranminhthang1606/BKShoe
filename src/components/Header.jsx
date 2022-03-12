import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, update, get } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo-2.png";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";
import { FcGoogle } from "react-icons/fc";
import ScrollButton from "./ScrollToTop";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { change } from "../redux/accountslice/accountslice";
import Popup from "./Popup";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALuPPcMfSpfddRADi64pejPZAy0raEsy8",
  authDomain: "basketballshoe-9bf1a.firebaseapp.com",
  databaseURL: "https://basketballshoe-9bf1a-default-rtdb.firebaseio.com",
  projectId: "basketballshoe-9bf1a",
  storageBucket: "basketballshoe-9bf1a.appspot.com",
  messagingSenderId: "157016560963",
  appId: "1:157016560963:web:71ab8a61525861c853cbf6",
  measurementId: "G-0C9PB6H9E8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Blog",
    path: "/blog",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  
  const [userLogin, setUserLogin] = useState(undefined);
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    setDone(true);
    setHide(false);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        alert(user.displayName);
        setActivate(false);
        setLogin(true);
        setResponse(true);
        setUserLogin(user.displayName);

        setTimeout(() => {
          setHide(true);
        }, 3000);

        dispatch(change(true));

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        setActivate(false);
        setResponse(false);
        setLogin(false);

        setTimeout(() => {
          setHide(true);
        }, 3000);
        // ...
      });
  };
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const [current, setCurrent] = useState(true);
  const [activate, setActivate] = useState(false);
  const headerRef = useRef(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const userRef = useRef();
  const loginRef = useRef();
  const passRef = useRef();
  const auth = getAuth();
  const [login, setLogin] = useState(false);
  const [showaccount, setShowAccount] = useState(false);
  const changeRegist = () => {
    setCurrent(false);
  };
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [response, setResponse] = useState(false);
  const [hide, setHide] = useState(false);

  const changeLogin = () => {
    setCurrent(true);
  };
  const Regist = () => {
    setDone(true);
    setHide(false);
    let email = emailRef.current.value;
    let username = userRef.current.value;
    let password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(database, "user/" + user.uid), {
          username: username,
          email: email,
        });
        setResponse(true);

        setTimeout(() => {
          setHide(true);
        }, 3000);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setResponse(false);
        setTimeout(() => {
          setHide(true);
        }, 3000);
        // ..
      });
  };

  const Login = () => {
    setDone(true);
    setHide(false);
    setResponse(true);
    const email = loginRef.current.value;
    const password = passRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setResponse(true);
        // Signed in
        const user = userCredential.user;
        const dt = new Date();
        console.log(user);

        update(ref(database, "user/" + user.uid), {
          last_login: dt,
        });
        setUserLogin(email);
        setTimeout(() => {
          setHide(true);
        }, 3000);
        setActivate(false);
        setLogin(true);
        dispatch(change(true));

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setResponse(false);

        setTimeout(() => {
          setHide(true);
        }, 3000);
        // ..
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const Logout = () => {
    setLogin(false);
    localStorage.clear();
    setShowAccount(false);
    dispatch(change(false));
  };
  const toggleAccount = () => {
    if (!showaccount) {
      setShowAccount(true);
      setActivate(true);
    } else {
      setShowAccount(false);
      setActivate(true);
    }
  };

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");
  const amount =
    localStorage.getItem("cartItems") !== null
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

  const likeList = useSelector((state) => state.showValue.product);
  const numberOfCartList = useSelector((state) => state.cartItems.mount);

  console.log(likeList);
  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="container">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="header__menu">
            <div className="header__menu__mobile-toggle" onClick={menuToggle}>
              <i className="bx bx-menu-alt-left"></i>
            </div>
            <div className="header__menu__left" ref={menuLeft}>
              <div
                className="header__menu__left__close"
                onClick={menuToggle}
              ></div>
              {mainNav.map((item, index) => (
                <div
                  key={index}
                  className={`header__menu__item header__menu__left__item ${
                    index === activeNav ? "active" : ""
                  }`}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span>{item.display}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="header__menu__right">
              <div
                className={`header__menu__item header__menu__right__item ${
                  !login ? "unactive" : "Notigroup"
                }`}
              >
                <i className="bx bx-bell">
                  <div className="notification">
                    {likeList.map((item, index) => (
                      <Link to={`/catalog/${item.slug}`} key={index}>
                        <div>
                          <p>-Bạn vừa thích :</p>
                          <span>{item.name}</span>
                          <img src={item.img} style={{ height: "40px" }} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </i>
              </div>
              <div className="header__menu__item header__menu__right__item">
                <Link to="/cart">
                  <i className="bx bx-shopping-bag">
                    <sub>{numberOfCartList}</sub>
                  </i>
                </Link>
              </div>
              <div className="header__menu__item header__menu__right__item">
                <i className="bx bx-user" onClick={toggleAccount}></i>
              </div>
              {login ? (
                <div
                  className={`${
                    !showaccount ? "account-show" : "account-hide"
                  }`}
                >
                  <span>{userLogin.slice(0, 9)}</span>
                  <p onClick={Logout}>Đăng xuất</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {done && login && response && !current ? (
          <Popup
            icon={<BsCheckCircleFill style={{ color: "green" }} />}
            status="Đăng nhập thành công !!"
            hide={!hide ? false : true}
          />
        ) : (
          ""
        )}
        {done && !response && !login && !current ? (
          <Popup
            icon={<MdCancel style={{ color: "red" }} />}
            status="Sai thông tin đăng nhập"
            hide={!hide ? false : true}
          />
        ) : (
          ""
        )}
        {done && response && !login && current ? (
          <Popup
            icon={<BsCheckCircleFill style={{ color: "green" }} />}
            status="Đăng ký thành công !!"
            hide={!hide ? false : true}
          />
        ) : (
          ""
        )}
        {done && !response && !login && current ? (
          <Popup
            icon={<MdCancel style={{ color: "red" }} />}
            status="Đăng ký sai hoặc tài khoản đã tồn tại !"
            hide={!hide ? false : true}
          />
        ) : (
          ""
        )}
      </div>
      {!login ? (
        <div className={`${activate ? "activate" : ""} account `}>
          <div className="changetab">
            <h3 className={!current ? "current" : ""} onClick={changeRegist}>
              Đăng nhập
            </h3>
            <h3 className={current ? "current" : ""} onClick={changeLogin}>
              Đăng ký
            </h3>
          </div>
          <div className="form">
            <div className={`register ${!current ? "current" : "prev"}`}>
              <div className="container">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                />

                <input
                  type="text"
                  placeholder="Tên người dùng"
                  name="username"
                  ref={userRef}
                />

                <input
                  type="password"
                  placeholder="Mật khẩu"
                  ref={passwordRef}
                  name="password"
                />

                <button className="registerButton" onClick={Regist}>
                  Đăng Ký
                </button>
              </div>
            </div>
            <div className={`login ${!current ? "current" : "prev"}`}>
              <div className="container">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={loginRef}
                />

                <input
                  type="password"
                  placeholder="Mật khẩu"
                  ref={passRef}
                  name="password"
                />
                <div className="login-outsite">
                  <p> Đăng nhập với </p>
                  <div>
                    <FcGoogle onClick={loginWithGoogle} />
                  </div>
                </div>

                <button className="registerButton" onClick={Login}>
                  Đăng Nhập
                </button>
              </div>
            </div>
          </div>
          <h4 className="back" onClick={() => setActivate(false)}>
            - Quay lại -
          </h4>
        </div>
      ) : (
        ""
      )}

      <Outlet />
      <ScrollButton />
      <Footer />
      <ProductViewModal />
    </>
  );
};

export default Header;
