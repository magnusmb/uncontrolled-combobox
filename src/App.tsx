import { ComponentProps, useEffect, useState } from "react";
import { Combobox as HCombobox } from "@headlessui/react";

export function App() {
  const [defaultValue, setDefaultValue] = useState({
    value: "100",
    label: "default",
  });

  useEffect(() => {
    const timeout = setTimeout(
      () => setDefaultValue({ value: "200", label: "new value" }),
      10000
    );
    return () => clearTimeout(timeout);
  }, [setDefaultValue]);

  return (
    <Combobox
      name="uncontrolled-combobox"
      defaultValue={defaultValue}
      placeholder="Search"
      options={[defaultValue]}
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
    <HCombobox<OptionProps>
      // 2023-08-14: Combobox struggles with generics, and thinks `nullable` (and
      // `multiple`) can't be true for some reason.
      // @ts-expect-error: type 'boolean' is not assignable to type 'false' [2769]
      nullable
      {...comboboxProps}
    >
      <HCombobox.Input<OptionProps["value"]>
        displayValue={(value) =>
          options.find((item) => item.value === value)?.label ?? ""
        }
        placeholder={placeholder}
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
