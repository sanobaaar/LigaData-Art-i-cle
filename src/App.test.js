import { fireEvent, render, screen } from "@testing-library/react"
import ButtonComponent from "./components/ButtonComponent"


// test("renders learn react link", () => {
//   render(<App />)
//   const linkElement = screen.getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })

test("ButtonComponent renders correctly", () => {
  const onClick = jest.fn()
  const { getByText } = render(<ButtonComponent onClick={onClick} label="Click Me" />)

  const button = screen.getByText("Click Me")
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalled()
})

