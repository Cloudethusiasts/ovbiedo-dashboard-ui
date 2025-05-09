import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { EventContext } from "../context/EventsContext";

const EventDetail = () => {
  const { eventId } = useParams();
  const { fetchEventDetails } = useContext(EventContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEventDetails(eventId);
        setEvent(data?.data); // assuming response structure is { data: {...eventData} }
      } catch (err) {
        console.error(err);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]); //dependency array//

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Stack
      zIndex={-1}
      sx={{
        width: "1340px",
        height: "auto",
        ml: "50px",
        mt: "188px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        position: "absolute",
      }}
    >
      {event ? (
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Event Name:</strong> {event.eventName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Event Description:</strong> {event.eventDescription}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Category:</strong> {event.eventCategory}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Location:</strong> {event.eventLocation}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Start Date:</strong>{" "}
            {new Date(event.eventStartDate).toLocaleString()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>End Date:</strong>{" "}
            {new Date(event.eventEndDate).toLocaleString()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Physical:</strong> {event.physical ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Virtual:</strong> {event.virtual ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Featured:</strong> {event.isFeatured ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Speakers:</strong> {event.speakers?.join(", ")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Ticket Categories:</strong>
          </Typography>
          <ul>
            {event.ticketCategory?.map((ticket) => (
              <li key={ticket.id}>
                {ticket.category}: ${ticket.price}
              </li>
            ))}
          </ul>
          <Typography variant="body2" gutterBottom>
            <strong>Invite Code:</strong> {event.eventInviteCode}
          </Typography>
          <Box mt={2}>
            <img
              src={event.imageUrl}
              alt={event.eventName}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      ) : (
        <p>No event details available</p>
      )}
    </Stack>
  );
};

export default EventDetail;
