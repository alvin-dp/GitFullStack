const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

async function connectToDb(dbName = process.env.DEF_DB_NAME){
    const mongooseOptions = {
    autoIndex: false, 
    maxPoolSize: 10, 
    socketTimeoutMS: 45000,
    family: 4
    };    
    try {
        await mongoose.connect(process.env.MONGOOSE_URI+dbName,mongooseOptions);
        console.log('Успішно підключено до MongoDB with Mongoose, DB - ' + dbName);
        return mongoose;
    } catch (err) {
        console.error('Помилка підключення до MongoDB with Mongoose, DB - ' + dbName, err);
    }
}
async function listCollections(dbName = process.env.DEF_DB_NAME, inLog = true) {
    try {
        const database  = await connectToDb(dbName);       
        const collections = await database.connection.db.listCollections().toArray();
        if (inLog) {
            console.log("Список колекцій:");
            collections.forEach((collection) => console.log(collection.name));
        }
        return collections;
    } catch (error) {
        console.error("Помилка при отриманні списку колекцій:", error);
    } finally {
        await database.disconnect();
        console.log('Відключено MongoDB with Mongoose, DB - ' + dbName);
    }
}

async function CreateUserModel(dbName) {
    const database  = await connectToDb(dbName);
    const userSchema = new database.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: {type: String, enum: ['male', 'female']},
    email: { type: String, required: true,
            unique: true,
            validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} не є валідним емейлом!`
            }
    },
    phone: String,
    }); 
    return database.model('User',userSchema);
}

async function findDocuments( Model, queryString, filds=undefined, inLog = true) {
    try {
        const query =  (queryString===undefined) ? {} : queryString;
        const documents = await Model.find(query,filds).exec();
        if (inLog){
            console.log("Знайдені документи:", documents);
        }
        return documents;
    } catch (error) {
        console.error("Помилка при пошуку документів:", error);
    }
}

async function insertDocs(Model, documentsToInsert, inLog = true) {
    try {
        resultDoc = await Model.create(documentsToInsert);    

        if (inLog){
            console.log(`Нові документи створені з ID: ${resultDoc}`);            
        }
        return resultDoc;
    } catch (error) {
        console.error("Помилка при створені документів:", error);
    }
}

async function updateOneDoc(Model, queryString, fieldsToSet, inLog = true) {
    try {
        const update = { $set: fieldsToSet };
        const result = await Model.updateOne(queryString, update, { runValidators: true });
        if (inLog){
            console.log(`Оновлено ${result.modifiedCount} документ(ів)`);            
        }
        return result.modifiedCount;
    } catch (error) {
        console.error("Помилка при оновлені документів:", error);
    }
}
async function updateDocs( Model, queryString, fieldsToSet, inLog = true) {
    try {
        const update = { $set: fieldsToSet };
        const result = await Model.updateMany(queryString, update,{ runValidators: true });
        if (inLog){
            console.log(`Оновлено ${result.modifiedCount} документ(ів)`);            
        }
        return result.modifiedCount;
    } catch (error) {
        console.error("Помилка при оновлені документів:", error);
    }
}

async function replaceOneDoc(Model, queryString, newDoc, inLog = true) {
    try {
        const result = await Model.replaceOne(queryString, newDoc,{ runValidators: true });
        if (inLog){
            console.log(`Замінено ${result.modifiedCount} документ(ів)`);            
        }
        return result.modifiedCount;
    } catch (error) {
        console.error("Помилка при заміні документів:", error);
    }
}

async function deleteDoc(Model, queryString, inLog = true) {
    try {
          const result = await Model.deleteOne(queryString);
        if (inLog){
            console.log(`Видалено ${result.deletedCount} документ(ів)`);            
        }
        return result.deletedCount;
    } catch (error) {
        console.error("Помилка при видаленні документа:", error);
    }
}

async function deleteSomeDocs(Model, queryString, inLog = true) {
    try {
        const result = await Model.deleteMany(queryString);
        if (inLog){
            console.log(`Видалено ${result.deletedCount} документ(ів)`);            
        }
        return result.deletedCount;
    } catch (error) {
        console.error("Помилка при видаленні документів:", error);
    }
}

module.exports = {connectToDb,findDocuments,CreateUserModel,listCollections,insertDocs,updateOneDoc,updateDocs,replaceOneDoc,deleteDoc,deleteSomeDocs}