# 📘 Proyecto Directorio Univalle

Este proyecto es un sistema de directorio universitario desarrollado con **Django** para el backend y **React + Vite** para el frontend. Su propósito es facilitar la consulta y administración de información institucional.

---

## 🧰 Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- **Python 3.x**
- **PostgreSQL**
- **Node.js** y **npm**
- **Git** (opcional, pero recomendado)
- **Virtualenv** (puedes instalarlo con el siguiente comando):
```bash
pip install virtualenv
```

## 🚀 Configuración del Backend (Django)
### 1. Clonar o descargar el proyecto
Opción 1: Clonar desde GitHub
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

Opción 2: Descargar como .zip
1. Accede al repositorio en GitHub.
2. Haz clic en Code > Download ZIP.
3. Extrae el contenido en tu equipo.

### 2. Crear y activar el entorno virtual
Crear entorno virtual
Desde la raíz del proyecto:
```bash
python -m venv venv
```

Activar entorno virtual
En Linux o Git Bash (Windows):
```bash
source venv/Scripts/activate
```

En Windows CMD:
```cmd
venv\Scripts\activate
```

### 3. Instalar dependencias del backend
Con el entorno virtual activado:
```bash
pip install -r requirements.txt
```

### 4. Configurar la base de datos PostgreSQL
Debes crear una base de datos con los siguientes parámetros:
```txt
Nombre (NAME): univalle_directorio
Usuario (USER): postgres
Contraseña (PASSWORD): 123
Host (HOST): localhost
Puerto (PORT): 5432
```

Puedes hacerlo desde pgAdmin o desde la terminal de PostgreSQL.

Además, habilita la extensión unaccent con el siguiente comando SQL:
```sql
CREATE EXTENSION IF NOT EXISTS unaccent;
```

### 5. Aplicar migraciones y crear superusuario
Ubícate en el directorio del proyecto Django:
```bash
cd backend/directorio_univalle
```

Luego ejecuta:
```bash
python manage.py makemigrations
python manage.py migrate
```

Crea un superusuario para acceder al panel administrativo:
```bash
python manage.py createsuperuser
```
Sigue las instrucciones para ingresar usuario, correo y contraseña.


6. Ejecutar el servidor de desarrollo
Aún en el directorio backend/directorio_univalle, ejecuta:
```bash
python manage.py runserver
```
Luego abre tu navegador en: http://127.0.0.1:8000/


## ⚛️ Configuración del Frontend (React + Vite)
> 🧠 **Nota importante:** Abre una **nueva terminal** para ejecutar el frontend, ya que el backend debe seguir corriendo en la terminal actual.

### 🔁 Activar entorno virtual
Antes de ejecutar cualquier comando en el frontend, activa nuevamente el entorno virtual, ya que este contiene configuraciones y dependencias necesarias para ambos entornos (backend y frontend).

En Linux o Git Bash (Windows):
```bash
source venv/bin/activate
```

En Windows CMD:
```cmd
venv\Scripts\activate
```

### 1. Ir a la carpeta del frontend
Desde la raíz del proyecto:

```bash
cd frontend
```

### 2. Instalar dependencias del frontend
```bash
npm install
```
### 3. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

El frontend estará disponible en: http://localhost:5173/

## ✅ Notas adicionales
El frontend utiliza Material UI para la construcción de componentes visuales.

Asegúrate de que backend y frontend estén ejecutándose al mismo tiempo para un funcionamiento completo de la aplicación.

El backend expone una API REST consumida por React.

## 🧑‍💻 Autor
Desarrollado por el equipo de Soporte y Desarrollo OITEL - Universidad del Valle.









