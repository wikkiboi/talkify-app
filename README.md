# Talkify

A real-time chat application featuring:

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, MongoDB
- **Other**: Socket.IO for real-time features, REST API for data

## Repo Structure

- `frontend/` → React + TypeScript frontend
- `backend/` → Express + MongoDB backend

## ✨ Features

- **User Accounts**

  - Register, log in, and log out using JWT-based authentication.
  - Users will have their current status (Online, Idle, Offline) shown on their profile as well as to other friend users.

- **Spaces**

  - Create and manage chat servers, called **Spaces**, where members can chat, collaborate, or hang out.
  - Invite users to join a space via a reusable invite code.
  - Space creators/owners can assign admin privileges to members for better space management.
  - Chat channels can be created, renamed, or deleted by the space admins or owner.
  - Users can move between chat channels and follow different conversations in real-time
  - Members of the space will see a list of all other members and their current status

- **Direct Messaging (DM)**

  - Users can send/receive friend requests from other users
  - A one-on-one conversation will be created between users once a friend request is accepted

- **Group DM (WIP)**

  - Group conversations can be made with multiple friends.
  - Group DM participants can add or remove others and also choose to leave the group DM.

- **Database Abstraction Layer**

  - Feature-specific database helper functions to keep controller logic clean.
  - Centralized logic for querying and mutating MongoDB via Mongoose models.
  - Reusable DB functions for different features.

- **Error Handling**
  - Error-handling middleware for authentication and API routes.
  - Consistent response format for client error handling.

## API Endpoint Reference

### Authentication

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Log in existing user |

---

### Space

| Method | Endpoint                       | Description                         |
| ------ | ------------------------------ | ----------------------------------- |
| POST   | `/api/space/create`            | Create new space                    |
| POST   | `/api/space/join`              | Join existing space via invite code |
| POST   | `/api/space/:spaceId/invite`   | Invite user to space                |
| GET    | `/api/space/:spaceId`          | Get details of specific space       |
| GET    | `/api/space/:spaceId/channels` | Get all channels in space           |
| GET    | `/api/space/:spaceId/invites`  | Get all invites for space           |
| PUT    | `/api/space/:spaceId/update`   | Update space details                |
| DELETE | `/api/space/:spaceId/delete`   | Delete space                        |
| DELETE | `/api/space/:spaceId/leave`    | Leave space                         |

---

### Channel

| Method | Endpoint                                          | Description                  |
| ------ | ------------------------------------------------- | ---------------------------- |
| GET    | `/api/channel/:spaceId/:channelId`                | Get channel details          |
| GET    | `/api/channel/:spaceId/:channelId/msgs`           | Get messages in channel      |
| POST   | `/api/channel/:spaceId/create`                    | Create new channel in space  |
| POST   | `/api/channel/:channelId/send`                    | Send message to channel      |
| PUT    | `/api/channel/:spaceId/:channelId/update/name`    | Update channel name          |
| PUT    | `/api/channel/:spaceId/:channelId/update/default` | Set default channel in space |
| DELETE | `/api/channel/:spaceId/:channelId/delete`         | Delete channel               |

---

### Direct Messaging (DM)

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| GET    | `/api/dm/me`             | Get all DMs for the current user     |
| GET    | `/api/dm/:dmId/private`  | Get users in a private DM            |
| GET    | `/api/dm/:dmId/msgs`     | Get messages in a private DM         |
| POST   | `/api/dm/:userId/create` | Create a new DM with a specific user |

---

### Group DM

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/api/dm/:groupId/group`      | Get details of a group DM  |
| GET    | `/api/dm/:groupId/group/msgs` | Get messages in a group DM |
| POST   | `/api/dm/group/create`        | Create a new group DM      |
| PUT    | `/api/dm/:groupId/add`        | Add a user to a group DM   |
| DELETE | `/api/dm/:groupId/leave`      | Leave a group DM           |
| DELETE | `/api/dm/:groupId/delete`     | Delete a group DM          |

---

### Friend

| Method | Endpoint                        | Description                           |
| ------ | ------------------------------- | ------------------------------------- |
| GET    | `/api/friend/me`                | Get all friends for the current user. |
| GET    | `/api/friend/:friendId`         | Get details about a specific friend.  |
| POST   | `/api/friend/:friendId/request` | Send a friend request.                |
| PUT    | `/api/friend/:friendId/add`     | Accept a friend request.              |
| DELETE | `/api/friend/:friendId/remove`  | Remove a friend.                      |
| DELETE | `/api/friend/:friendId/deny`    | Deny a friend request.                |

---

### User

| Method | Endpoint                         | Description                                  |
| ------ | -------------------------------- | -------------------------------------------- |
| GET    | `/api/user/me`                   | Get the current user's profile.              |
| GET    | `/api/user/status`               | Get the current user's status.               |
| GET    | `/api/user/spaces`               | Get all spaces the user is part of.          |
| GET    | `/api/user/:username/find`       | Find a user by username.                     |
| GET    | `/api/user/:spaceId/lastVisited` | Get user's last visited channel in space.    |
| PUT    | `/api/user/:spaceId/lastVisited` | Update user's last visited channel in space. |

## Quick Start

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB (local or cloud)

### Setup

Clone the repository and install dependencies

```bash
git clone https://github.com/wikkiboi/talkify-app.git
cd talkify-app

cd backend && npm install
cd ../frontend && npm install
```
