import { BsMap, BsClock } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { BsTelephoneFill } from "react-icons/bs";
import guest from "../assets/fake-data/guest";
import { useRef } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import Popup from "../components/Popup";
import { useState,useEffect } from "react";
const Contact = () => {
  console.log(guest.length);
  const renderRandomGuest = guest.sort(() => 0.5 - Math.random());
  console.log(renderRandomGuest);
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const [done, setDone] = useState(false);
  const [response, setResponse] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setHide(false);

    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      subjectRef.current.value === ""
    ) {
      setResponse(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
    } else {
      setResponse(true);

      setTimeout(() => {
        setHide(true);
      }, 3000);
    }
  };

  return (
    <div className="contact-container-full">
      <div className="contact-container">
        <div className="contact-details">
          <span>Liên hệ với chúng tôi</span>
          <h2>Ghé qua cửa hàng hoặc liên hệ trực tiếp nha !!</h2>
          <h3>Cửa hàng chính</h3>
          <div>
            <li>
              <i>
                <BsMap />
              </i>
              <p>432 Trần Hưng Đạo , Ngô Quyền , Hải Phòng</p>
            </li>
            <li>
              <i>
                <GoMail />
              </i>
              <p>minhthangtrang1606@gmail.com</p>
            </li>
            <li>
              <i>
                <BsTelephoneFill />
              </i>
              <p>0865594628</p>
            </li>
            <li>
              <i>
                <BsClock />
              </i>
              <p>8 A.M - 10 P.M</p>
            </li>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.3352431302233!2d106.6831174147601!3d20.858533586090843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af3ca72fd7f%3A0xf00d3da1683acf9!2zVHLhuqduIEjGsG5nIMSQ4bqhbywgSG_DoG5nIFbEg24gVGjhu6UsIEjhu5NuZyBCw6BuZywgSOG6o2kgUGjDsm5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1646219651868!5m2!1svi!2s"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="contact-form">
        <form action="">
          <span>Gửi thư cho chúng tôi</span>
          <h2>Mong chờ đón nhận phản hồi từ bạn !!</h2>
          <input type="text" placeholder="Tên của bạn" ref={nameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="text" placeholder="Nghề nghiệp" ref={subjectRef} />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Lời bạn muốn nói ..."
          ></textarea>
          <button className="normal" type="submit" onClick={onSubmit}>
            Gửi
          </button>
        </form>
        <div className="contact-people">
          {renderRandomGuest.slice(0, 3).map((item) => (
            <div className="guest-box">
              <img src={item.img} alt="" />
              <div>
                <h3>- {item.name}</h3>
                <span>- {item.job}</span>

                <p> - Phone : {item.phone}</p>

                <span>- Email : {item.mail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {done && response ? (
        <Popup
          icon={<BsCheckCircleFill style={{ color: "green" }} />}
          status="Cảm ơn về phản hồi của bạn !!"
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
  );
};

export default Contact;
