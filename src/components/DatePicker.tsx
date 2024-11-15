import * as React from "react";
import { Datepicker as RNDatePicker, DatepickerProps } from "flowbite-react";
import { convert } from "@/src/utils/fileSizeCalculator";
import Label from "@/src/components/Label";
import { useField } from "formik";

interface Props extends DatepickerProps {
  name: string;
  label?: string;
}

export default function DatePicker({ name, label }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(
    field?.value ?? null
  );

  const onChange = React.useCallback(
    (date: Date) => {
      const formattedDate = convert(date.toString());
      setSelectedDate(formattedDate);
      helpers.setValue(formattedDate);
    },
    [helpers]
  );

  const emptyProps = {
    value: selectedDate || "",
    placeholder: "Select date",
  };

  return (
    <div>
      {label !== undefined && <Label>{label}</Label>}
      <RNDatePicker {...emptyProps} onSelectedDateChanged={onChange} />
    </div>
  );
}
