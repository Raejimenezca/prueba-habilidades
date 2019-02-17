- EJECUCION:
  En la ruta "src/" del proyecto abrir una terminal y ejecutar "npm run dev"

- FUNCIONALIDADES:

1. El usuario puede listar todos los productos disponibles.
2. El usuario puede listar todos sus pedidos.
3. El usuario puede ver el total de los pedidos con respecto a los productos.
4. Nuevos usuarios se pueden registrar en el sistema.
5. El usuario puede cambiar su información estando loggeado.
6. Cuando el usuario elige un municipio se guarda su código tomado del JSON (https://www.datos.gov.co/resource/xdk5-pm3f.json)
7. Se controla que los usuarios loggeados no puedan acceder a login y signup, además los usuarios que no están loggeados no pueden acceder a pedidos ni a al perfil. 

- NOTAS:

1. Al registrar un usuario la contraseña es encriptada, por tanto cuando los 'inserts' a la base de datos se hacen desde script SQL las contraseñas nunca van a hacer match, los usuarios DEBEN ser registrados desde el formulario de registro para que la encriptación y recuperación de los datos se haga correctamente.

2. La ciudad se inserta tal cual como se llama pero en la base de datos se guarda por su codo de municipio segun el dane.

