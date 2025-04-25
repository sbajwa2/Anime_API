#  Anime API

An extensible RESTful API built using **Express.js**, **TypeScript**, and **Firebase Firestore** to manage anime content, including series, episodes, and user reviews. Featuring Firebase Authentication with custom claims for role-based access, this backend is secured, scalable, and fully documented using Swagger.

---

##  Highlights

- **Full CRUD Support:**  
  Create, retrieve, update, and delete anime series, episodes, and reviews through REST endpoints.

- **Real-time Firestore Database:**  
  Leveraging Firebase Firestore for fast and flexible NoSQL document storage.

- **Secure Authentication & Authorization:**  
  Role-based access using Firebase ID tokens with support for custom claims (`admin`, `user`).

- **Joi Schema Validation:**  
  Ensures clean, consistent input across all routes.

- **Express Middleware Architecture:**  
  Modular design with centralized error handling and request validation.

- **Security-Focused:**  
  - **CORS** – Cross-origin request management  
  - **Helmet** – HTTP header protection

- **Interactive Swagger Docs:**  
  Available at `/api-docs` to explore and test endpoints with ease.

- **Advanced Querying:**  
  Filter anime by genre, search episodes by season, and more.

---

##  Getting Started

### 1. Clone This Repository
git clone https://github.com/your-username/anime-api.git
cd anime-api

### 2. Install Dependencies
npm install

### 3.  Set Up Environment Variables
NODE_ENV=development
PORT=5000

FIREBASE_PROJECT_ID= anime-ad7f3
FIREBASE_CLIENT_EMAIL= firebase-adminsdk-fbsvc@anime-ad7f3.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY= "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDU4sDG7ML85hWd\nNmEt7ZVmUXVNMa/MKwwan8oKoXclbW7d7ywCJVWQwbdC9F69klglDaXmvxF+hgeA\ngxBH7QDImr5jKDlTs28jFr3fGsRQBND6ilrmhRw3yU6zMIMbou40fwZhAwpkPFwq\nfpLWn2UFRmfMvvYQxnv6v2J7619j/NHTL0rQA3NnV+1/DGw445UheA6sOEjJUJ6W\n61+VJhCrTJeyDpjtenbQMclzMwPgKVInFhaOnElzBia7owZ6iMUWkf39p1ylQG5N\nNHTReZWEgkEO3rvYonuDs4gYLdUn6LiC/QFE7YgGJK7DnGRE2SPrg9ydABQR4RCB\niM/1+dKjAgMBAAECggEACvsVe9f1OmK1oAkCfAI2I3q8m/3Wx/zJVbY71pXfUhp1\nnKJVJzyD+rKfvN/xjcIoecfrVB5PzSRCB7GeidAe5AEssqQ2u3KG2CJG1WUCR7c+\n/oKw5L+I9DCWC/ggLrEyj2Dd98+BOppe4xzpm2atYfPUL7jJ5Oq7mJ8L66Tc3Pp5\n07HzKY8rVacUnYSMnb+UeAp9O5ItIQXRQAVfoVzONXXNgrhX/RNbSYHB6UnRV+NP\nAXWpUeIpGpTBoEc9KijYlWKUWKvEZNkSokzEKzecjUfhyGehMdVyXHeD3YdwSUEH\neyQjH0Zxl+TiEUY/I5r4MXPy1CjL3zTvqv4wxi3UQQKBgQDto1Wbe6L9WkCGdDlm\nLN0sZglhkySR5pIsur3L4eFaL2pOWNYqcOiogZhfNh/Hyu3D5/ros5gMuBNUeRiY\nBR24jr6NCZLMVLk9ckjHPeGyYHX/nuDlbTD++GOGIs3s5YihfmLNvOwhXn1VwZ5z\nDH/SJ35gbWdVW4KYGrt+Eg4n5QKBgQDlVcylGee7Fojb49PwZj8OJ41gXu1+Xi3Q\nZliM7gkJYSAPFMnlj5GCV/pcAZ9jRBGABLoaGWxqwFx0+8tQqq45S2gTrXU/sQxP\n9/qaddKrxhOYuUIb2HZaIsOyjGHBbufgYPREGgdCS7/E60ht0KiH9MfWLaOlzjRq\nijzHKMFX5wKBgQDaVFpuw6T4CFeIMHgb+9Qo2oZ782iB88kQ93ExRJJ6/V06Jjx+\nOcZIKukHcP653SOd/iB0c6ya4vQ/hBKoeOrZiaxggA8zVBPs9HcRNzWJYT6IYDxY\nDX4ag7NMpeV0ZV6moSu9wnlgHyQgCge9xBobxtVBWsK5lZ3iiY0BQy1mUQKBgQDR\nlqYeRRyI2MFe5EnvLCJ4VyFXb6nwkTWhfcdzlJ9hmQfpgIA7cgfzbV/68eiumai8\nrJVAAPgaX46fwvY+1J3A8u88/ItpF+8+rkyzGPbd0XpbWwPV2u/e1GKxLKayVx9G\n6pSSII99wSiTWMuqwMUk60ourSsf/uHcdFWzVcXNBQKBgQDiyUXRRsVqsJSwl1Pg\nrXKt5eZmQIBd9FON1gkpRcL9eELrS9wcnm9BnAmiPTwbcotALkPM+5RadR1XvpQk\nmO3DrtzgQsMi8GzhoZz0qnHDUiXkd9asZXGenCf8F5qcmxHNttb9qjofysJJPLui\nDlc5FPeu+tGunDJ0lJq5uW7gqw==\n-----END PRIVATE KEY-----\n"


SWAGGER_SERVER_URL=http://localhost:5000/api/v1

API Documentation
http://localhost:5000/api-docs

Authentication & Roles
Authorization: Bearer <your_token_here>

User Roles:
admin – Full access to all endpoints. 
viewer – No creation and editing permissions.
moderator - No creation and editing permissions.

Quick Usage Examples
Get All Anime

import axios from 'axios';
const res = await axios.get('http://localhost:5000/api/v1/anime');
console.log(res.data);

Add a New Anime Series

import axios from 'axios';

const anime = {
  title: "Attack on Titan",
  genre: "Action",
  episodes: 75,
  status: "Completed"
};

const res = await axios.post('http://localhost:5000/api/v1/anime', anime, {
  headers: {
    Authorization: `Bearer YOUR_FIREBASE_TOKEN`
  }
});
console.log(res.data);

Running Tests
npm test

Folder Structure
.
├── .github/workflows/        # CI/CD GitHub Actions
├── config/                   # Firebase and environment configs
├── docs/                     # Swagger setup and YAML docs
├── src/api/v1/
│   ├── controllers/          # Business logic for anime, episodes, reviews
│   ├── middleware/           # Auth, validation, error handlers
│   ├── models/               # Swagger/OpenAPI type definitions
│   ├── repositories/         # Firestore query and data logic
│   ├── routes/               # API route files
│   ├── schemas/              # Joi validation logic
│   ├── services/             # Service layer abstraction
│   └── types/                # Custom TypeScript interfaces and enums
├── test/                     # Unit and integration tests
├── app.ts                    # Main Express server setup
├── package.json
├── tsconfig.json
└── .env                      # Environment variables

API Endpoint Summary
Anime Endpoints
GET /api/v1/anime – Fetch all anime (with optional filters)

GET /api/v1/anime/:id – Retrieve specific anime

POST /api/v1/anime – Add new anime (admin, user)

PUT /api/v1/anime/:id – Edit anime details (admin, user)

DELETE /api/v1/anime/:id – Remove anime (admin, user)

Review Endpoints
GET /api/v1/reviews – List all reviews (filter by animeId or rating)

GET /api/v1/reviews/:id – Retrieve a single review

POST /api/v1/reviews – Submit a review (admin, user)

PUT /api/v1/reviews/:id – Update review (admin, user)

DELETE /api/v1/reviews/:id – Remove review (admin, user)


