import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const SendMailOrder = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4bzeg5e', 'template_ulcz6dg', form.current, '2QVLowuJSd6aP7lpj')
      .then((result) => {
          alert('Gửi thông tin đơn hàng thành công!');
          console.log(result.text);
      }, (error) => {
          console.error(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="p-3">
      <div className="mb-3">
        <label className="form-label fw-semibold">Họ và tên</label>
        <input type="text" name="user_name" className="form-control" placeholder="Nhập họ và tên" required />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Địa chỉ Email</label>
        <input type="email" name="user_email" className="form-control" placeholder="name@example.com" required />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Nội dung tin nhắn</label>
        <textarea name="message" className="form-control" rows="3" placeholder="Nhập nội dung cần hỗ trợ..." required />
      </div>
      <button type="submit" className="btn btn-primary">Gửi liên hệ</button>
    </form>
  );
};