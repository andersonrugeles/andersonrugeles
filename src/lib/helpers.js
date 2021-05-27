const bcrypt=require('bcryptjs');
const helpers={};


helpers.encryptPassword=async(password)=>{
const salt= await bcrypt.genSalt(10);
const encriptado=await bcrypt.hash(password,salt);
return encriptado;
};

helpers.matchPassword= async (password,savedPassword) =>{
  try {
    const salt= await bcrypt.genSalt(10);
    savedPassword=await bcrypt.hash(password,salt);
    return await bcrypt.compareSync(password,savedPassword);
    
  } catch (error) {
      console.log(error);
  }
};

module.exports=helpers;