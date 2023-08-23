import { ComponentProps, useEffect, useState } from "react";
import { Combobox as HCombobox } from "@headlessui/react";

export function App() {
  // const [defaultValue, setDefaultValue] = useState({
  //   value: "100",
  //   label: "default",
  // });

  // useEffect(() => {
  //   const timeout = setTimeout(
  //     () => setDefaultValue({ value: "200", label: "new value" }),
  //     10000
  //   );
  //   return () => clearTimeout(timeout);
  // }, [setDefaultValue]);

  return (
    <Combobox
      name="uncontrolled-combobox"
      defaultValue={{
        value: "100",
        label: "default",
      }}
      placeholder="Search"
      options={[
        {
          value: "100",
          label: "default",
        },
        {
          value: "200",
          label: "new value",
        },
        {
          value: "300",
          label: "3 houndreds",
        },
      ]}
    />
  );
}

type OptionProps = { label: string; value: string };

type ComboboxProps<T extends OptionProps> = ComponentProps<
  typeof HCombobox<T>
> & {
  placeholder: string;
  options?: T[];
};

export function Combobox({
  options = [],
  placeholder,
  ...comboboxProps
}: ComboboxProps<OptionProps>) {
  return (
    <HCombobox<OptionProps> {...comboboxProps}>
      <HCombobox.Input<OptionProps["value"]>
        displayValue={(value) =>
          options.find((item) => item.value === value)?.label ??
          (comboboxProps.defaultValue?.label as string)
        }
        // placeholder={placeholder}
      />
      <HCombobox.Options>
        {options.length > 0 ? (
          options.map((item) => (
            <HCombobox.Option key={item.value} value={item.value}>
              {item.label}
            </HCombobox.Option>
          ))
        ) : (
          <HCombobox.Option value="" disabled>
            No results
          </HCombobox.Option>
        )}
      </HCombobox.Options>
    </HCombobox>
  );
}

export default App;
