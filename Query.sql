CREATE DATABASE [LIBRERIA_CABS]
GO

CREATE TABLE [LIBRERIA_CABS].[dbo].[Autor] (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Nombre VARCHAR(250) NOT NULL,
  FechaNacimiento DATE NOT NULL,
  Ciudad VARCHAR(50) NOT NULL,
  Correo VARCHAR(150) NOT NULL
)
GO

CREATE TABLE [LIBRERIA_CABS].[dbo].[Editorial] (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Nombre VARCHAR(250) NOT NULL,
  DireccionCorrespondencia VARCHAR(250) NOT NULL,
  Telefono VARCHAR(15) NOT NULL,
  Correo VARCHAR(150) NOT NULL,
  MaxLibroRegistrado INT NOT NULL
)
GO

CREATE TABLE [LIBRERIA_CABS].[dbo].[Libro] (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Titulo VARCHAR(150) NOT NULL,
  Anio INT NOT NULL,
  Genero VARCHAR(150) NOT NULL,
  Npaginas INT NOT NULL,
  EditorialId INT NOT NULL, 
  AutorId INT NOT NULL, 
  CONSTRAINT FK_Libro_Editorial_Id FOREIGN KEY (EditorialId) REFERENCES Editorial(Id),
  CONSTRAINT FK_Libro_Autor_Id FOREIGN KEY (AutorId) REFERENCES Autor(Id)
);
