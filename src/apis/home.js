import axios from '../axios'

export const getHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: "/home",
                method: "get",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
// async function getHome() {
//     try {
//         const res = await axios.get("/home");
//         return res
//     } catch (error) {
//         console.log(error);
//     }
// }

//export { getHome }