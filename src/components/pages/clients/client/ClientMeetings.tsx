import { GetClientMeeting } from "@/src/apis";
import useApi from "@/src/hooks/useApi";
import { MeetingType } from "@/src/types"; // Assuming you have a MeetingType defined
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import useToast from "@/src/hooks/useToast";

interface Props {
  clientId: string;
  openMeetingAddModal: () => void;
}

const ClientMeeting = ({ clientId }: Props) => {
  const { makeApiCall } = useApi();
  const agent_id = localStorage.getItem("id");
  const { showToast } = useToast();

  const [meetings, setMeetings] = React.useState<MeetingType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure(); // State for meeting modal visibility
  const {
    isOpen: isOpenReminder,
    onOpen: onOpenReminder,
    onClose: onCloseReminder,
  } = useDisclosure(); // State for reminder modal visibility

  const [meetingData, setMeetingData] = React.useState({
    client_id: parseInt(clientId), // Initialize with clientId from props
    client_name: "",
    date: "",
    details: "",
    agent_id: parseInt(agent_id), // Initialize with agent_id
    send_to_client: false,
  });

  const [reminderData, setReminderData] = React.useState({
    meeting_id: "", // Initialize with clientId from props
    date: "",
    details: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setMeetingData({ ...meetingData, [name]: newValue });
  };

  const handleInputChangeReminder = (event) => {
    const { name, value } = event.target;
    setReminderData({ ...reminderData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://staging.api.mypolicymate.in/api/meetings",
        {
          // Replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(meetingData),
        }
      );

      if (response.ok) {
        // Handle successful meeting creation (e.g., close modal, refresh meetings list)
        onClose();
      } else {
        // Handle error (e.g., display  message)

        console.error("Failed to add meeting");
        // ... your error handling logic
      }
    } catch (error) {
      console.error("Error adding meeting:", error);
      // ... your error handling logic
    }
  };

  const handleReminderSubmit = async () => {
    try {
      const response = await fetch(
        "https://staging.api.mypolicymate.in/api/reminders",
        {
          // Replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(reminderData),
        }
      );

      if (response.status === 200) {
        // Handle successful meeting creation (e.g., close modal, refresh meetings list)
        onCloseReminder();
        showToast("Reminder Added Successfully", { type: "success" });
        // ... your success handling logic
      } else {
        // Handle error (e.g., display error message)
        console.error("Failed to add meeting");
        // ... your error handling logic
      }
    } catch (error) {
      console.error("Error adding meeting:", error);
      // ... your error handling logic
    }
  };

  React.useEffect(() => {
    const fetchMeetings = async () => {
      setIsLoading(true);
      try {
        const response = await makeApiCall(
          GetClientMeeting(clientId, agent_id)
        );
        console.log("Meeting list response", response);

        if (response.meetings != null) {
          // Access meetings from the response
          setMeetings(response.meetings);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [clientId, agent_id, makeApiCall]);

  const columns = [
    { name: "ID", key: "ID" },
    { name: "Date", key: "date" },
    { name: "Client Name", key: "client_name" },
    { name: "Details", key: "details" },
    { name: "Reminder", key: "reminder" },
  ];

  const renderCell = React.useCallback(
    (meeting: MeetingType, columnKey: string) => {
      switch (columnKey) {
        case "ID":
          return <span>{meeting.ID}</span>;
        case "date":
          return <span>{meeting.date}</span>;
        case "client_name":
          return <span>{meeting.client_name}</span>;
        case "details":
          return <span>{meeting.details}</span>;
        case "reminder":
          return (
            <span
              onClick={() => {
                setReminderData({
                  ...reminderData,
                  meeting_id: meeting.ID.toString(),
                }); // Set meetingID when opening the modal
                onOpenReminder();
              }}
              style={{
                backgroundColor: "#eae2f0",
                borderRadius: "11px",
                fontSize: "12px",
                color: "#6d42db",
                padding: "6px 10px", // Add some padding for better visual appearance
                cursor: "pointer", // Add cursor style to indicate it's clickable
              }}
            >
              Set Reminders
            </span>
          );
        default:
          return null;
      }
    },
    [onOpenReminder, reminderData]
  );

  return (
    <div className="mt-[8%]">
      <div className="flex flex-row justify-between items-center  mb-6">
        <h1 className="text-black text-lg font-light font-rubik">
          Add New Meeting
        </h1>
        <Button
          style={{ color: "white" }}
          className=" bg-yellow-500"
          onClick={onOpen}
        >
          Add Meeting
        </Button>
      </div>
      {isLoading ? (
        <Spinner label="Loading meetings..." />
      ) : meetings.length === 0 ? (
        <div>No meetings available.</div>
      ) : (
        <Table isStriped aria-label="Client meetings table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={meetings}>
            {(item) => (
              <TableRow key={item.ID}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add New Meeting</ModalHeader>
              <ModalBody>
                <Input
                  label="Client Name"
                  name="client_name"
                  value={meetingData.client_name}
                  onChange={handleInputChange}
                />
                <Input
                  label="Date (YYYY-MM-DD)"
                  name="date"
                  value={meetingData.date}
                  onChange={handleInputChange}
                />
                <Input
                  label="Details"
                  name="details"
                  value={meetingData.details}
                  onChange={handleInputChange}
                />
                <label>
                  <input
                    type="checkbox"
                    name="send_to_client"
                    checked={meetingData.send_to_client}
                    onChange={handleInputChange}
                  />
                  Send to Client
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenReminder} onClose={onCloseReminder}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Add Reminder</ModalHeader>
              <ModalBody>
                <Input
                  label="Reminder Date (YYYY-MM-DD)"
                  name="date"
                  value={reminderData.date}
                  onChange={handleInputChangeReminder}
                />
                <Input
                  label="Details"
                  name="details"
                  value={reminderData.details}
                  onChange={handleInputChangeReminder}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleReminderSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClientMeeting;
