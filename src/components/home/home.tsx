import { useEffect, useRef, useState } from "react";
import "./home.css";
import { Input, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Message, { MessageData } from "../models/messageModal";
import MessageList from "../messageList/messageList";
export default function Home() {
  let [message, setNewMessage] = useState<Message[]>([]);
  let [messageInput, setMessageInput] = useState("");
  let [isScroll, setScroll] = useState(false);
  const [delay, setDelay] = useState(1000);
  const div = useRef<HTMLDivElement>(null);

  // To scroll down when the message list is overflowing
  useEffect(() => {
    setScroll(false);
    if (div.current) {
      div.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isScroll]);

  // Adding new message to the array to display
  const addNewMessage = () => {
    if (messageInput !== "") {
      let newMessage = message;
      setNewMessage([
        ...newMessage,
        { message: messageInput, fromUser: true, image: "" },
      ]);
      setMessageInput("");
      setScroll(true);
      return message;
    }
  };

  // to get query params for delay message bubble
  useEffect(() => {
    setNewMessage([]);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const timmer = params.get("delay");
    if (timmer) {
      var time = parseInt(timmer);
      setDelay(time);
    }
    const timeoutIds = MessageData.map((item, index) =>
      setTimeout(() => {
        setNewMessage((prevArray) => [...prevArray, item]);
      }, index * delay)
    );

    // Clean up timeouts when component unmounts
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [delay]);

  // Send message when enter is pressed
  const onPressEnter = (event: any) => {
    if (event.keyCode === 13) {
      addNewMessage();
    }
  };
  return (
    <>
      {/* <div className="main-chat-containar"> */}
        <div className="inner-chat-containar">
          <div className="chat-message-text">
            {message.map((item: any, index: number) => (
              <MessageList
                key={index}
                message={item.message}
                fromUser={item.fromUser}
                index={index}
                image={item.image}
              />
            ))}
          </div>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="Enter message"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
              onKeyDown={onPressEnter}
            />
            <SendOutlined
              className="send-icon"
              onClick={() => addNewMessage()}
            />
          </Space.Compact>
          <div ref={div}></div>
        </div>
      {/* </div> */}
    </>
  );
}
