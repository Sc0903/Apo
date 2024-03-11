const {Router} = require ('express')
const router = Router()

const admin = require("firebase-admin");

  const db = admin.firestore();

// Agregar ComidasMEX
router.post("/api/ComidasMEX", async (req, res) => {
    try {
      await db
        .collection("ComidasMEX")
        .doc("/" + req.body.id + "/")
        .create({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          precio: req.body.precio,
        });
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });
  
  //Buscar comida por ID
  router.get("/api/ComidasMEX/:ComidasMEX_id", (req, res) => {
    (async () => {
      try {
        const doc = db.collection("ComidasMEX").doc(req.params.ComidasMEX_id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).send(response);
      } catch (error) {
        return res.status(500).send(error);
      }
    })();
  });
  
  //Consultar a traer todos las  ComidasMEX
  router.get("/api/ComidasMEX", async (req, res) => {
    try {
      const query = db.collection("ComidasMEX");
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;
  
      const response = docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        descripcion: doc.data().descripcion,
        precio: doc.data().precio,
      }));
      return res.status(200).json(response);
    } catch (error) {}
    return res.status(500).json();
  });
  
  // Borrar ComidasMEX
  router.delete("/api/ComidasMEX/:ComidasMEX_id", async (req, res) => {
    try {
      const document = db.collection("ComidasMEX").doc(req.params.ComidasMEX_id);
      await document.delete();
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json();
    }
  });
  
  //Actuazalizar datos ComidasMex
  router.put("/api/ComidasMEX/:ComidasMEX_id", async (req, res) => {
    try {
      const document = db.collection("ComidasMEX").doc(req.params.ComidasMEX_id);
      await document.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
      });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json();
    }
  });

module.exports = router