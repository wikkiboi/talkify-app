import type React from "react"
import { Link } from "react-router-dom"
import "@/assets/styles/chatStyle.css"

interface UserAvatarProps {
  username: string
  color?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  username,
  color = "#00BD62", // Default to the theme color if none provided
}) => {
  // Get the first letter of the username
  const firstLetter = username ? username.charAt(0).toUpperCase() : "?"

  return (
    <div className="user-avatar-container">
      <Link to="/" className="user-avatar-link">
        <div className="user-avatar" style={{ backgroundColor: color }}>
          {firstLetter}
        </div>
        <span className="username">{username}</span>
      </Link>
    </div>
  )
}

export default UserAvatar

