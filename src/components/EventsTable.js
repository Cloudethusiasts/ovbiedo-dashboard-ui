import React, { useEffect, useState, useContext } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EventContext } from "../context/EventsContext";

const EventsTable = ({event}) => {
  const { events, deleteEvent, updateEvent } = useContext(EventContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null); // For a newly uploaded image
  // if (!event) {
  //   return <p>Loading...</p>; // Render a loading state or fallback UI
  // }
  const [eventData, setEventData] = useState({
    EventId: event.id, // Pre-fill with the event ID
    EventName: event.EventName,
    EventDescription: event.EventDescription,
    EventCategory: event.EventCategory,
    EventLocation: event.EventLocation,
    EventStartDate: event.EventStartDate,
    EventEndDate: event.EventEndDate,
    Physical: event.Physical,
    Virtual: event.Virtual,
    isFeatured: event.isFeatured,
    Regular: event.Regular,
    VIP: event.VIP,
    EventIsFree: event.EventIsFree,
    Speakers: event.Speakers, // Assuming speakers is an array
    Image: event.Image, // Existing image URL
  });

  const openMenu = Boolean(anchorEl);

  // Fetch events on component mount
  // useEffect(() => {
  //   fetchEvents();
  // }, [fetchEvents]);

  const handleMenuClick = (event, eventData) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    // Pre-fill form with selected event data
    setEventData(selectedEvent);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file); // Set the new image file
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedEvent = {
        ...eventData,
        image: newImageFile || eventData.Image, // Use new image file if available, otherwise use the existing URL
      };

      const result = await updateEvent(updatedEvent);
      console.log("Event updated successfully:", result);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };






  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({ ...eventData, [name]: value });
  // };

  // const handleUpdateSubmit = async () => {
  //   try {
  //     await updateEvent({ ...eventData, id: selectedEvent.id });
  //     // alert("Event updated successfully!");
  //     setOpenDialog(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const updateEvent = async () => {
  //   try {
  //     const data = {
  //       EventId: eventData.id,
  //       EventName: eventData.name,
  //       EventDescription: eventData.description,
  //       EventCategory: eventData.category,
  //       EventLocation: eventData.location,
  //       EventStartDate: eventData.startDateTime,
  //       EventEndDate: eventData.endDateTime,
  //       Physical: eventData.isPhysicalEvent,
  //       Virtual: eventData.isVirtualEvent,
  //       IsFeatured: eventData.isFeatured,
  //       Regular: eventData.regularTicket,
  //       VIP: eventData.vipTicket,
  //       EventIsFree: eventData.isFree,
  //       Speakers: eventData.nameOfSpeaker,
  //     };
  
  //     const response = await fetch(
  //       "https://ovb-event.dev.cloudethusiast.net/api/Events/update",
  //       {
  //         method: "PUT",
  //         body: data,
  //       }
  //     );
  
  //     if (!response.ok) {
  //       const errorDetails = await response.text();
  //       throw new Error(`Failed to update event: ${errorDetails}`);
  //     }
  
  //     const result = await response.json();
  //     console.log("Event updated successfully:", result);
  //     //alert("Event updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating event:", error);
  //     //alert("Failed to update event. Please try again.");
  //   }
  // };
  
  // const handleUpdateEvent = async () => {
  //   try {
  //     const updatedEvent = {
  //       id: selectedEvent,
  //       name: "Updated Event Name",
  //       description: "Updated Description",
  //       category: "Updated Category",
  //       location: "Updated Location",
  //       startDateTime: "2024-12-15T10:00:00",
  //       endDateTime: "2024-12-15T12:00:00",
  //       isPhysicalEvent: true,
  //       isVirtualEvent: false,
  //       isFeatured: false,
  //       regularTicket: 50,
  //       vipTicket: 100,
  //       isFree: false,
  //       nameOfSpeaker: ["Updated Speaker"],
  //       image: newImageFile || existingImageUrl, // Either a file or a URL
  //     };
  //     const result = await updateEvent(updatedEvent);
  //     console.log("Updated Event:", result);
  //   } catch (error) {
  //     console.error("Error updating event:", error);
  //   }
  // };


  return (
    <>
      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ width: "1340px", padding: "20px 24px" }}
      >
        <Table
          sx={{
            tableLayout: "fixed", // Ensures even column distribution
            "& .MuiTableCell-head": {
              fontWeight: "bold",
              textAlign: "center", // Center text in headers
              backgroundColor: "#f5f5f5", // Light gray header background
            },
            "& .MuiTableCell-body": {
              textAlign: "center", // Center text in body cells
              padding: "8px", // Uniform padding
            },
            "& .MuiTableRow-root:nth-of-type(odd)": {
              backgroundColor: "#fafafa", // Light gray background for odd rows
            },
            "& .MuiTableRow-root:nth-of-type(even)": {
              backgroundColor: "#ffffff", // White background for even rows
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Category</TableCell>
              <TableCell>Event Location</TableCell>
              <TableCell>Event Status</TableCell>
              <TableCell>Expected Attendees</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventCategory}</TableCell>
                <TableCell>{event.eventLocation}</TableCell>
                <TableCell>{event.eventIsFree ? "Free" : "Paid"}</TableCell>
                <TableCell>{event.regular}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, event)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    sx={{
                      boxShadow: "none",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleUpdate(); // Call handleEditClick when "Update Event" is clicked
                        handleMenuClose(); 
                        handleDialogOpen()// Close the menu
                      }}
                    >
                      Update Event
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        deleteEvent(event.id); // Delete event when "Delete Event" is clicked
                        handleMenuClose(); // Close the menu
                      }}
                    >
                      Delete Event
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Event Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: "#830000" }}>Update Event</DialogTitle>
        <DialogContent>
          <TextField
            name="eventName"
            label="Event Name"
            value={eventData.EventName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="eventCategory"
            label="Event Category"
            value={eventData.EventCategory}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="eventLocation"
            label="Event Location"
            value={eventData.EventLocation}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="regular"
            label="Expected Attendees"
            type="number"
            value={eventData.Regular}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="eventIsFree"
            label="Is Free (true/false)"
            value={eventData.EventIsFree}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
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
            onChange={handleImageChange}
            style={{ marginBottom: "16px" }}
          />
          {/* {image && <Typography mt={2}>{image.name}</Typography>} */}
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="#830000">
            Cancel
          </Button>
          <Button onClick={updateEvent} color="#830000">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

};
export default EventsTable;
