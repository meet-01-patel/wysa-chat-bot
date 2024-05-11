import { Row, Col, Card } from "antd";
import Message from "../models/messageModal";
import "./messageList.css";

// Message Card Component
export default function MessageList(props: Message & { index: number }) {
  return (
    <>
      <Row gutter={5} className="">
        <Col span={24} className={props.fromUser ? "chat-card" : ""}>
          <Card
            style={{ width: "fit-content" }}
            key={props.index}
            className={props.fromUser ? 'user-message-card mb-10' : "message-card mb-10"}
          >
            <div className="chat-message">
              {props.image && (
                <>
                  <img src={props.image} alt="wysa-logo" /> <br />
                </>
              )}
              <span> {props.message} </span>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
