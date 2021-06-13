import { Field } from "formik";
import React from "react";

const UserFormName = (props: any) => {
	return (
		<div className="c-user-form">
			<input 
				className={`c-user-form__input c-user-form__input-margin c-user-form__input-${props.class}`}  
				type={props.type} 
				placeholder={props.placeholder} 
				required
			/>								
		</div>
		

		
	);
};
export default UserFormName;