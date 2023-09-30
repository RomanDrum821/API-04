//
const express = require("express"); //Crear servidores HTTP - Apache, etc
const app = express();
const puerto = process.env.PORT || 3000;
//Habilitamos que el servidor acepte las solicitudes
app.use(express.json());

//Arreglo de objetos de peliculas
const peliculas = [
  {
    ID: 1,
    Titulo: "El Padrino",
    Director: "Francis Ford Coppola",
    AnoLanzamiento: 1972,
    Genero: "Drama",
    Calificacion: 9.2,
  },
  {
    ID: 2,
    Titulo: "Titanic",
    Director: "James Cameron",
    AnoLanzamiento: 1997,
    Genero: "Romance",
    Calificacion: 7.8,
  },
  {
    ID: 3,
    Titulo: "Pulp Fiction",
    Director: "Quentin Tarantino",
    AnoLanzamiento: 1994,
    Genero: "Crimen",
    Calificacion: 8.9,
  },
  {
    ID: 4,
    Titulo: "Avatar",
    Director: "James Cameron",
    AnoLanzamiento: 2009,
    Genero: "Ciencia ficción",
    Calificacion: 7.8,
  },
  {
    ID: 5,
    Titulo: "Forrest Gump",
    Director: "Robert Zemeckis",
    AnoLanzamiento: 1994,
    Genero: "Drama",
    Calificacion: 8.8,
  },
  {
    ID: 6,
    Titulo: "El Señor de los Anillos: El Retorno del Rey",
    Director: "Peter Jackson",
    AnoLanzamiento: 2003,
    Genero: "Fantasía",
    Calificacion: 8.9,
  },
  {
    ID: 7,
    Titulo: "Matrix",
    Director: "Lana Wachowski, Lilly Wachowski",
    AnoLanzamiento: 1999,
    Genero: "Ciencia ficción",
    Calificacion: 8.7,
  },
  {
    ID: 8,
    Titulo: "Gladiador",
    Director: "Ridley Scott",
    AnoLanzamiento: 2000,
    Genero: "Acción",
    Calificacion: 8.5,
  },
  {
    ID: 9,
    Titulo: "La La Land",
    Director: "Damien Chazelle",
    AnoLanzamiento: 2016,
    Genero: "Musical",
    Calificacion: 8.0,
  },
  {
    ID: 10,
    Titulo: "Interestelar",
    Director: "Christopher Nolan",
    AnoLanzamiento: 2014,
    Genero: "Ciencia ficción",
    Calificacion: 8.6,
  },
];

//-----------------------------------------------------------------
//-----------------------------------------------------------------
app.get("/socios/v1/peliculas", (req, res) => {
  //1. Verificar si existen peliculas
  if (peliculas) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existen peliculas",
      peliculas: peliculas,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No existen peliculas",
      peliculas: peliculas,
    });
  }
});
//-----------------------------------------------------------------
app.get("/socios/v1/peliculas/:ID", (req, res) => {
  const ID = req.params.ID;
  //Obtenemos la categoria basada en el id
  const pelicula = peliculas.find((pelicula) => pelicula.ID == ID);

  if (pelicula) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existe la pelicula",
      pelicula: pelicula,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No se encontro la pelicula",
      pelicula: pelicula,
    });
  }
});
//-----------------------------------------------------------------
app.post("/socios/v1/peliculas", (req, res) => {
  //Crear un recurso - crear una pelicula
  //Requerimos
  //id = generar un numero aleatorio
  //nombre y descripcion = Body
  const { Titulo, Director, AnoLanzamiento, Genero, Calificacion } = req.body;
  const ID = Math.round(Math.random() * 1000);
  //Comprobar que el cliente = usuario = programador si envie
  if (!Titulo || !Director || !AnoLanzamiento || !Genero || !Calificacion) {
    res.status(400).json({
      estado: 0,
      mensaje: "Bad request - Faltan parametros en la solicitud",
    });
  } else {
    const pelicula = {
      ID: ID,
      Titulo: Titulo,
      Director: Director,
      AnoLanzamiento: AnoLanzamiento,
      Genero: Genero,
      Calificacion: Calificacion,
    };
    const longitudInicial = peliculas.length;
    peliculas.push(pelicula);
    if (peliculas.length > longitudInicial) {
      //Todo ok de parte del cliente y servidor
      res.status(201).json({
        estado: 1,
        mensaje: "Pelicula creada",
        pelicula: pelicula,
      });
    } else {
      //Error del servidor
      res.status(500).json({
        estado: 0,
        mensaje: "La pelicula no se pudo crear",
      });
    }
  }
});
//-----------------------------------------------------------------
app.put("/socios/v1/peliculas/:ID", (req, res) => {
  //id viene ?= params
  //nombre y descripcion ?= body
  const { ID } = req.params;
  const { Titulo, Director, AnoLanzamiento, Genero, Calificacion } = req.body;
  if (!Titulo || !Director || !AnoLanzamiento || !Genero || !Calificacion) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan parametros en la solicitud",
    });
  } else {
    const posActualizar = peliculas.findIndex((pelicula) => pelicula.ID == ID);
    console.log(posActualizar);
    if (posActualizar != -1) {
      //si encontro la categoria
      //Actualizar la categoria
      peliculas[posActualizar].Titulo = Titulo;
      peliculas[posActualizar].Director = Director;
      peliculas[posActualizar].AnoLanzamiento = AnoLanzamiento;
      peliculas[posActualizar].Genero = Genero;
      peliculas[posActualizar].Calificacion = Calificacion;
      res.status(200).json({
        estado: 1,
        mensaje: "Pelicula actualizada correctamente",
        pelicula: peliculas[posActualizar],
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Pelicula no encontrada",
      });
    }
  }
});
//-----------------------------------------------------------------
app.delete("/socios/v1/peliculas/:ID", (req, res) => {
  //Eliminar un recurso del servidor - Eliminar una peliculas
  const { ID } = req.params;
  const indiceEliminar = peliculas.findIndex((pelicula) => pelicula.ID == ID);
  if (indiceEliminar != -1) {
    //Borrar la peliculas
    peliculas.splice(indiceEliminar, 1);
    res.status(201).json({
      estado: 1,
      mensaje: "Pelicula Eliminada",
    });
  } else {
    //Pelicula no encontrada
    res.status(404).json({
      estado: 0,
      mensaje: "Peliculas no encontrada",
    });
  }
});
//-----------------------------------------------------------------
//-----------------------------------------------------------------

app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto: ", puerto);
});
