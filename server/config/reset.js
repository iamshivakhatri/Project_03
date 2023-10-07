import { pool } from './db.js';
import '../config/dotenv.js'
import eventsData from './data/events.js'


const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      performer TEXT NULL,
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
  }
}

const seedEventsTable = async () => {
  await createEventsTable()

  eventsData.forEach((event) => {
    const insertQuery = {
      text: 'INSERT INTO events (name, date, location, performer) VALUES ($1, $2, $3, $4)'
    }

    const values = [
      event.name,
      event.date,
      event.location,
      event.performer
    ]
    

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting events', err)
        return
      }
      console.log(`✅ ${event.name} added successfully`)
    })
  })
}

seedEventsTable()
