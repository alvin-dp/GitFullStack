const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
                                    serverApi: {
                                        version: ServerApiVersion.v1,
                                        strict: true,
                                        deprecationErrors: true,
                                    }});

async function connectToDb(dbName = process.env.DEF_DB_NAME){
  try {
    await client.connect();
    console.log('Успішно підключено до MongoDB Atlas, DB - ' + dbName);
    const db = client.db(dbName);
    await db.command({ ping: 1 });
    return db;
  } catch (err) {
    console.error('Помилка підключення до MongoDB Atlas DB - ' + dbName, err);
  }
}
async function listCollections(dbName = process.env.DEF_DB_NAME, inLog = true) {
    try {
        const database  = await connectToDb(dbName);       
        const collections = await database.listCollections().toArray();
        if (inLog) {
            console.log("Список колекцій:");
            collections.forEach((collection) => console.log(collection.name));
        }
        return collections;
    } catch (error) {
        console.error("Помилка при отриманні списку колекцій:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

async function checkAndCreateCollection(dbName = process.env.DEF_DB_NAME,collectionName = process.env.DEF_COLLECTION_NAME) {
    try { 
        const database  = await connectToDb(dbName); 
        const collections = await database.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);

        if (!collectionNames.includes(collectionName)) {
            await database.createCollection(collectionName);
            console.log(`Колекція '${collectionName}' була створена.`);
        } else {
            console.log(`Колекція '${collectionName}' вже існує.`);
        }

        const collection = database.collection(collectionName);
        return collection;

    } catch (error) {
        console.error("Помилка:", error);
    } finally {
       // await client.close();
    }
}

async function findDocuments(dbName, collectionName, queryString, inLog = true) {
    try {
        const collection = await checkAndCreateCollection(dbName, collectionName);
        const documents = await collection.find(queryString).toArray();
        if (inLog){
            console.log("Знайдені документи:", documents);
        }
        return documents;
    } catch (error) {
        console.error("Помилка при пошуку документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

module.exports = {connectToDb,findDocuments,checkAndCreateCollection,listCollections}