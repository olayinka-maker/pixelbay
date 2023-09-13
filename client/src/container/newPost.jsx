import React from "react";
import { NewPostBg } from "../assets";
import { uploadmedia } from "../utils/supports";
import { NavLink, Routes, Route } from "react-router-dom";
import { Collections, CreatePost, Mymedia } from "../components";

const NewPost = () => {
  return (
    <div>
      <div className=" w-screen flex  justify-center h-340 item-center relative">
        <img src={NewPostBg} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-overlay-4"></div>
      </div>
      <div className="relative  w-full h-auto flex  items-center py-6 px-6  justify-start text-primary text-base gap-8">
        {uploadmedia &&
          uploadmedia.map((media) => (
            <NavLink
              to={media.slug}
              className={({ isActive }) =>
                isActive ? " text-emerald-300 " : "text-base "
              }
              key={media.id}
            >
              {media.name}
            </NavLink>
          ))}
        <div className=" w-full flex flex-col items-start justify-start h-auto py-4">
          <Routes>
            <Route path="/my-media" element={<Mymedia />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/upload" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
