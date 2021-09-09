## Table of Contents

1. [Info General](#info-general)
2. [Tecnologías](#tecnologias)
3. [Instalación](#instalacion)
4. [Extras](#extras)

### Info General

---

Crear un servidor con Node que sirva una interfaz HTML y cuya temática está basada en el registro
de gastos entre roommates.

## Tecnologías

---

Una lista de tecnologías utilizadas en el proyecto:

- [Jquery](https://jquery.com): Version 3.6.0
- [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript): Version ECMAScript 2020
- [Bootstrap](https://example.com): Version 4.5.3

## Instalación

---

Pasos para la instalación desde github.

```
# clonar repositorio
$ git clone https://github.com/dozz1e/Prueba---Roommates.git

# Ruta a directorio clonado
$ cd ../ruta/al/directorio/clonado

# instalar dependencias
$ npm install

# servidor con hot relad en localhost:3000
$ npm run dev

# construir para producción y lanzar servidor
$ npm run build
$ npm run start

# generar proyecto estático
$ npm run generate
```

## Extras

---

Lista de extras agregados al código

1. **Modificación index.html**
   Se hace ingreso de ids de los roommates en el select para mejor actualización de los gastos
2. **Modulación de JS**
   Creación de modulos dentro de la carpeta modulos:

- correo.js
- gasto.js
- roommates.js

3. **JSON**
   Creación de json en carpeta json:

- roommates.json ({ "roommates": [] })
- gastos.js ({ "gastos": [] })
