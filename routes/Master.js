const express = require("express");
const router = express.Router();
const modelUsers = require("../models/modelUsers");


// router.get("/", async (req, res) => {
//     const infoDataBase = await modelUsers.getUserImg();
//     const info = infoDataBase.map((row) =>{
//       const imageURL = cloudinary.url(row.image,{
//           width: 100,
//           height: 100,
//           crop: "thumb", 
//           gravity: "face"
//       })  
//       return {...row, imageURL };
//     });
//     console.log(infoDataBase)
//     res.render("Master", {info});
// });

router.get("/", (req, res) => {
res.render("Master")
});



// router.post("/addItem", async (req, res) =>{

//     // enviamos la imagen a Cloudinary y pbtenemos la URL
//     let imageFile = req.files.imageFile; /* el req.files.imageFile es el mismo que esta en name del input */
//     const img_id = (await uploader(imageFile.tempFilePath)).public_id; 
//     // img_id es lo que envio a la tabla.
//    // construi una query y enviarla a la base de datos
// //    mandamos todo, inclusive el id de la imagen alojada en Cloudinary a nuestra DB
// await productsModel.addProduct({...req.body, image: img_id}); /* spread operator, operador de propagación, entra en el objeto y lo desestructura en una misma linea */
// res.redirect("/")
// })

module.exports = router;
