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
import { ThemeOptions } from "./components/models/themeModal";

function App() {
  const [primary, setPrimary] = React.useState("#00000");
  const [containarBGColor, setContainarBGColor] = React.useState("#fff");
  const [baseBGColor, setBaseBGColor] = React.useState("#fff");
  const [themeValue, setThemeValue] = useState("light");
  const themeOptions = ThemeOptions;

  // Change default theme variable
  const onChangeThemeValue = ({ target: { value } }: RadioChangeEvent) => {
    setThemeValue(value);
    if (value === "dark") {
      changeThemeVariable("--main-bg-color-grad-1", `rgb(151, 150, 150) 63%`);
      changeThemeVariable("--main-bg-color-grad-2", `#5e5d5d 94.92%`);
      changeThemeVariable("--chat-message-bg", "#4d4d4d");
      changeThemeVariable("--enter-icon", "#ffffff");
      setPrimary("#fff");
      setContainarBGColor("#4D4D4D");
      setBaseBGColor("#4D4D4D");
    } else if (value === "light") {
      setContainarBGColor("#fff");
      setBaseBGColor("#fff");
      setPrimary("#000");
      changeThemeVariable("--main-bg-color-grad-1", ` #DDEEED 63.17%`);
      changeThemeVariable("--main-bg-color-grad-2", ` #FDF1E0 94.92%`);
      changeThemeVariable("--enter-icon", "#0000 100%");
      changeThemeVariable("--chat-message-bg", "#fff");
    }
  };

  const changeThemeVariable = (variable: string, value: any) => {
    document.documentElement.style.setProperty(variable, value);
  };

  const setContainarBackground = (color: any) => {
    setContainarBGColor(color);
    changeThemeVariable("--chat-message-bg", color);
  };

  const componentBGColorChange = (color: any) => {
    setBaseBGColor(color.toHexString());
    const min = 1;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    var newGradient = color.toRgb();
    newGradient.b += randomNumber;
    newGradient.g += randomNumber;
    newGradient.r += randomNumber;
    newGradient = `rgb(${newGradient.r}, ${newGradient.g}, ${newGradient.b})`;
    changeThemeVariable("--main-bg-color-grad-1", `${newGradient} 63%`);
    changeThemeVariable(
      "--main-bg-color-grad-2",
      `${color.toHexString()} 94.92%`
    );
  };

  const setTextColor = (color: any) => {
    setPrimary(color);
    changeThemeVariable("--enter-icon", color);
  };

  const content = (
    <div className="setting-pop-over">
      <Radio.Group
        options={themeOptions}
        onChange={onChangeThemeValue}
        value={themeValue}
        optionType="button"
      />
      {themeValue === "custom" && (
        <div>
          <Row className="color-picker-containar">
            <label htmlFor="text">Text</label>
            <ColorPicker
              showText
              value={primary}
              defaultFormat="rgb"
              onChangeComplete={(color) => setTextColor(color.toHexString())}
            />
          </Row>
          <Row className="color-picker-containar">
            <label htmlFor="text">Component Background Color</label>
            <ColorPicker
              showText
              value={containarBGColor}
              defaultFormat="rgb"
              onChangeComplete={(color) => setContainarBackground(color.toHexString())}
            />
          </Row>
          <Row className="color-picker-containar">
            <label htmlFor="text">Base Background color</label>
            <ColorPicker
              showText
              value={baseBGColor}
              defaultFormat="hex"
              onChangeComplete={(color) => componentBGColorChange(color)}
            />
          </Row>
        </div>
      )}
    </div>
  );

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
            colorBgContainer: containarBGColor,
            colorText: primary,
            colorTextPlaceholder: primary,
            colorTextLabel: primary,
            colorBgBase: baseBGColor,
          },
        }}
      >
        <div className="main-bg">
          <Home />
          <Popover
            content={content}
            title="Setting"
            placement="topLeft"
            trigger="click"
            arrow={false}
          >
            <FloatButton
              icon={<SettingOutlined className="setting-icon" />}
              className="theme-setting"
            />
          </Popover>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
