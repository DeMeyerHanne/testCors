/* Get */
export const get = (endpoint: string) => {
	return fetch(endpoint).then((r) => r.json());
};

export async function postData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	});
	return response.json();
}

export async function putData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "PUT",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	});
	return response.json();
}

export async function deleteData(url = "", data = {}) {
	const response = await fetch(url, {
		method: "DELETE",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(data),
	});
	return response.json();
}

