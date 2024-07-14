import React, { useEffect, useState } from "react";

import icono from "../../img/icono.png"

//create your first component
const Home = () => {

	const [todos, setTodos]= useState([]); // ALMACENA LA LISTA DE TAREAS
	const [nuevaTarea, setNuevaTarea]= useState(''); //ALMACENA LOS VALORES DEL INPUT para nuevas tareas
	const [name, setName]= useState(''); //ALMACENA EL NOMBRE DEL USUARIO INTRODUCIDO
	const [userCreado, setUserCreado] = useState(false); //VERIFICA SI EL USER SE HA CREADO

	//FUNCION CREAR USUARIO
	const user = async (name) => {
		const url = `https://playground.4geeks.com/todo/users/${name}`;
		const opt= {method: "POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify([])}; 
		const resp = await fetch(url, opt);
			if (!resp.ok) {
				console.log("Error al cargar user", resp.status, resp.statusText);
			}
			else{
				console.log("Usuario creado", resp.status);
				setUserCreado(true); // Actualiza estado a user creado
				fetchList(name); // Pasa el nombre del usuario a fetchList, obtenemos las tareas del user
			}
	};
	
	//FUNCIÓN CREAR TAREAS
	const CrearTarea = async () => {
		const url = `https://playground.4geeks.com/todo/todos/${name}`;
		const opt= {method: "POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({label: nuevaTarea,is_done:false})}; 
		const resp = await fetch(url, opt);
			if (!resp.ok) {
				console.log("Error al crear tarea", resp.status, resp.statusText);
			}
			else{
				console.log("Creada tarea")
				const data = await resp.json();
				console.log(data); //data ES un OBJETO
		  		setNuevaTarea(""); // Limpiar el campo de entrada
				fetchList(name);// Volver a cargar la lista de tareas
			}
	};

	//FUNCION ELIMINAR TAREA
	const EliminarTarea = async (id) =>{
		const url = `https://playground.4geeks.com/todo/todos/${id}`; 
		const opt= {method: "DELETE"};
		const resp = await fetch(url, opt);
		if (!resp.ok) {
			console.log("Aquí hay un error", resp.status, resp.statusText);
		}
		else{
			console.log("Eliminada tarea")
			fetchList(name);// Volver a cargar la lista de tareas
		}
	};

	//funcion para traer la lista de todos de la api
	const fetchList = async (name) => {
		
			//GET VER LISTA DE TAREAS
			const url = `https://playground.4geeks.com/todo/users/${name}`;
			const opt= {method: "GET"}; 
			const resp = await fetch(url, opt);
			if (!resp.ok) {
				console.log("Aquí hay un error", resp.status, resp.statusText);
			}
		  // Si la lista se recibe, los todos son cargadas con los todos
		  	const data = await resp.json();
			console.log(data); //data ES un OBJETO
		  	setTodos(data.todos);// Aquí se actualiza la variable "todos" con los datos entrantes
		}
		
	// Esta función useEffect se ejecutará solo una vez, cuando el componente finalmente se cargue por primera vez
	//useEffect(() => {
	//	fetchList(); // aquí obtengo mis todos de la API
	//}, []); //// <---- gracias a esta matriz vacía el efecto de uso se llamará solo una vez

	const handleSubmit = e => {
		e.preventDefault()
		console.log(name)
		user(name)
	}
	const handleNameChange = e => {
		setName(e.target.value)
	}
			
	return (
			<div className="container-fluid mb-2">
				<div className="text-center ">
				<img src={icono} />
				</div>

				<form onSubmit={handleSubmit} className="input-group mb-3 ">
					<input type="text" placeholder="  Introduce tu nombre " className="form-control p-2" onChange={handleNameChange}></input>
					<input type="submit" className="btn btn-primary fs-2" value="Crear usuario"></input>
				</form>

				<h1 className="titulo">Lista de tareas de {name}</h1>

				<div className="contenedor">
				<ul>
					<li>
					<input 
					type="text" placeholder="What do you need to do?" 
					value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} ></input>
					</li>

				{todos.map((item)=>(
					<li key={item.id}>
						{item.label} 
						<i className="fa-regular fa-trash-can" onClick={() => EliminarTarea(item.id)}></i>
					</li>
				))}
				</ul>
				<p className="numTasks m-0">{todos.length} Tasks</p>
				</div>

				<div className="mb-5">
					<input type="submit" className="btn btn-primary fs-2" value="Añadir tarea" onClick={CrearTarea} ></input>
				</div>
			</div>

	);
};

export default Home;