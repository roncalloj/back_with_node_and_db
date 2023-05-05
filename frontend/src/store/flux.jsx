const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: '',
		},
		actions: {
			fetchGenerico: async (endpoint, data, metodo) => {
				let url = process.env.BACKEND_URL;
				let response = await fetch(url + endpoint, {
					method: metodo,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});
				return response;
			},
			login: async (endpoint, data, metodo) => {
				let url = process.env.BACKEND_URL;
				let response = await fetch(url + endpoint, {
					method: metodo,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				});
				let responseJson = await response.json();
				console.log(responseJson.token);
				let token = responseJson.token;
				setStore({ token: token }); //reseteo todo el store
				return response;
			},

			fetchProtegido: async (endpoint, data = undefined, metodo = 'GET') => {
				const store = getStore();
				let url = process.env.BACKEND_URL;
				let encabezado = {
					method: metodo,
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + store.token,
					},
					body: data ? JSON.stringify(data) : undefined,
				};

				let response = await fetch(url + endpoint, encabezado);
				return response;
			},
		},
	};
};

export default getState;
