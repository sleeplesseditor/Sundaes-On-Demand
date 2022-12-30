import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop from the server", async () => {
  render(<Options optionsType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altTextArr = scoopImages.map((element) => element.alt);
  expect(altTextArr).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping from the server", async () => {
  render(<Options optionsType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const imageAltTitles = toppingImages.map((img) => img.alt);
  expect(imageAltTitles).toStrictEqual([
    "Hot fudge topping",
    "Cherries topping",
    "M&Ms topping",
  ]);
});

test("do not update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionsType="scoops" />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});
