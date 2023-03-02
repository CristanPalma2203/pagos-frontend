
<a name="readme-top"></a>

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/logo.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">POS SENASA</h3>

  <p align="center">
    Proyecto desarrollado para la creacion y seguimiento de los recibos para la obtencion de servicios de SENASA
    <br />
    <a href="https://github.com/CristanPalma2203/pagos-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/CristanPalma2203/pagos-frontend/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## Acerca De

![Product Name Screen Shot][product-screenshot]
Este proyecto fue mi primer proyecto desarrollado de manera individual utilizando C# como lenguaje principal para la parte de backend y React Hooks junto a Redux para la parte de frontend. Se implementaron diferentes librerías y herramientas para garantizar una solución robusta y escalable.

En la parte de backend, se utilizó el modelo de capas MVC y las librerías Fluent, Ardalis Specificaction, Autofac, Automapper y GRPC para la gestión de la base de datos y la comunicación con la capa de presentación. Además, para la gestión de sesiones, se utilizó Redis para la generación y administración de los tokens de sesión. Para el control de las migraciones se utilizó Fluent Migrator.

El proyecto también incluye un servicio de correo electrónico que notifica al usuario sobre el estado de sus gestiones, así como la creación de un archivo PDF del recibo generado por el sistema.

En la parte de frontend, se utilizó React Hooks y Redux para crear una interfaz de usuario amigable e intuitiva para el usuario.

Para la gestión del servidor, se desplegó el proyecto en un contenedor Docker y se gestionó el servidor desde una instancia de AWS, lo que garantizó una alta disponibilidad y escalabilidad del proyecto.

Este proyecto representa un hito importante en mi carrera como desarrollador, ya que me permitió demostrar mis habilidades y dedicación para crear una solución completa y escalable de manera individual.

En resumen, este proyecto es una muestra de mi capacidad para trabajar con diferentes tecnologías y librerías para crear soluciones de software completas y escalables que incluyen servicios de correo electrónico, para la notificacion de gestiones de sus recibos, para el cambio de contraseña o recuperacion de contraseña tambien se implemento la generación de PDF para los recibos.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Hecho Con

* ![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
* ![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

<!-- GETTING STARTED -->
## Getting Started

* Abre la consola o terminal de tu sistema.
* Ubícate en la carpeta donde deseas clonar el repositorio.
* Ejecuta el siguiente comando:
* npm
  ```sh
  git clone https://github.com/CristanPalma2203/pagos-frontend.git
  ```

### Requisitos previos

Tener Node.js y npm instalados en tu sistema. Puedes descargar la última versión de Node.js desde su sitio web oficial: https://nodejs.org/

Para instalar npm puedes usar el siguiente comando
* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalacion


1. Ubícate en la carpeta raíz del proyecto:
* npm
  ```sh
  cd pagos-frontend
  ```
2. Instala las dependencias con el siguiente comando:
   ```sh
   npm install
   ```
3. Ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:
   ```sh
   npm start
   ```
4. Abre tu navegador en la siguiente dirección: http://localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- CONTACT -->

## Contacto

Cristian Palma - [@AlexPalma2203](https://twitter.com/AlexPalma2203) - cristianpalma1703@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Screenshots

![Screenshot 1][product-screenshot]
![Screenshot 2][product-screenshot2]
![Screenshot 3][product-screenshot3]
![Screenshot 4][product-screenshot4]
![Screenshot 5][product-screenshot5]
![Screenshot 6][product-screenshot6]
![Screenshot 7][product-screenshot7]
![Screenshot 8][product-screenshot8]
![Screenshot 9][product-screenshot9]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/CristanPalma2203/pagos-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/CristanPalma2203/pagos-frontend/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/cristian-palma-07a407259/
[product-screenshot]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/1.png?raw=true
[product-screenshot2]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/2.png?raw=true
[product-screenshot3]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/3.png?raw=true
[product-screenshot4]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/4.png?raw=true
[product-screenshot5]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/5.png?raw=true
[product-screenshot6]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/6.png?raw=true
[product-screenshot7]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/7.png?raw=true
[product-screenshot8]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/8.png?raw=true
[product-screenshot9]: https://github.com/CristanPalma2203/pagos-frontend/blob/master/src/assets/readme/9.png?raw=true

