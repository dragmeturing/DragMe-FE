import React from "react";
import { shallow } from "enzyme";
import ResultCard from "../ResultCard";
import { shows } from "../../utilities/mockData";

describe("ResultCard", () => {
  let wrapper, mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    wrapper = shallow(
      <ResultCard data={shows[0]} navigation={{ navigate: mockNavigate }} />
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
