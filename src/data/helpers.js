exports.reverseObject = (obj) => {
    const keysAndValues = Object.entries(obj);
  
    return keysAndValues.reduce((acc,pair) => {
    
      const [key,value] = pair;
      acc[value] = key;
      return acc;
    },{})
    console.log(keysAndValues);
  }