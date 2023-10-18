const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

beforeAll(async()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async()=> {
    await db.seed.run();
})

describe("[GET] /hobbits",() => {
    test("[1]Responds with 200 OK",async() => {
        const res = await request(server).get("/hobbits");
        
    })
})