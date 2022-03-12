import React from "react";

import { Link } from "react-router-dom";

import Grid from "./Grid";

import logo from "../assets/images/Logo-2.png";
import { useEffect } from "react";

const footerAboutLinks = [
  {
    display: "Giới thiệu",
    path: "/contact",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
  {
    display: "Tuyển dụng",
    path: "/contact",
  },
  {
    display: "Tin tức",
    path: "/blog",
  },
];

const footerCustomerLinks = [
  {
    display: "Chính sách đổi trả",
    path: "/contact",
  },
  {
    display: "Chính sách bảo hành",
    path: "/contact",
  },
  {
    display: "Chính sách hoàn tiền",
    path: "/contact",
  },
];
const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">BKshoe</div>
            <div className="footer__content">
              <p>
                SĐT : <strong>0865594628</strong>
              </p>
              <p>
                Email : <strong>minhthangtran1606@gmail.com</strong>
              </p>
              <p>
                Địa chỉ : <strong>432 Trần Hùng Đạo , Ngô Quyền , Hải Phòng</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">Website</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">Chăm sóc khách hàng</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">
                <img src={logo} className="footer__logo" alt="" />
              </Link>
            </p>
            <p>
              BKshoe là nhãn hiệu bán lẻ giày với trọng tâm hướng về bóng rổ.
              Các sản phẩm chủ yếu là giày bóng rổ, giày Jordan retro. Bên cạnh
              đó BKshoe cũng là kênh truyền thông cho cộng đồng bóng rổ ở cả
              nước.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
