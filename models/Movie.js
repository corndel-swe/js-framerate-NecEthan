import db from '../db/index.js'

class Movie {
  static allowedGenres = [
    'Adventure',
    'Action',
    'Animation',
    'Biography',
    'Crime',
    'Drama',
    'Fantasy',
    'History',
    'Horror',
    'Mystery',
    'Romance',
    'War'
  ]

  static async getAllMovies() {
    const query = 'SELECT * FROM movies'
    const results = await db.raw(query)
    return results;

  }

  static async findMovie(id) {
    const query = `
      SELECT movies.*, reviews.*
      FROM movies
      INNER JOIN reviews ON movies.id = reviews.movieId
      WHERE movies.id = ?;
    `;
    const results = await db.raw(query, [id])
    return results;
  }

  static async findAll(genre) {
    const query = [
      'select movies.*',
      'from movies',
      'left join reviews on movies.id = reviews.movieId'
    ]

    const values = []

    if (genre) {
      query.push('where lower(movies.genre) like ?')
      values.push('%' + genre + '%')
    }

    query.push('group by movies.id')
    query.push('order by movies.releaseDate desc')

    const results = await db.raw(query.join(' '), values)
    return results
  }

  static async findById(id) {
    const query = 'select * from movies where id = ?'
    const results = await db.raw(query, [id])
    return results[0]
  }

  static async findReviews(id) {
    const query = 'select * from reviews where movieId = ?'
    const results = await db.raw(query, [id])
    return results
  }
}

export default Movie
