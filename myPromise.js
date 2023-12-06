const proFunc = async () => {
  return new Promise((resolve, reject) => {
    x = 0;
    if (x != 0) {
     setTimeout(() => {
        resolve('REOLVED');
     }, 3000);
    } else {
      setTimeout(() => {
        reject('REJECT');
      }, 3000);
    }
  });
};

const main = () => {
//   try {
//     const result = await proFunc();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }

proFunc()
.then((r) => {console.log(r);})
.catch((e) => {console.log(e);})

};

main();
