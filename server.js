const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

// Your routing, authentication, and controller code goes here
app.get("/parks", (request, response) => {
  response.status(200).json(parks);
});

app.get("/visitors", (request, response) => {
  response.status(200).json(visitors);
});

app.get("/reservations", (request, response) => {
  response.status(200).json(reservations);
});

app.get("/visitors/:id", (request, response) => {
  const selectedVisitor = visitors.find((i) => i.id == request.params.id);
  if (selectedVisitor) {
    const pastReservation = reservations.filter(
      (i) => i.id == selectedVisitor.pastReservations
    );
    const upcomingReservation = reservations.filter(
      (i) => i.id == selectedVisitor.upcomingReservations
    );
    response.json({
      id: selectedVisitor.id,
      name: selectedVisitor.name,
      pastReservations: pastReservation,
      upcomingReservations: upcomingReservation,
    });
  } else {
    response.status(404).json("Visitor not found");
  }
});

app.listen(3000, () => {
  console.log(
    "National Park Visitor System is running on port  http://localhost:3000"
  );
});
