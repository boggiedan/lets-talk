import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MessageList from "./MessageList";
import Message from "./message/Message";

describe("Test MessageList component", () => {
  let component;

  const messages = [
    {
      id: "id",
      value: "value",
      username: "username",
      datetime: "datetime",
      userId: "userId"
    }
  ];

  it("should render match snapshot", () => {
    component = shallow(<MessageList messages={[]} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should render messages", () => {
    component = shallow(<MessageList messages={messages} />);
    expect(component.find(Message).length).toEqual(1);
  });
});
