"use client";

import * as React from "react";
import { postEventApi } from "@/src/apis"; // Adjusted to match the event API
import Button from "@/src/components/Button";
import Row from "@/src/components/Row";
import Spacer from "@/src/components/Spacer";
import useApi from "@/src/hooks/useApi";
import useToast from "@/src/hooks/useToast";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "@/src/components/Input";
import DatePicker from "@/src/components/DatePicker";
import { DropdownType } from "@/src/types";
import { Dropdown } from "@/src/components/Dropdown";

interface Props {
  onClose: () => void;
  clientId: string;
}

export default function AddEvent({ onClose, clientId }: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  // Initial values for the form
  const [initialValues] = React.useState({
    date_of_event: "",
    event_type: "",
    description: "",
  });

  const EventTypeData: DropdownType[] = React.useMemo(
    () => [
      { key: "birthday", value: "Birthday" },
      { key: "anniversary", value: "Anniversary" },
      { key: "client_meeting", value: "Client Meeting" },
      { key: "follow_up", value: "Follow-Up" },
      { key: "other", value: "Other" },
    ],
    []
  );

  // Validation schema
  const validationSchema = Yup.object().shape({
    date_of_event: Yup.date().required("Event date is required"),
    event_type: Yup.string().required("Event type is required"),
    description: Yup.string().required("Description is required"),
  });

  // Submit handler
  const handleSubmit = React.useCallback(
    ({ date_of_event, event_type, description }: typeof initialValues) => {
      return makeApiCall(
        postEventApi(date_of_event, event_type, description, parseInt(clientId))
      )
        .then(() => {
          onClose();
          showToast("Event added successfully", { type: "success" });
        })
        .catch(() => showToast("Failed to add event", { type: "error" }));
    },
    [makeApiCall, clientId, onClose, showToast]
  );

  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-2xl ">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize
        >
          <FormikForm>
            <DatePicker label="Event Date" name="date_of_event" />
            <Spacer size="xs" />
            <Dropdown
              data={EventTypeData}
              label="Event Type"
              name="event_type"
            />
            <Spacer size="xs" />
            <Input
              name="description"
              label="Description"
              placeholder="Enter event description"
            />
            <Spacer size="xs" />
            <Row justifyContent="center">
              <Button color="primary">Submit</Button>
            </Row>
          </FormikForm>
        </Formik>
      </div>
    </section>
  );
}
