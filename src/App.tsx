import React, { useState } from "react";
import "./App.css";
import Home from "./components/home/home";
import {
  ColorPicker,
  ConfigProvider,
  FloatButton,
  Popover,
  Radio,
  RadioChangeEvent,
  Row,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";

function App() {
  const [primary, setPrimary] = React.useState("#91B5E7");
  const [primary1, setPrimary1] = React.useState("#91B5E7");
  // const [primary2, setPrimary2] = React.useState("#91B5E7");
  const [primary3, setPrimary3] = React.useState("#91B5E7");

  const [value3, setValue3] = useState("Apple");
  const options = [
    { label: "Default", value: "default" },
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "Custom", value: "custom" },
  ];

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio3 checked", value);
    setValue3(value);
    if (value === "dark") {
      setPrimary1("black");
    } else if (value === "light") {
      setPrimary1("#fff");
    } else if (value === "custom") {
      // setPrimary1('#fff')
    }
  };

  const setAllBG = (color: any) => {
    setPrimary1(color)
    document.documentElement.style.setProperty('--chat-message-bg',color);
  }


  // changeColor = (colorCode: any) => {
  //   window.less.modifyVars({
  //     '@primary-color`: colorCode
  //   });     
  // }
  const content = (
    <>
      <Radio.Group
        options={options}
        onChange={onChange3}
        value={value3}
        optionType="button"
      />
      {value3 === "custom" && (
        <div>
          <Row className="color-picker-containar">
            <label htmlFor="text">Text</label>
          <ColorPicker
            showText
            value={primary}
            defaultFormat="rgb"
            onChangeComplete={(color) => setPrimary(color.toHexString())}
          />
          </Row>
          <Row className="color-picker-containar">
            <label htmlFor="text">All Background Color</label>
          <ColorPicker
            showText
            value={primary1}
            defaultFormat="rgb"
            onChangeComplete={(color) => setAllBG(color.toHexString()) }
          />
          </Row>
          {/* <Row className="color-picker-containar">
            <label htmlFor="text">Text</label>
          <ColorPicker
            showText
            value={primary2}
            defaultFormat="rgb"
            onChangeComplete={(color) => setPrimary2(color.toHexString())}
          />
          </Row> */}
          <Row className="color-picker-containar">
            <label htmlFor="text">Placeholder text</label>
          <ColorPicker
            showText
            value={primary3}
            defaultFormat="rgb"
            onChangeComplete={(color) => setPrimary3(color.toHexString())}
          />
          </Row>
        </div>
      )}
    </>
  );

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
            colorBgContainer: primary1,
            colorText: primary,
            colorTextPlaceholder: primary3,
            colorTextLabel: primary,
            // colorTextLightSolid: primary,
            // colorFillAlter: primary,
            // colorHighlight: primary,
            // colorBgBase: primary,
          },
        }}
      >
        <div className="main-bg">
          <Home />
          <Popover content={content} title="Title" trigger="click">
            <FloatButton
              icon={<SettingOutlined />}
              className="theme-setting"
              onClick={() => console.log("onClick")}
            />
          </Popover>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
