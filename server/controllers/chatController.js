import Chat from "../models/Chat.js"; // ✅ make sure Chat model is imported

// API controller for creating a new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ fixed _id

    const chatData = {
      userId,
      message: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);

    res.json({ success: true, message: "New chat created successfully" }); // ✅ fixed
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API controller for getting all chats
export const getChat = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ fixed _id

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.json({ success: true, chats }); // ✅ fixed
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// API controller for deleting a chat
export const deteleChat = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ fixed _id
    const { chatId } = req.body;

    await Chat.deleteOne({ _id: chatId, userId }); // ✅ fixed _id

    res.json({ success: true, message: "Chat deleted successfully" }); // ✅ fixed
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
