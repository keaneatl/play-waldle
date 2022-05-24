import { render, screen } from "../utils/test-utils";
import Home from "../pages/index";
import "@testing-library/jest-dom";

test("it renders the right heading for the day", () => {
  render(<Home />);

  const heading = screen.getByRole("heading", {
    name: /waldle #1/i, // change to be dynamic
  });

  expect(heading).toBeInTheDocument();
});

test("it renders the poster", () => {
  render(<Home />);

  const displayImage = screen.getByAltText(
    /prehisoria - a collaboration of 31 pixeljoint artists/i
  );
  expect(displayImage).toMatchSnapshot();
});
