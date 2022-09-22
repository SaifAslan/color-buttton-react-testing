import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelCaseWithSpaces } from "./App";

test("Button has correct initial color", () => {
  render(<App />);
  //find an element with a role button and a text of 'Change to blue'
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorBtn).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Button turn blue when clicked", () => {
  render(<App />);
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  fireEvent.click(colorBtn);
  expect(colorBtn).toHaveTextContent("Change to Medium Violet Red");
  expect(colorBtn).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

test("intial state", () => {
  render(<App />);

  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox");

  expect(colorBtn).toBeEnabled();

  fireEvent.click(checkBox);
  expect(colorBtn).toBeDisabled();

  fireEvent.click(checkBox);
  expect(colorBtn).toBeEnabled();
});

test("check disabled will over ride the button color", () => {
  render(<App />);
  const checkBox = screen.getByRole("checkbox", { name: "disable button" });
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "grey" });
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(colorBtn);
  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "grey" });

  fireEvent.click(checkBox);
  expect(colorBtn).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
  });
  test("works for one capital letter", () => {
    expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("works for multiple ca[ital-letters", () => {
    expect(replaceCamelCaseWithSpaces("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
