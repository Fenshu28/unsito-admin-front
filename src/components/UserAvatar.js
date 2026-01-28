import React from "react";


const UserAvatar = ({ user, size = "8", className = "" }) => {
  if (!user) return null;

  const { nombre, email, foto } = user;

  const getInitials = () => {
    if (nombre) {
      const parts = nombre.trim().split(/\s+/);
      // Si el nombre parece un email (no tiene espacios y tiene @)
      if (parts.length === 1 && nombre.includes("@")) {
        return nombre.substring(0, 2).toUpperCase();
      }
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "??";
  };

  const sizeClasses = {
    8: "w-8 h-8 text-[10px]",
    10: "w-10 h-10 text-xs",
    12: "w-12 h-12 text-sm",
  };

  const currentSizeClass = sizeClasses[size] || "w-8 h-8 text-[10px]";

  if (foto) {
    return (
      <img
        src={foto}
        alt={nombre || email}
        className={`${currentSizeClass} rounded-full object-cover border border-gray-100 shadow-sm ${className}`}
      />
    );
  }

  return (
    <div
      className={`${currentSizeClass} rounded-full border border-brand-100 flex items-center justify-center shadow-sm bg-brand-50 text-brand-700 font-bold tracking-tighter ${className}`}
    >
      {getInitials()}
    </div>
  );
};

export default UserAvatar;
