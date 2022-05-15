const fs = require('fs')
const { Pool } = require('pg')
const path = require('path')

//data base connection
require("dotenv").config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} = process.env

let conn = new Pool()

if (ENV === 'dev') {
    conn = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (ENV === 'test') {
    conn = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

// sql files
const faqSeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'faqs_seeder.sql'), { encoding: 'utf8' })
const countrySeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'country_seeder.sql'), { encoding: 'utf8' })
const citySeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'city_seeder.sql'), { encoding: 'utf8' })
const categorySeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'category_seeder.sql'), { encoding: 'utf8' })
const contactSeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'contact_message_seeder.sql'), { encoding: 'utf8' })
const productSeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'product_seeder.sql'), { encoding: 'utf8' })
const appInfoSeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'app_info_seeder.sql'), { encoding: 'utf8' })
const userSeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'user_seeder.sql'), { encoding: 'utf8' })
const addressSeedQuery = fs.readFileSync(path.join(__dirname, 'sql', 'user_address_seeder.sql'), { encoding: 'utf8' })


const seed = async () => {

    try {
        // queries
        const queries = async () => {
            await conn.query(faqSeedQuery)
            await conn.query(countrySeedQuery)
            await conn.query(categorySeedQuery)
            await conn.query(contactSeedQuery)
            await conn.query(appInfoSeedQuery)
        }
        const secondLevelQueries = async () => {
            await conn.query(citySeedQuery)
            await conn.query(productSeedQuery)
        }

        const thirdLevelQueries = async () => {
            await conn.query(userSeedQuery)
        }

        const fourthLevelQueries = async () => {
            await conn.query(addressSeedQuery)
        }
        const allQueris = async () => {
            await queries()
            await secondLevelQueries()
            await thirdLevelQueries()
            await fourthLevelQueries()
            await conn.end()
            await console.log('Seeding Competed')
        }
        allQueris()
    } catch (err) {
        reject(`ERROR : ${err}`)
    }

};

seed()