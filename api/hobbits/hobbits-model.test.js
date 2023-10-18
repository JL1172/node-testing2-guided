const db = require("../../data/dbConfig");
const HobbitData = require("./hobbits-model");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

test("[1]environment is testing", () => {
    expect(process.env.NODE_ENV).toBe("testing");
})

describe("[GET ALL]", () => {
    test("[2]Resolves all the hobbits in the table", async () => {
        const result = await HobbitData.getAll();
        expect(result).toEqual([
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
        expect(result).toHaveLength(4);
        expect(result[0]).toMatchObject({ id: 1, name: "sam" })
    })
})

describe("[GETBYID]", () => {
    test("[3]Resolves the hobbit by the given id", async () => {
        let result = await HobbitData.getById(1);
        expect(result).toMatchObject({ id: 1, name: "sam" });
        result = await HobbitData.getById(2)
        expect(result).toMatchObject({ id: 2, name: "frodo" });
        result = await HobbitData.getById(3)
        expect(result).toMatchObject({ id: 3, name: "pippin" });
        result = await HobbitData.getById(4)
        expect(result).toMatchObject({ id: 4, name: "merry" });
    })
})

describe("[INSERT NEW HOBBIT]", () => {
    const bilbo = {name : 'bilbo'}
    test("[4]Resolves the newly created hobbit", async () => {
        const result = await HobbitData.insert(bilbo);
        expect(result).toMatchObject({name : "bilbo"}); 
    })
    test("[5]Adds the hobbit to the hobbits table", async () => {
        await HobbitData.insert(bilbo);
        const records = await db("hobbits");
        expect(records).toHaveLength(5); 
    })
})