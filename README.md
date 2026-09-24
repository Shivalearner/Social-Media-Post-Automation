# Social Media Post Automation

A full-stack social media management platform for creating, generating, scheduling, and publishing content across multiple social platforms.

## Features

- User registration and login with JWT authentication
- Connect and manage social media accounts
- OAuth integration for supported platforms
- AI-assisted post generation
- Create posts with text and optional media
- Schedule posts for future publishing
- Publish content through the Zernio API
- Upload and manage media with Cloudinary
- Dashboard with account, post, and activity information
- Background scheduler powered by `node-cron`

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB with Mongoose
- JWT and bcrypt authentication
- Google Gemini API
- Zernio API
- Cloudinary
- Multer
- Node Cron

## Project Structure

```text
.
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Shared UI and layout components
│       ├── pages/          # Application pages
│       ├── context/        # React context providers
│       ├── api/            # Axios API client
│       └── assets/         # Images and local application data
└── server/                 # Express + TypeScript backend
    ├── config/             # Database and third-party service configuration
    ├── controllers/        # Request handlers
    ├── middleware/         # Authentication and error middleware
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    └── services/           # Scheduled publishing service
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB database
- API credentials for the services you want to use

## Installation

Clone the repository and install dependencies for both applications:

```bash
git clone <your-repository-url>
cd "Social Media Post Automation"

cd server
npm install

cd ../client
npm install
```

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/social-media-automation
JWT_SECRET=replace-with-a-secure-secret

ZERNIO_API_KEY=your-zernio-api-key

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

GEMINI_API_KEY=your-gemini-api-key
LEONARDO_API_KEY=your-leonardo-api-key
```

Create a `.env` file inside the `client` directory if the backend does not run on the default URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Do not commit either `.env` file. They are already excluded by `.gitignore`.

## Running the Application

Start the backend in one terminal:

```bash
cd server
npm start
```

For automatic server restarts during development:

```bash
cd server
npm run server
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

The backend health check is available at:

```text
http://localhost:3000/
```

## Frontend Routes

| Route | Description |
| --- | --- |
| `/` | Public home page |
| `/login` | Login and registration |
| `/dashboard` | Application dashboard |
| `/accounts` | Connected social accounts |
| `/scheduler` | Compose and schedule posts |
| `/ai-composer` | AI-assisted content composer |

## API Route Groups

| Route | Purpose |
| --- | --- |
| `/api/auth` | Registration, login, and authentication |
| `/api/oauth` | Social platform OAuth and account synchronization |
| `/api/accounts` | Connected account management |
| `/api/posts` | Post creation and management |
| `/api/activity` | Activity history |

## Available Scripts

### Client

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

### Server

```bash
npm start         # Start the API server
npm run server    # Start with Nodemon
npm run build     # Compile TypeScript
```

## Development Notes

- The backend connects to MongoDB during startup, so `MONGODB_URI` must be configured before running it.
- The scheduler service starts when the backend starts.
- Third-party social publishing requires valid Zernio credentials and connected social accounts.
- Some frontend sample content is provided through local dummy data for development.

## License

This project is currently provided without a published open-source license.
