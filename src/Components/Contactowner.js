import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
export default function Contactowner({ setstatusowner }) {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleCancel = () => {
    setShow(false);
    setstatusowner(false);
  };
  const handleSend = () => {
    if (message === "" || email === "") {
      alert("plzz input the field first");
      return;
    }
    const data = { email: email, message: message, count: "0" };
    try {
      fetch("http://127.0.0.1:2022/olx_clone/sendMessage", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("Message sent successfully");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert("error occur in sending message " + error);
          window.location.reload();
        });
    } catch (error) {
      alert("Error in sending message " + error);
      window.location.reload();
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleSend} centered>
        <Modal.Title>Type your Message here</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
