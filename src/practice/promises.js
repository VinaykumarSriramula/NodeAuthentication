const doworkpromise = new Promise((resolve, reject) =>{
    setTimeout(() => {
        resolve([7,4,1])
    },2000)
})

doworkpromise.then((result) => {
    console.log("success : ",result);
}).catch((e) => {
    console.log(e);
})