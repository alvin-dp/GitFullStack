const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();
const URI = (process.env.TYPE_DB_CONN='local') ? process.env.MONGODB_URI_LOCAL : process.env.MONGO_URI;
const DB_NAME = (process.env.TYPE_DB_CONN='local') ? process.env.DB_NAME_LOCAL : process.env.DEF_DB_NAME;
const client = new MongoClient(URI, {
                                    serverApi: {
                                        version: ServerApiVersion.v1,
                                        strict: true,
                                        deprecationErrors: true,
                                    }});
console.log('URI is ',URI,' DB Name is ',DB_NAME);
async function connectToDb(dbName = DB_NAME){
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
async function listCollections(dbName = DB_NAME, inLog = true) {
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

async function checkAndCreateCollection(dbName = DB_NAME,collectionName = process.env.DEF_COLLECTION_NAME) {
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

async function cursorFindCustom(dbName, collectionName, queryString, filds=undefined, sortOrder = undefined, skip = 0, limit  = 10, inLog = true) {
    try {
        const result=[];
        const query =  (queryString===undefined) ? {} : queryString;
        const collection = await checkAndCreateCollection(dbName, collectionName);        
        const documents = collection.find(query,filds).sort(sortOrder).skip(skip).limit(limit);
        while (await documents.hasNext()) {
            const document = await documents.next();
            result.push(document);
        }        
        if (inLog){
            console.log("Знайдено документів:", result.length);
        }
        return result;
    } catch (error) {
        console.error("Помилка при пошуку документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

async function agregateFilmsByYearGenreAndCountgt1980(dbName, collectionName, inLog = true) {
    try {
        const result=[];        
        const collection = await checkAndCreateCollection(dbName, collectionName);  
        
        const documents = collection.aggregate([
            { $match: { year: { $gt: 1980 } } },
            { $unwind: '$genres' },
            { $group: { _id: { year :'$year', genre :'$genres'}, count: { $sum: 1 } } },
            {$project: {_id: 0, 
                year: "$_id.year", 
                genre: "$_id.genre",
                totalCount: "$count"
                }
            },            
            { $sort: { year: 1, totalCount: -1 } } 
        ]);

        while (await documents.hasNext()) {
            const document = await documents.next();
            result.push(`year: ${document.year}, genre :${document.genre}, count :${document.totalCount}`);
        }        
        if (inLog){
            console.log("Знайдено документів:", result.length);
        }
        return result;
    } catch (error) {
        console.error("Помилка при пошуку документів:", error);
    } finally {
        await client.close();
        console.log('Відключено MongoDB Atlas, DB - ' + dbName);
    }
}

module.exports = {agregateFilmsByYearGenreAndCountgt1980,connectToDb,findDocuments,checkAndCreateCollection,listCollections,insertDocs,updateOneDoc,updateDocs,replaceOneDoc,deleteDoc,deleteSomeDocs,cursorFindCustom}