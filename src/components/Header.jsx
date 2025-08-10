import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

const Header = () => {
  return (
    <div className="bg-green-500 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaWhatsapp className="text-2xl" />
          <span className="text-lg font-semibold">WhatsApp Clone</span>
        </div>

        {/* Three-dot menu */}
        <button className="hover:bg-green-600 p-1 rounded-full transition-colors">
          <MdMoreVert size={24} />
        </button>
      </div>
    </div>
  );
};

// export default Header;
