import { db } from "../db.js";
import {ObjectId} from "mongodb";

export async function getPersons() {
    const personsCollection = db.collection('persons');
    const persons = await personsCollection.find({}).toArray();
    return persons;
}

export async function addPerson(person) {
    const personsCollection = db.collection('persons');
    const insertResult = await personsCollection.insertOne(person);

    let result;
    if (insertResult.acknowledged) {
        result = await personsCollection.findOne(
            { _id: insertResult.insertedId }
        );
    } else {
        return {success: false, message: 'Failed to insert person'};
    }

    return result;
}

export async function addMultiplePersons(persons) {
    const personsCollection = db.collection('persons');
    const insertResult = await personsCollection.insertMany(persons);

    console.log('insert many result', insertResult);

    let result;
    if (insertResult.acknowledged) {
        result = await personsCollection.find(
            { _id: { $in: Object.values(insertResult.insertedIds) } }
        ).toArray();
    } else {
        return {success: false, message: 'Failed to insert persons'};
    }

    return result;
}

export async function updatePerson(id, updatedPerson) {
    const personsCollection = db.collection('persons');
    const updateResult = await personsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedPerson }
    );

    console.log('update result', updateResult);

    if (updateResult.modifiedCount === 1) {
        return await personsCollection.findOne({ _id: new ObjectId(id) });
    } else {
        return {success: false, message: 'Failed to update person'};
    }
}

export async function replacePerson(filter, newPerson) {
    const personsCollection = db.collection('persons');
    const replaceResult = await personsCollection.replaceOne(
        filter,
        newPerson
    );

    console.log('replace result', replaceResult);

    if (replaceResult.modifiedCount === 1) {
        return await personsCollection.findOne(filter);
    } else {
        return {success: false, message: 'Failed to replace person'};
    }
}

export async function findPersons() {
    const personsCollection = db.collection('persons');

    // const result = await personsCollection.find({}).toArray();
    // const result = await personsCollection.find({name: 'Clementine Bauch'}).toArray();

    // const result = await personsCollection.find({
    //     name: {
    //         $ne: 'Clementine Bauch'
    //     }
    // }).toArray();

    // const result = await personsCollection.find({name: {
    //     $in: ['Clementine Bauch', 'Chelsey Dietrich', 'John Doe']
    // }}).toArray();

    // const result = await personsCollection.find({
    //     name: {
    //         $nin: ['Clementine Bauch', 'Chelsey Dietrich', 'John Doe']
    //     }
    // }).toArray();

    // const result = await personsCollection.find().sort({name: -1}).limit(2).skip(2).toArray();
    // const result = await personsCollection.find({age: {$lte: 18} }).toArray();
    // const result = await personsCollection.find({age: {$gte: 18, $lte: 65} }).toArray();

    // const result = await personsCollection.find({
    //     $or: [
    //         {age: {$lt: 18}},
    //         {age: {$gt: 65}}
    //     ]
    // }).toArray();

    // const result = await personsCollection.find({
    //     occupation: {
    //         $exists: false
    //     }
    // }).toArray();

    // const result = await personsCollection.find({
    //     'address.street': { $in: ['Douglas Extension', 'Norberto Crossing'] }
    // }).toArray();


    const result = await personsCollection.find({}, {
        projection: {
            name: 1,
            email: 1,
            _id: 0
        }
    }).toArray();

    return result;
}