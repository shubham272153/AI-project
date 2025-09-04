import React from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import { useEffect } from "react";
import Prism from "prismjs";

const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);

  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-2 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img
            src={assets.user_icon}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      ) : (
        <div className="inline-flex flex-col my-2 gap-2 p-2 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md">
          {message.isImage ? (
            <img
              src={message.content}
              alt="AI Response"
              className="w-full max-w-md mt-2 rounded-md"
            />
          ) : (
            <div className="text-sm reset-tw dark:text-primary">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
