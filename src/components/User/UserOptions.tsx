import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteData } from "../../utils/dataAccess";
import DeleteUser from "../../utils/delUser";


const UserOptions = (props: any) => {
	const [optionsMenu, SetOptionsMenu] = useState("hiddenOptions");
	
	// function tableOption_Edit(user: any) {
	//  	console.log("edit is pressed");
	// 	console.log(user);
	// 	<Link
	// 		to={{ 
	// 			pathname: '/edituser',
	// 			state: user
	// 		}}
	// 	>
	// 	</Link>
	// 	console.log('halkdmfjqsd');
	// }

	function tableOption_Delete(user: any) {
		deleteData("http://smapi-ip-2.azurewebsites.net/api/users", {
            userID: props.userID,
			sessionID: "aloha"
		}).then((data) => {
            console.log(data);
			window.location.reload();
			
		}).catch((e) => console.error(e));
	}

	function optionsSwitch() {
		if (optionsMenu === "hiddenOptions") {
			SetOptionsMenu("activeOptions");
		} else {
			SetOptionsMenu("hiddenOptions");
		}
	}
	return (
		<div
			className={`c-UserPage__options`}
			onClick={() => {
				optionsSwitch();
			}}
		>
			<svg
				enableBackground="new 0 0 515.555 515.555"
				viewBox="0 0 515.555 515.555"
				fill="#3f536c"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
				<path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
				<path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
			</svg>
			<div className={`c-UserPage__hidden-options ${optionsMenu}`}>
				<Link 
					to={{
						pathname: `/edituser/${props.userID}`,
						state: props
					}}
				>
					<button
						className="c-UserPage__hidden-options--item"
						// onClick={() => tableOption_Edit(props.userID)}
					>
						<div className="c-UserPage__hidden-options--svg">
							<svg
								fill="#3f536c"
								viewBox="0 0 492.49284 492"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0" />
								<path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0" />
							</svg>
						</div>
						<p>Edit</p>
					</button>
				</Link>
				<button
					className="c-UserPage__hidden-options--item"
					onClick={() => tableOption_Delete(props.userID)}
				>
					<div className="c-UserPage__hidden-options--svg">
						<svg
							enableBackground="new 0 0 512 512"
							viewBox="0 0 512 512"
							xmlns="http://www.w3.org/2000/svg"
							fill="#3f536c"
						>
							<g>
								<path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z" />
								<path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z" />
							</g>
						</svg>
					</div>
					<p>Delete</p>
				</button>
			</div>
		</div>
	);
};
export default UserOptions;
