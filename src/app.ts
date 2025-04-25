import express from 'express';
import { setupSwagger } from '../config/swagger';
import userRoutes from '../src/api/v1/routes/userRoutes';
import animeRoutes from '../src/api/v1/routes/animeRoutes';
import reviewRoutes from '../src/api/v1/routes/reviewRoutes';
import viewerRoutes from '../src/api/v1/routes/viewerRoutes';
import moderatorRoutes from '../src/api/v1/routes/moderatorRoutes';
import adminRoutes from '../src/api/v1/routes/adminRoutes'


const app = express();


app.use(express.json());

// Swagger Docs Route
setupSwagger(app);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/anime', animeRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/viewer', viewerRoutes); 
app.use('/api/v1/moderator', moderatorRoutes); 
app.use('/api/v1/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send(' Welcome to the Anime Recommendation API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
