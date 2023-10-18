const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db("hobbits").where("id",id).first();
}

async function insert(hobbit) {
  const [result] = await db("hobbits").insert(hobbit);
  return getById(result)
}

async function update(id, changes) {
  const result = await db("hobbits").update(changes).where("id",id);
  return getById(result); 
}

async function remove(id) {
  await db('hobbits').where("id",id).del();
  return await getAll(); 
}
