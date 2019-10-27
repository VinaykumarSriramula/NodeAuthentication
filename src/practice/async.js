const add = ((a,b) => {
    return new Promise ((resolve, reject ) => {
        if(a<0 || b<0){
            return reject("Number must be positive");
        }
        resolve(a+b)
    })
})

const dowork = async () => {
    const sume = await add(1,-20);
    const sume1 = await add(sume, 20);
    const sume2 = await add(sume1 , -20);
    return sume2;
}

dowork().then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('e : ',e)
})