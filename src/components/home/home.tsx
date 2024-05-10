import { useState } from "react";
import "./home.css";
import { Button, Card, Col, Input, Row, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
export default function Home() {
  let [message, setNewMessage] = useState([
    { message: "Hi there", fromUser: false },
    { message: "How can I help You?", fromUser: false },
  ]);

  let [messageInput, setMessageInput] = useState("");

  const pushData = () => {
    let newMessage = message;
    console.log("message: ");
    console.log("messageInput: ", messageInput);

    setNewMessage([...newMessage, { message: messageInput, fromUser: true }]);
    // message = [...newMessage]
    console.log("newMessage: ", newMessage);

    return message;
  };
  return (
    <>
      <div className="main-chat-containar">
        <div className="inner-chat-containar">
          <div className="chat-message-text">

          
          {message.map((item: any, index: number) => (
            <Row gutter={5} className="">
              <Col span={24} className={item.fromUser ? 'chat-card' : ''}>
                <Card
                  style={{ width: "fit-content" }}
                  key={index}
                  className="message-card"
                >
                  <div className="chat-message">
                    <span> {item.message} </span>
                  </div>
                </Card>
              </Col>
            </Row>
          ))}
          </div>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Enter message"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
            />
            <Button type="primary" className="send-icon" onClick={() => pushData()} shape="default" icon={ <SendOutlined  />} />
           
          </Space.Compact>
        </div>
      </div>
    </>
  );
}
