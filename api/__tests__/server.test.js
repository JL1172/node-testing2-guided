const db = require("../../data/dbConfig")
const request = require("supertest");
const server = require("../server");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

describe("[GET] /hobbits", () => {
    test("[1]Responds with 200 OK", async () => {
        const res = await request(server).get("/hobbits");
        expect(res.status).toBe(200);
    })
    test("[2]Resolves to list of hobbits", async () => {
        const res = await request(server).get("/hobbits");
        expect(res.body).toHaveLength(4);
    })
})

describe("[GET] /hobbits/:id", () => {
    test("[3]Resolves to correct hobbit", async () => {
        let res = await request(server).get("/hobbits/1");
        expect(res.body).toHaveProperty("name", "sam");
        expect(res.body).toMatchObject({ id: 1, name: "sam" });
        res = await request(server).get("/hobbits/2");
        expect(res.body).toMatchObject({ id: 2, name: "frodo" });
        res = await request(server).get("/hobbits/3");
        expect(res.body).toMatchObject({ id: 3, name: "pippin" });
        res = await request(server).get("/hobbits/4");
        expect(res.body).toMatchObject({ id: 4, name: "merry" });
    })
})

describe("[POST] /hobbits", () => {
    const bilbo = {name : "bilbo"}
    test("[4]Adds a hobbit to the db", async () => {
        const res = await request(server).post("/hobbits").send(bilbo);
        expect(await db("hobbits")).toHaveLength(5);
        expect(res.body).toMatchObject(bilbo);
        expect(res.status).toBe(201); 
    })
})

describe("[PUT] /hobbits/:id",()=> {
    const sam = {name : "SAMM BOY"};
    test("[5]Updates a hobbit at the given id",async () => {
        const res = await request(server).put("/hobbits/1").send(sam);
        expect(res.body).toMatchObject({id : 1, name : "SAMM BOY"})
        expect(await db("hobbits").where("id",1).first()).toMatchObject({id : 1, name : "SAMM BOY"})
    })
})

describe("[DELETE] /hobbits/:id",() => {
    const id = 1;
    test("[6]Removes hobbit from db with the given id",async() => {
        const res = await request(server).delete(`/hobbits/${id}`);
        expect(res.body).toHaveLength(3);
        expect(res.body).not.toEqual([
            {
                "id": 1,
                "name": "sam"
            },
            {
                "id": 2,
                "name": "frodo"
            },
            {
                "id": 3,
                "name": "pippin"
            },
            {
                "id": 4,
                "name": "merry"
            }
        ])
    })
})