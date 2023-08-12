import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
export default function Sendmessage({ data, setStatus }) {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const handleCancel = () => {
    setShow(false);
    setStatus(false);
  };
  const handleSend = () => {
    const detail = { email: data.email, message: message, count: "1" };
    try {
      fetch("http://127.0.0.1:2022/olx_clone/sendMessage", {
        method: "POST",
        body: JSON.stringify(detail),
      })
        .then((response) => {
          if (response.ok) {
            alert("Message sent successfully");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert("error occur in sending the message " + error);
          window.location.reload();
        });
    } catch (error) {
      alert("error occur in sending the message " + error);
      window.location.reload();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleSend} centered>
        <Modal.Title>Type your Message here</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group controlId="message">
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
    </>
  );
}
