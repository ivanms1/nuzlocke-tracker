import { useController } from "react-hook-form";
import Select, { SelectProps } from "./Select";

interface FormSelectProps extends SelectProps {
  name: string;
  // TODO: Fix this any
  control: any;
}

function FormSelect({ name, control, ...props }: FormSelectProps) {
  const { field } = useController({
    name,
    control,
  });
  return (
    <Select
      value={field.value}
      onValueChange={(value) => field.onChange(value)}
      {...props}
    />
  );
}

export default FormSelect;
