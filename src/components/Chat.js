import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", { withCredentials: true });

const Chat = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const userRes = await axios.get("http://localhost:8000/api/myProfile", {
          withCredentials: true,
        });
        setUser(userRes.data.user);

        const friendRes = await axios.get(
          `http://localhost:8000/api/friendsprofile/${id}`,
          { withCredentials: true }
        );
        setFriend(friendRes.data.friend);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchProfiles();
  }, [id]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("register", user._id);
    }

    socket.on("receive_message", (data) => {
      if (data.from === friend?._id || data.to === friend?._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [user, friend]);

  const sendMessage = () => {
    if (input.trim() && user && friend) {
      const msg = {
        from: user._id,
        to: friend._id,
        message: input.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, msg]);
      socket.emit("send_message", msg);
      setInput("");
    }
  };

  if (!user || !friend)
    return <div className="text-white mt-5 text-center">Loading chat...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4 box-border">
      {/* Header */}
      <div className="text-center text-2xl font-semibold mb-2">
        Chat with {friend.firstName}
      </div>

      {/* Messages */}
      <div className="flex-grow flex flex-col justify-end gap-3">
        {messages.map((msg, i) => {
          const isMe = msg.from === user._id;
          const profilePic = isMe
            ? user.profilePicture ||
              "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            : friend.profilePicture ||
              "https://img.daisyui.com/images/profile/demo/kenobee@192.webp";
          const name = isMe ? "You" : friend.firstName;
          const time = msg.timestamp || "--:--";

          return (
            <div
              key={i}
              className={`flex items-end ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <img
                  src={profilePic}
                  alt={name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  isMe ? "bg-blue-600 ml-auto" : "bg-gray-700 mr-auto"
                }`}
              >
                <div className="font-medium">{name}</div>
                <div>{msg.message}</div>
                <div className="text-xs text-gray-300 text-right">{time}</div>
              </div>
              {isMe && (
                <img
                  src={profilePic}
                  alt={name}
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 rounded bg-gray-800 text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
