import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Components from "@rhinolabs/ui";

describe("Component behavior tests", () => {
  // 1. Button onClick
  describe("Button", () => {
    it("calls onClick handler when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Components.Button onClick={handleClick}>Click me</Components.Button>);

      await user.click(screen.getByRole("button", { name: "Click me" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // 2. Toggle state
  describe("Toggle", () => {
    it("toggles data-state from off to on when clicked", async () => {
      const user = userEvent.setup();

      render(<Components.Toggle aria-label="Toggle bold">Bold</Components.Toggle>);

      const toggle = screen.getByRole("button", { name: "Toggle bold" });
      expect(toggle).toHaveAttribute("data-state", "off");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("data-state", "on");
    });
  });

  // 3. Checkbox state
  describe("Checkbox", () => {
    it("becomes checked when clicked", async () => {
      const user = userEvent.setup();

      render(<Components.Checkbox aria-label="Accept terms" />);

      const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
      expect(checkbox).toHaveAttribute("data-state", "unchecked");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("data-state", "checked");
    });
  });

  // 4. Switch state
  describe("Switch", () => {
    it("toggles when clicked", async () => {
      const user = userEvent.setup();

      render(<Components.Switch aria-label="Airplane mode" />);

      const switchEl = screen.getByRole("switch", { name: "Airplane mode" });
      expect(switchEl).toHaveAttribute("data-state", "unchecked");

      await user.click(switchEl);
      expect(switchEl).toHaveAttribute("data-state", "checked");
    });
  });

  // 5. Accordion expand
  describe("Accordion", () => {
    it("expands content when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Components.Accordion type="single" collapsible>
          <Components.Accordion.Item value="item-1">
            <Components.Accordion.Trigger>Section 1</Components.Accordion.Trigger>
            <Components.Accordion.Content>Content for section 1</Components.Accordion.Content>
          </Components.Accordion.Item>
        </Components.Accordion>,
      );

      const trigger = screen.getByRole("button", { name: "Section 1" });
      expect(trigger).toHaveAttribute("data-state", "closed");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("data-state", "open");
    });
  });

  // 6. Tabs switching
  describe("Tabs", () => {
    it("switches content when a different tab is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Components.Tabs defaultValue="tab1">
          <Components.Tabs.List>
            <Components.Tabs.Trigger value="tab1">Tab 1</Components.Tabs.Trigger>
            <Components.Tabs.Trigger value="tab2">Tab 2</Components.Tabs.Trigger>
          </Components.Tabs.List>
          <Components.Tabs.Content value="tab1">Content 1</Components.Tabs.Content>
          <Components.Tabs.Content value="tab2">Content 2</Components.Tabs.Content>
        </Components.Tabs>,
      );

      // Tab 1 is active by default
      expect(screen.getByText("Content 1")).toBeInTheDocument();

      // Click Tab 2
      await user.click(screen.getByRole("tab", { name: "Tab 2" }));

      // Content 2 should now be visible
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });

  // 7. Input typing
  describe("Input", () => {
    it("updates value when user types", async () => {
      const user = userEvent.setup();

      render(<Components.Input placeholder="Type here" />);

      const input = screen.getByPlaceholderText("Type here");
      await user.type(input, "Hello world");

      expect(input).toHaveValue("Hello world");
    });
  });

  // 8. Textarea typing
  describe("Textarea", () => {
    it("updates value when user types", async () => {
      const user = userEvent.setup();

      render(<Components.Textarea placeholder="Enter description" />);

      const textarea = screen.getByPlaceholderText("Enter description");
      await user.type(textarea, "Some text content");

      expect(textarea).toHaveValue("Some text content");
    });
  });

  // 9. Select opening
  // Note: Radix Select uses hasPointerCapture which is not implemented in happy-dom.
  // We test that it renders correctly; interactive opening requires a real browser.
  describe("Select", () => {
    it("renders trigger with placeholder", () => {
      render(
        <Components.Select>
          <Components.Select.Trigger aria-label="Select a fruit">
            <Components.Select.Value placeholder="Pick a fruit" />
          </Components.Select.Trigger>
          <Components.Select.Content>
            <Components.Select.Item value="apple">Apple</Components.Select.Item>
            <Components.Select.Item value="banana">Banana</Components.Select.Item>
          </Components.Select.Content>
        </Components.Select>,
      );

      const trigger = screen.getByRole("combobox", { name: "Select a fruit" });
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
    });
  });

  // 10. Slider renders with default value
  describe("Slider", () => {
    it("renders with the correct default value", () => {
      render(<Components.Slider defaultValue={[50]} max={100} step={1} />);

      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute("aria-valuenow", "50");
    });
  });

  // 11. RadioGroup selection
  describe("RadioGroup", () => {
    it("selects an item when clicked", async () => {
      const user = userEvent.setup();

      render(
        <Components.RadioGroup>
          <Components.RadioGroup.Item value="option1" aria-label="Option 1" />
          <Components.RadioGroup.Item value="option2" aria-label="Option 2" />
        </Components.RadioGroup>,
      );

      const option1 = screen.getByRole("radio", { name: "Option 1" });
      const option2 = screen.getByRole("radio", { name: "Option 2" });

      expect(option1).not.toBeChecked();
      expect(option2).not.toBeChecked();

      await user.click(option1);
      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();
    });
  });

  // 12. Collapsible toggle
  describe("Collapsible", () => {
    it("toggles content visibility when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Components.Collapsible>
          <Components.Collapsible.Trigger>Toggle</Components.Collapsible.Trigger>
          <Components.Collapsible.Content>Hidden content</Components.Collapsible.Content>
        </Components.Collapsible>,
      );

      // Content should be hidden initially
      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("data-state", "closed");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("data-state", "open");
      expect(screen.getByText("Hidden content")).toBeInTheDocument();
    });
  });

  // 13. NativeSelect options
  describe("NativeSelect", () => {
    it("renders with options in the DOM", () => {
      render(
        <Components.NativeSelect aria-label="Choose color">
          <Components.NativeSelect.Option value="red">Red</Components.NativeSelect.Option>
          <Components.NativeSelect.Option value="blue">Blue</Components.NativeSelect.Option>
          <Components.NativeSelect.Option value="green">Green</Components.NativeSelect.Option>
        </Components.NativeSelect>,
      );

      const select = screen.getByRole("combobox", { name: "Choose color" });
      const options = within(select).getAllByRole("option");

      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent("Red");
      expect(options[1]).toHaveTextContent("Blue");
      expect(options[2]).toHaveTextContent("Green");
    });
  });

  // 14. MultipleSelect renders with placeholder
  describe("MultipleSelect", () => {
    it("renders with placeholder when no values selected", () => {
      render(
        <Components.MultipleSelect
          options={["Apple", "Banana", "Cherry"]}
          value={[]}
          onChange={() => {}}
          placeholder="Select fruits"
        />,
      );

      expect(screen.getByText("Select fruits")).toBeInTheDocument();
    });
  });

  // 15. Dialog open/close
  describe("Dialog", () => {
    it("opens when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Components.Dialog>
          <Components.Dialog.Trigger>Open Dialog</Components.Dialog.Trigger>
          <Components.Dialog.Content>
            <Components.Dialog.Title>Dialog Title</Components.Dialog.Title>
            <Components.Dialog.Description>Dialog description text</Components.Dialog.Description>
          </Components.Dialog.Content>
        </Components.Dialog>,
      );

      // Dialog content should not be visible initially
      expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();

      // Click trigger to open
      await user.click(screen.getByRole("button", { name: "Open Dialog" }));

      // Dialog content should now be visible
      expect(screen.getByText("Dialog Title")).toBeInTheDocument();
      expect(screen.getByText("Dialog description text")).toBeInTheDocument();
    });
  });

  // 16. Badge content
  describe("Badge", () => {
    it("renders children text", () => {
      render(<Components.Badge>New</Components.Badge>);
      expect(screen.getByText("New")).toBeInTheDocument();
    });
  });

  // 17. Alert content
  describe("Alert", () => {
    it("renders children text with alert role", () => {
      render(
        <Components.Alert>
          <Components.Alert.Title>Warning</Components.Alert.Title>
          <Components.Alert.Description>Something happened</Components.Alert.Description>
        </Components.Alert>,
      );

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Warning")).toBeInTheDocument();
      expect(screen.getByText("Something happened")).toBeInTheDocument();
    });
  });

  // 18. Card structure
  describe("Card", () => {
    it("renders all sub-components", () => {
      render(
        <Components.Card>
          <Components.Card.Header>
            <Components.Card.Title>Card Title</Components.Card.Title>
          </Components.Card.Header>
          <Components.Card.Content>Card body content</Components.Card.Content>
          <Components.Card.Footer>Card footer</Components.Card.Footer>
        </Components.Card>,
      );

      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card body content")).toBeInTheDocument();
      expect(screen.getByText("Card footer")).toBeInTheDocument();
    });
  });
});
