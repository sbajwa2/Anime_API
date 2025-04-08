import express from 'express';

import userRoutes from '../src/api/v1/routes/userRoutes';
import animeRoutes from '../src/api/v1/routes/animeRoutes';
import reviewRoutes from '../src/api/v1/routes/reviewRoutes';


const app = express();


app.use(express.json());

app.use('/users', userRoutes);
app.use('/anime', animeRoutes);
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send(' Welcome to the Anime Recommendation API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
