# ChatApp - Full Stack Chat Application

A modern real-time chat application built with React (Frontend) and Spring Boot (Backend), featuring WebSocket support, Firebase authentication, and SMS integration.

## Project Structure

```
chatapp/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── firebase/      # Firebase configuration
│   │   ├── context/       # React Context (Auth)
│   │   ├── hooks/         # Custom hooks (WebSocket, Messages)
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/               # Spring Boot application
│   ├── src/main/
│   │   ├── java/com/chatapp/
│   │   │   ├── config/    # Configuration classes
│   │   │   ├── controller/# REST & WebSocket controllers
│   │   │   ├── model/     # JPA entities
│   │   │   ├── repository/# Data repositories
│   │   │   ├── service/   # Business logic
│   │   │   ├── filter/    # Auth filters
│   │   │   └── ChatAppApplication.java
│   │   └── resources/     # Configuration files
│   └── pom.xml
│
└── database/
    └── schema.sql         # Database schema
```

## Features

- **Real-time Chat** - WebSocket support via STOMP protocol
- **Firebase Auth** - Email/Google authentication
- **SMS Integration** - Send SMS via MSG91 API
- **User Management** - Online/offline status
- **Message History** - Store and retrieve conversations
- **Responsive UI** - Tailwind CSS styling

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Firebase Auth
- Axios
- SockJS + STOMP

### Backend
- Spring Boot 3.1.5
- Spring Security
- Spring WebSocket
- Firebase Admin SDK
- MySQL
- JPA/Hibernate

## Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Database Setup
```bash
mysql -u root -p < database/schema.sql
```

## Environment Configuration

### Frontend (.env)
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend (application.properties)
```
spring.datasource.url=jdbc:mysql://localhost:3306/chatapp_db
spring.datasource.username=root
spring.datasource.password=your_password
sms.api.key=your_msg91_api_key
```

## API Endpoints

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

### Messages
- `GET /api/messages/{userId}/{recipientId}`
- `POST /api/messages/send`
- `GET /api/messages/conversations/{userId}`

### SMS
- `POST /api/sms/send`
- `GET /api/sms/history/{userId}`

### WebSocket
- `WS /ws/chat` - STOMP endpoint

## Next Steps

1. Set up Firebase project and get credentials
2. Set up MySQL database
3. Configure environment variables
4. Implement controller methods
5. Implement service layer logic
6. Create React components UI
7. Test WebSocket connections
8. Deploy to production
