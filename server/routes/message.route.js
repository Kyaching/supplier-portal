const {PrismaClient} = require("@prisma/client");
const {getSocket, users, offlineMessages} = require("./socket");

const router = require("express").Router();

const prisma = new PrismaClient();
console.log("users", users);

router.get("/messages/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const message = await prisma.messages.findUnique({
      where: {
        id,
      },
    });
    if (message) {
      res.json(message);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Something Went Wrong");
  }
});

router.get("/messages/inbox/:user", async (req, res) => {
  const {user} = req.params;
  try {
    const messages = await prisma.messages.findMany({
      where: {
        status: {
          not: "draft",
        },
      },
      orderBy: {
        date: "desc",
      },
    });
    if (messages) {
      res.json(messages);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Something Went Wrong");
  }
});

router.get("/messages/sent/:user", async (req, res) => {
  const {user} = req.params;
  try {
    const messages = await prisma.messages.findMany({
      where: {
        sender: user,
        status: "sent",
      },
      orderBy: {
        date: "desc",
      },
    });
    if (messages) {
      res.json(messages);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Something Went Wrong");
  }
});

router.get("/messages/draft/:user", async (req, res) => {
  const {user} = req.params;
  try {
    const messages = await prisma.messages.findMany({
      where: {
        sender: user,
        status: "draft",
      },
      orderBy: {
        date: "desc",
      },
    });
    if (messages) {
      res.json(messages);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Something Went Wrong");
  }
});
router.post("/messages", async (req, res) => {
  const {to, id, sender, date, status, subject, body} = req.body;
  const receivers = JSON.stringify(to);

  try {
    const message = await prisma.messages.create({
      data: {
        id,
        sender,
        receivers,
        subject,
        body,
        date,
        status,
      },
    });
    if (status === "sent") {
      to.forEach(username => {
        const socketId = users[username];
        console.log("Current users:", users);
        console.log(
          "Attempting to send message to:",
          username,
          "with socket ID:",
          socketId
        );
        if (socketId) {
          getSocket().to(socketId).emit("receive-message", {
            subject,
            sender,
            body,
            id,
            date,
            status: "received",
          });

          console.log(`Message sent to ${username} (socket ID: ${socketId})`);
        } else {
          if (!offlineMessages[username]) {
            offlineMessages[username] = [];
          }
          offlineMessages[username].push({
            subject,
            sender,
            body,
            id,
            date,
            status,
          });
          console.log(`User ${username} not connected`);
        }
      });
    }

    res.status(200).send({message: "Message sent and saved", message});
  } catch (error) {
    console.error("Posting Error", error);
    res.status(500).send("Error Posting message");
  }
});

router.delete("/messages/:id", async (req, res) => {
  try {
    const {id} = req.params;

    // Attempt to delete the message with the given ID
    const deleteMessage = await prisma.messages.delete({
      where: {id: id},
    });

    // Check if a message was deleted
    if (deleteMessage) {
      res.status(200).send({success: true});
    } else {
      // If no message was deleted, respond with a 404 Not Found
      res.status(404).json({success: false, message: "Message not found"});
    }
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the message",
    });
  }
});

module.exports = router;
