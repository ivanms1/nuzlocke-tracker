import { useController } from "react-hook-form";
import Combobox, { type ComboboxProps } from ".";

interface FormComboboxProps extends ComboboxProps {
  name: string;
  // TODO: Fix this any
  control: any;
}

function FormCombobox({ name, control, ...props }: FormComboboxProps) {
  const { field } = useController({
    name,
    control,
  });
  return <Combobox value={field.value} onChange={field.onChange} {...props} />;
}

export default FormCombobox;
