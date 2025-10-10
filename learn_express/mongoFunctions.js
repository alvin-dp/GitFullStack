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

async function findDocuments(dbName, collectionName, queryString, filds=undefined, inLog = true) {
    try {
        const query =  (queryString===undefined) ? {} : queryString;
        const collection = await checkAndCreateCollection(dbName, collectionName);
        const documents = await collection.find(query,filds).toArray();
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

async function insertDocs(dbName, collectionName, documentsToInsert, inLog = true) {
    try {
        const isMany = Array.isArray(documentsToInsert);
        let resultDoc;
        let insertedID;
         console.log('isMany = ',isMany);
        const collection = await checkAndCreateCollection(dbName, collectionName);
        if (isMany) {
            resultDoc = await collection.insertMany(documentsToInsert);
        }
        else{
            resultDoc = await collection.insertOne(documentsToInsert);    
        }
        insertedID  = (isMany) ? resultDoc.insertedIds : resultDoc.insertedId;
        if (inLog){
            console.log(`Нові документи створені з ID: ${insertedID}`);            
        }
        return insertedID;
    } catch (error) {
        console.error("Помилка при створені документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

async function updateOneDoc(dbName, collectionName, queryString, fieldsToSet, inLog = true) {
    try {
        const collection = await checkAndCreateCollection(dbName, collectionName);
        const update = { $set: fieldsToSet };
        const result = await collection.updateOne(queryString, update);
        if (inLog){
            console.log(`Оновлено ${result.modifiedCount} документ(ів)`);            
        }
        return result.modifiedCount;
    } catch (error) {
        console.error("Помилка при оновлені документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}
async function updateDocs(dbName, collectionName, queryString, fieldsToSet, inLog = true) {
    try {
        const collection = await checkAndCreateCollection(dbName, collectionName);
        const update = { $set: fieldsToSet };
        const result = await collection.updateMany(queryString, update);
        if (inLog){
            console.log(`Оновлено ${result.modifiedCount} документ(ів)`);            
        }
        return result.modifiedCount;
    } catch (error) {
        console.error("Помилка при оновлені документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

async function replaceOneDoc(dbName, collectionName, queryString, newDoc, inLog = true) {
    try {
        const collection = await checkAndCreateCollection(dbName, collectionName);
        const result = await collection.replaceOne(queryString, newDoc);
        if (inLog){
            console.log(`Замінено ${result.modifiedCount} документ(ів)`);            
        }
        return result.modifiedCount;
    } catch (error) {
        console.error("Помилка при заміні документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

async function deleteDoc(dbName, collectionName, queryString, inLog = true) {
    try {
        const collection = await checkAndCreateCollection(dbName, collectionName);

        const result = await collection.deleteOne(queryString);
        if (inLog){
            console.log(`Видалено ${result.deletedCount} документ(ів)`);            
        }
        return result.deletedCount;
    } catch (error) {
        console.error("Помилка при видаленні документа:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

async function deleteSomeDocs(dbName, collectionName, queryString, inLog = true) {
    try {
        const collection = await checkAndCreateCollection(dbName, collectionName);

        const result = await collection.deleteMany(queryString);
        if (inLog){
            console.log(`Видалено ${result.deletedCount} документ(ів)`);            
        }
        return result.deletedCount;
    } catch (error) {
        console.error("Помилка при видаленні документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}
module.exports = {connectToDb,findDocuments,checkAndCreateCollection,listCollections,insertDocs,updateOneDoc,updateDocs,replaceOneDoc,deleteDoc,deleteSomeDocs}