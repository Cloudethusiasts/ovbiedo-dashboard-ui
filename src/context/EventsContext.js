import React, { createContext, useState, useEffect, useCallback } from "react";

export const EventContext = createContext();

const EventProvider = (props) => {
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEventDetails = async (eventId) => {
    const numericEventId = eventId;
    console.log("Numeric Event ID:", numericEventId);
    const url = `https://ovbiedo-event-api.cloudethusiast.com/api/Events/${numericEventId}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error fetching event details: ${response.status}`);
      }
      const data = await response.json();
      setEventDetails(data);
      console.log(data);
      return data; // Update state with event details
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an event
  const updateEvent = async (eventData) => {
    const formData = new FormData();
    try {
      // Append all fields to FormData
      formData.append("EventId", eventData.id); // Event ID
      formData.append("EventName", eventData.name);
      formData.append("EventDescription", eventData.description || "");
      formData.append("EventCategory", eventData.category || "");
      formData.append("EventLocation", eventData.location || "");
      formData.append("EventStartDate", eventData.startDateTime || "");
      formData.append("EventEndDate", eventData.endDateTime || "");
      formData.append("Physical", eventData.isPhysicalEvent ? true : false);
      formData.append("Virtual", eventData.isVirtualEvent ? true : false);
      formData.append("IsFeatured", eventData.isFeatured ? true : false);
      formData.append("Regular", eventData.regularTicket || 0);
      formData.append("VIP", eventData.vipTicket || 0);
      formData.append("EventIsFree", eventData.isFree ? true : false);

      // Append speakers
      if (Array.isArray(eventData.nameOfSpeaker)) {
        formData.append("Speakers", JSON.stringify(eventData.nameOfSpeaker));
      }

      if (eventData.image) {
        formData.append("Image", eventData.image); // File object from input
      } else {
        throw new Error("Please upload an event banner image.");
      }

      // Add the image
      // if (eventData.image instanceof File) {
      //   formData.append("Image", eventData.image); // New image file
      // } else if (eventData.image && typeof eventData.image === "string") {
      //   formData.append("Image", eventData.image); // Existing image URL
      // } else {
      //   throw new Error("The Image field is required.");
      // }

      const response = await fetch(
        "https://ovbiedo-event-api.cloudethusiast.com/api/Events/update",
        {
          method: "PUT",
          body: formData, // Pass FormData for multipart/form-data
        }
      );
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to update event: ${errorDetails}`);
      }

      const updatedEvent = await response.json();
      console.log("Event updated successfully:", updatedEvent);

      // Update state with the modified event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );

      return updatedEvent; // Optionally return the updated event
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  // Delete an event //ovb-event.dev.cloudethusiast.net//
  const deleteEvent = async (eventId) => {
    try {
      await fetch(
        `https://ovbiedo-event-api.cloudethusiast.com/api/Events/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );

      // Update the local state to remove the deleted event
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
      console.log("Event deleted successfully.");
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("the effect has");
    const fetchEvents = async () => {
      const url = "https://ovbiedo-event-api.cloudethusiast.com/api/Events";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data.data)) {
          setEvents(data.data);
          console.log("Events loaded:", data.data);
        } else {
          console.log(`Fetched data is not an array:`, data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvents();
  }, []);

  const contextValue = {
    events,
    eventDetails,

    fetchEventDetails,
    updateEvent,
    
    deleteEvent,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {props.children}
    </EventContext.Provider>
  );
};

export default EventProvider;
