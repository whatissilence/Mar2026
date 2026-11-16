import jwt from 'jsonwebtoken';

const secretKey = 'mySuperSecretKey';

const person = {
    name: 'John Wick',
    age: 45,
    city: 'New York',
    pets: [
        {
            name: 'Spike',
            type: 'dog'
        }
    ]
}

const options = {
    algorithm: 'HS512',
    audience: 'http://myapi.com',
    expiresIn: '10s',
}

const token = jwt.sign(person, secretKey, options);
console.log('token:', token);

// ==================================================
const tokenToDecode = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBXaWNrIiwiYWdlIjo0NSwiY2l0eSI6Ik5ldyBZb3JrIiwicGV0cyI6W3sibmFtZSI6IlNwaWtlIiwidHlwZSI6ImRvZyJ9XSwiaWF0IjoxNzk0ODUzNDEzLCJleHAiOjE3OTQ4NTM0MjMsImF1ZCI6Imh0dHA6Ly9teWFwaS5jb20ifQ.Lhcs8Z-Z1eRc1WAAnuqME0YBuMAn6_CXV194_Tw1YeW93yVaWprD2dGGNbqQ6-0Gcc98uSqQjNMTPuzFbjpovQ'
const verifyOptions = {
    algorithm: 'HS512',
    audience: 'http://myapi.com',
}

try {
    const decoded = jwt.verify(tokenToDecode, secretKey, verifyOptions);
    console.log('decoded:', decoded);
} catch (error) {
    console.error('Error verifying token:', error.message);
}

// Sign payload and return JWT asynchronously
function jwtSignAsync(payload, secretKey, options = {}) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err || !token) return reject(err);
            resolve(token);
        });
    });
}

// Verify token and return decoded payload asynchronously
function jwtVerifyAsync(token, secretKey, options = {}) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, options, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

