import dotenv from 'dotenv';
import express from 'express';
import { dbConnect } from "./db.js";
import {
    addMultiplePersons,
    addPerson,
    findPersons,
    getPersons,
    replacePerson,
    updatePerson
} from "./services/personsService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;





// app.get('/', async (req, res) => {
//     const result = await replacePerson(
//         { email: 'john.doe@example.com'},
//         {
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             phone: '987654321',
//             address: '123 Main St, City'
//         }
//     );
//
//     res.json(result);
// });

app.get('/', async (req, res) => {
    const result = await findPersons();
    res.json(result);
});






async function connect() {
    try {
        await dbConnect();

        app.listen(PORT, () => {
            console.log(`Server started and listening to http://localhost:${PORT}`);
        })

    } catch (e) {
        console.error('Error connection with Database', e);
    }
}

connect();