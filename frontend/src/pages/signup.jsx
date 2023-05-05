import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const Signup = () => {
	const { store, actions } = useContext(Context);

	const signup = async (e) => {
		e.preventDefault();
		console.log('entre en la función');

		const data = new FormData(e.target);
		console.log(data.get('password'));
		let email = data.get('email');
		let password = data.get('password');

		//let url = process.env.URL_BACKEND;
		let obj = {
			email: email,
			password: password,
		};

		let response = await actions.fetchGenerico('signup', obj, 'POST');

		if (response.ok) {
			console.log(response.statusText);
			response = await response.json();
			alert(response.message);
		} else {
			response = await response.json();
			if (response !== undefined) alert(response.message);
			else alert('Internal error');
			return;
		}
	};

	return (
		<div>
			{/* <div
				className="container d-flex justify-content-center align-items-center"
				style={{ minHeight: '40vw', maxHeight: '100%', marginTop: '5%' }}
			>
				<div
					className="card text-center border-0"
					style={{ minWidth: '50%', maxWidth: '100%', maxHeight: '100%' }}
				>
					<div
						className="card-header cabezoteRegistro"
						style={{ width: '100%' }}
					>
						<h3>Sign-up</h3>
					</div>
					<div
						className="card-body cajatextoRegistro"
						style={{ width: '100%' }}
					>
						<form onSubmit={(e) => signup(e)}>
							<div className=" d-flex flex-column bd-highlight mb-3">
								<div className="row d-flex my-3 me-0 justify-content-center">
									<label className="input-label">Nombre:</label>
									<div className="input-group justify-content-center">
										<span className="input-group-text iconos" id="basic-addon1">
											<box-icon
												className="input-group-text iconos"
												name="user"
											/>
										</span>
										<input
											className="inputs col-5"
											name="name"
											placeholder="Escriba aquí su nombre"
											type="string"
										/>
									</div>
								</div>
								<div className="row d-flex mb-3 me-0 justify-content-center">
									<label className="input-label">Apellido:</label>
									<div className="input-group justify-content-center">
										<span className="input-group-text iconos" id="basic-addon1">
											<box-icon
												className="input-group-text iconos"
												name="user"
											/>
										</span>
										<input
											className="inputs col-5"
											name="last_name"
											placeholder="Escriba aquí su apellido"
											type="string"
										/>
									</div>
								</div>
								<div className="row d-flex mb-3 me-0 justify-content-center">
									<label className="input-label">Email:</label>
									<div className="input-group justify-content-center">
										<span className="input-group-text iconos" id="basic-addon1">
											<box-icon
												className="input-group-text iconos"
												name="envelope"
											/>
										</span>
										<input
											className="inputs col-5"
											name="email"
											placeholder="Escriba aquí su email"
											type="email"
										/>
									</div>
								</div>
								<div className="row d-flex mb-3 me-0 justify-content-center">
									<label className="input-label">Contraseña:</label>
									<div className="input-group justify-content-center">
										<span className="input-group-text iconos" id="basic-addon1">
											<box-icon
												className="input-group-text iconos"
												name="lock-open"
											/>
										</span>
										<input
											className="inputs col-5"
											name="password"
											placeholder="Escriba aquí su clave"
											type="password"
										/>
									</div>

									<div>
										<span id="passwordHelpInline" className="form-text">
											Debe tener entre 8-20 caracteres
										</span>
									</div>
								</div>
							</div>
							<button className="btn buttonRegister" type="submit">
								Registrarse
							</button>
						</form>
					</div>
				</div>
			</div> */}
			<div className="container">
				<div className="row">
					<div className="col-6">
						<div class="mb-3">
							<label for="" class="form-label">
								Name
							</label>
							<input
								type="text"
								class="form-control"
								name=""
								id=""
								aria-describedby="helpId"
								placeholder=""
							/>
							<small id="helpId" class="form-text text-muted">
								Help text
							</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
