import React, { useState } from "react";
//import { toast, ToastContainer } from "react-toastify";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  width: "1534px",
  height: "1943px",
  position: "absolute",
  display: "flex",
  zindex: 9999,
  flexDirection: "row",
  alignContent: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  background: "#00000090",
};

const EventsUploadPage = ({ setShowEventUpload }) => {
  const [ticketCategory, setTicketCategory] = useState([
    { Category: "", Price: "" },
  ]);

  // Handle input change
  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...ticketCategory];
    updatedTickets[index][field] = value;
    setTicketCategory(updatedTickets);
  };

  // Add new ticket category
  const handleAddCategory = () => {
    setTicketCategory([...ticketCategory, { category: "", price: "" }]);
  };

  // Remove a category
  const handleRemoveCategory = (index) => {
    const newTickets = ticketCategory.filter((_, i) => i !== index);
    setTicketCategory(newTickets);
  };

  const [uploading, setUploading] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    value: "",
    isFree: false,
    startDateTime: "",
    isPhysicalEvent: false,
    isVirtualEvent: false,
    isFeatured: true,
    Category: "",
    Price: 0,
    endDateTime: "",
    nameOfSpeaker: [""],
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format to 'YYYY-MM-DDTHH:mm' for datetime-local input
    return date.toISOString().slice(0, 16); // Removes seconds and 'Z' from ISO string
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    // Convert the selected local datetime back to an ISO string
    const formattedValue = new Date(value).toISOString(); // Adds 'Z' back for submission

    // Update state with formatted ISO date
    setEventData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSpeakerChange = (index, value) => {
    const speakers = [...eventData.nameOfSpeaker];
    speakers[index] = value;
    setEventData({ ...eventData, nameOfSpeaker: speakers });
  };

  const addSpeakerField = () => {
    setEventData({
      ...eventData,
      nameOfSpeaker: [...eventData.nameOfSpeaker, ""],
    });
  };

  const removeSpeakerField = (index) => {
    const speakers = eventData.nameOfSpeaker.filter((_, i) => i !== index);
    setEventData({ ...eventData, nameOfSpeaker: speakers });
  };

  const createEvent = async () => {
    const formData = new FormData();
    try {
      // Validate required fields
      if (!eventData.name || eventData.name.trim() === "") {
        throw new Error("Event Name is required.");
      }

      // Append data to FormData
      formData.append("EventName", eventData.name);
      formData.append("EventDescription", eventData.description || "");
      formData.append("EventCategory", eventData.category || "");
      formData.append("EventLocation", eventData.location || "");
      formData.append("EventStartDate", eventData.startDateTime || "");
      formData.append("EventEndDate", eventData.endDateTime || "");
      formData.append("Physical", eventData.isPhysicalEvent ? true : false);
      formData.append("Virtual", eventData.isVirtualEvent ? true : false);
      formData.append("IsFeatured", eventData.isFeatured ? true : false);
      // formData.append("Regular", eventData.regularTicket || 0);
      // formData.append("VIP", eventData.vipTicket || 0);
      formData.append("EventIsFree", eventData.isFree ? true : false);
      ticketCategory.forEach((ticket, index) => {
        formData.append(
          `ticketCategory[${index}][Category]`,
          ticket.Category
        );
        formData.append(`ticketCategory[${index}][Price]`, ticket.Price);
      });
      if (eventData.image) {
        formData.append("Image", eventData.image); // File object from input
      } else {
        throw new Error("Please upload an event banner image.");
      }

      // Append speakers
      if (Array.isArray(eventData.nameOfSpeaker)) {
        formData.append("Speakers", JSON.stringify(eventData.nameOfSpeaker));
      } else {
        throw new Error("Speakers must be an array.");
      }

      console.log(formData);

      // Send FormData to API
      const response = await fetch(
        "https://ovbiedo-event-api.cloudethusiast.com/api/Events/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to create event: ${errorDetails}`);
      }

      const result = await response.json();
      console.log("Event created:", result);
      const eventId = result.id;
      console.log(eventId)
      navigate(`/events/${eventId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent();
    setEventData({
      name: "",
      description: "",
      category: "",
      location: "",
      value: "",
      isFree: false,
      startDateTime: "",
      isPhysicalEvent: false,
      isVirtualEvent: false,
      isFeatured: true,
      Category: "",
      Price: 0,
      endDateTime: "",
      nameOfSpeaker: [""],
      image: null,
    });
  };

  return (
    <Stack sx={style}>
      <Box
        p={4}
        sx={{
          width: "650px",
          height: "auto",
          position: "absolute",
          top: 0,
          left: "820px",
          display: "flex",
          placeSelf: "center",
          flexDirection: "column",
          alignitems: "center",
          gap: "15px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          animation: "fadeIn 0.5s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: "40px 0px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "24px",
              textAlign: "left",
              color: "#000000",
            }}
            gutterBottom
          >
            Create Event
          </Typography>
          <CancelIcon
            sx={{
              width: "24px",
              height: "24px",
              color: "#010016",
              cursor: "pointer",
            }}
            onClick={() => setShowEventUpload(false)}
          />
        </Box>
        <Box
          sx={{
            width: "586px",
            height: "42px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: "21px",
              color: "#A3A3A3",
            }}
          >
            Plan and share your upcoming event with ease. Customize every detail
            to make it uniquely yours and keep your guests in the know.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "586px",
            height: "21px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "21px",
              color: "#484848",
            }}
          >
            Event Banner
          </Typography>
        </Box>

        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          border="2px dotted #830000"
          borderRadius="10px"
          sx={{
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: "#ffffff",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#830000",
              fontSize: "14px",
            }}
          >
            Click to upload event banner or drag and drop
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported formats:JPG
          </Typography>
          <input
            type="File"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: "16px" }}
          />
          {/* {image && <Typography mt={2}>{image.name}</Typography>} */}
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Event category
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="event-category-label">Event Category</InputLabel>
            <Select
              labelId="event-category-label"
              id="event-category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              label="Event Category"
            >
              <MenuItem value="Festivity">Festivity</MenuItem>
              <MenuItem value="Festivity">Festivity</MenuItem>
              <MenuItem value="Festivity">Festivity</MenuItem>
              <MenuItem value="Festivity">Festivity</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="isPhysicalEvent"
                checked={eventData.isPhysicalEvent}
                onChange={handleChange}
              />
            }
            label="Physical Event"
            sx={{ width: "100%" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isVirtualEvent"
                checked={eventData.isVirtualEvent}
                onChange={handleChange}
              />
            }
            label="Virtual Event"
            sx={{ width: "100%" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isFeatured"
                checked={eventData.isFeatured}
                onChange={handleChange}
              />
            }
            label="Featured Event"
            sx={{ width: "100%" }}
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Date
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: "20px" }}>
            {/* Start Date */}
            <TextField
              label="Start Date"
              type="datetime-local"
              name="startDateTime"
              value={formatDateForInput(eventData.startDateTime)}
              onChange={handleDateChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
            />
            {/* End Date */}
            <TextField
              label="End Date"
              type="datetime-local"
              name="endDateTime"
              value={formatDateForInput(eventData.endDateTime)}
              onChange={handleDateChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
            />
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Event Location
          </Typography>
          <TextField
            label="Event Location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Ticket Price
          </Typography>
          <Box>
            {ticketCategory.map((ticket, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <TextField
                  type="text"
                  name="Category"
                  fullWidth
                  placeholder="Ticket Category"
                  value={ticket.Category}
                  onChange={(e) =>
                    handleTicketChange(index, "Category", e.target.value)
                  }
                />
                <TextField
                  type="number"
                  name="Price"
                  fullWidth
                  placeholder="Ticket Price"
                  value={ticket.Price}
                  onChange={(e) =>
                    handleTicketChange(index, "Price", e.target.value)
                  }
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveCategory(index)}
                  disabled={ticketCategory.length === 1}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddCategory}
              sx={{
                backgroundColor: "#830000",
                borderRadius: "4px", // Rounded corners
                padding: "9px 37px", // Optional: Add padding for better appearance
                "&:hover": {
                  backgroundColor: "#B11E24", // Darker shade for hover effect
                },
              }}
            >
              Add Category
            </Button>
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Speaker
          </Typography>
          {eventData.nameOfSpeaker.map((speaker, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label={`Speaker ${index + 1}`}
                name="name"
                value={speaker}
                onChange={(e) => handleSpeakerChange(index, e.target.value)}
                fullWidth
                margin="normal"
              />
              {index > 0 && (
                <Button
                  onClick={() => removeSpeakerField(index)}
                  sx={{ color: "#830000" }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addSpeakerField} sx={{ color: "#830000" }}>
            Add Another Speaker
          </Button>

          <Box
            ml={10}
            sx={{
              display: "flex",
              justifyContent: "right",
              marginTop: "30px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              // fullWidth
              // disabled={uploading}
              sx={{
                backgroundColor: "#830000",
                borderRadius: "4px", // Rounded corners
                padding: "9px 37px", // Optional: Add padding for better appearance
                "&:hover": {
                  backgroundColor: "#B11E24", // Darker shade for hover effect
                },
              }}
            >
              {uploading ? "Uploading..." : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </Stack>
  );
};

export default EventsUploadPage;
