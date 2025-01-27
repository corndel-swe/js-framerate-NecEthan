import express from 'express'
import Movie from '../models/Movie.js';

const app = express()

app.get('/', async (req, res) => {
    const movies = await Movie.getAllMovies();
    res.status(200).json({movies})
})

app.get('/movie/:id', async (req, res) => {
    const movie = await Movie.findMovie(req.params.id)
    res.status(200).json({movie})
})

export default app
