// import bcrypt from 'react-native-bcrypt';
// const saltRounds = 10;

// export const hashPassword = async (pass) => {
//     try {
//         return bcrypt.hashSync(pass, saltRounds);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }
// export const comparePassword = async (pass, hash) => {
//     console.log({pass,hash});
//     try {
//         return bcrypt.compareSync(pass, hash);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

export function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}
export function isObject(obj){
    return typeof yourVariable === 'object' &&
    !Array.isArray(yourVariable) &&
    obj !== null
}