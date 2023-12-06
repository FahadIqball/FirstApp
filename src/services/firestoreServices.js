import firestore from '@react-native-firebase/firestore'

export const AddDoc = (id,data) => {
    firestore()
        .collection('admin')
        .doc(id)
        .set({ ...data }, {merge : true})
        .then((res) => {
            console.log('====================================');
            console.log({ res, id: res.id });
            console.log('====================================');
        })
        .catch((error) => {
            console.log({ error });
        })

} 

export const usersCollection = () => {
    firestore()
        .collection('admin')
        .get()
        .then((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((documentSnapshot) => {
            users.push(documentSnapshot.data());
            });

            console.log('====================================');
            console.log('Admins',users);
            console.log('====================================');
        })
        .catch((error) => {
            console.log({error});
        })

}