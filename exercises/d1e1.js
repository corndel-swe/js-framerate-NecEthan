import express from 'express'

const app = express()
app.use(express.static('exercises/public'))
// TODO: Configure the app to serve static files from 'exercises/public'

export default app
