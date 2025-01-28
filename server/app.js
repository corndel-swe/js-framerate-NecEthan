import express from 'express'
import Movie from '../models/Movie.js';

const app = express()
app.use(express.json());
app.set('views', 'exercises/views')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const movies = await Movie.getAllMovies();
    res.status(200).json({movies})
})

app.get('/movie/:id', async (req, res) => {
    const movie = await Movie.findMovie(req.params.id)
    res.status(200).json({movie})
})

app.get('/review/:id', async (req, res) => {
    const movieId = req.params.id;

    res.render('addReview', {movieId}); 
})

app.post('/review/:id', async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    await Movie.addReview(id, payload)
    res.status(200).json({msg: 'success'})
})

export default app
