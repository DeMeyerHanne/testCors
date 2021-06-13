import { Formik, Form, Field } from 'formik';
import Photo from '../images/User.png'
import React, { useState } from 'react';
import { postData } from '../utils/dataAccess';
import NewUser from '../utils/newUser';
import { Link, useHistory } from 'react-router-dom';


/* validation */
const AddUser = (props: any) => {
	const [newUser, setNewUser] = useState<NewUser>({
		firstName: "",
		lastName: "",
		weight: 0,
		length: 0,
		gender: "",
		birthDate: new Date(),
		therapistID: "",
		description: "",
		sessionID: ""
	})

	/* Validation */
	function validateString(value: any) {
		let error;
		if (!value) {
		  	error = 'Required';
		} else if (!/^[ a-zA-Z\-\’]+$/i.test(value)) {
			error = 'Only letters are allowed.'
		}
		return error;
	}

	function validateDate(value: string) {
		let error;

		if (!value) {
		  	error = 'Required';
		} 
		return error;
	}

	function validateNumber(value: any) {
		let error;
		if (!value) {
			error = 'Required';
		} else if (value < 0) {
			error = 'Only positive numbers';
		} else if (value > 230) {
			error = "230 is the maximum"
		} else if (/^[ a-zA-Z\-\’]+$/i.test(value)) {
			error = 'Only numbers are allowed.'
		}
		return error;
	}

	function validateDescription(value: any) {
		let error;
		if (!value) {
			error = 'Required';
		} 
		return error;
	}

	function validateSelect(value: any) {
		let error;
		if (!value) {
			error ='Required';
		}
		return error;
	}

	/* User to database */
	const history = useHistory();
	
	const addNewUser = () => {
		console.log(newUser.firstName);
		postData("http://smapi-ip-2.azurewebsites.net/api/users", {
            firstName: newUser.firstName,
			lastName: newUser.lastName,
			weight: newUser.weight,
			length: newUser.length,
			gender: newUser.gender,
			birthDate: newUser.birthDate,
			therapistID: "09a0aaf5-4063-42d1-a35b-c50382b9a044",
			description: newUser.description,
			sessionID: "Aloha"
        }).then((data) => {
            console.log(data);

			// history.push(`/users/09a0aaf5-4063-42d1-a35b-c50382b9a044`); // hardcoded terug naar userPage met therapistID=x
			
		}).catch((e) => console.error(e));
	}


    return(
		<div className="c-user-layout">
			<div className="c-user-layout__form">
				<h1 className="c-user-layout__title">Add user</h1>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						weight: 0,
						length: 0,
						gender: '',
						birthDate: new Date(),
						therapistID: '09a0aaf5-4063-42d1-a35b-c50382b9a044',
						description: '',
						sessionID: 'Aloha'
					}}
					onSubmit={values => {
						console.log(values);
						setNewUser(values);
						addNewUser();
					}}
				>
				{({ errors, touched, isValidating }) => (
					<Form className="c-user-layout__card" action="#">
						<div className="c-user-form-placing">
							<div className="c-user-form">
								<label className="c-user-form__label">
									First name
								</label>
								<Field 
									className="c-user-form__input c-user-form__input-general c-user-form__input-margin" 
									validate={validateString}
									placeholder="Annelotte*"
									type="text"
									name="firstName"
									id="firstName"
								/>
								{errors.firstName && touched.firstName ? <div className="c-validation">{errors.firstName}</div> : null}
							</div>
							<div>
								<label className="c-user-form__label">
									Last name
								</label>
								<Field 
									className="c-user-form__input c-user-form__input-general c-user-form__input-margin"
									validate={validateString} 
									placeholder="Schippers*"
									type="text"
									name="lastName"
									id="lastName"
								/>
								{errors.lastName && touched.lastName ? <div className="c-validation">{errors.lastName}</div> : null}
							</div>
							<div>
								<label className="c-user-form__label">
									Date of birth
								</label>
								<Field 
									className="c-user-form__input c-user-form__input-gender c-user-form__input-margin"  
									validate={validateDate} 
									type="date"
									name="birthDate"
									id="birthDate"
								/>
								{errors.birthDate && touched.birthDate ? <div className="c-validation">{errors.birthDate}</div> : null}
							</div>
						</div>	
						
						<div className="c-user-form-placing">
							<div className="c-user-form c-user-box__position">
								<label className="c-user-form__label">
									Gender
								</label>
								<Field 
									className="c-user-form__input-select c-user-form__input-margin c-user-box"									
									placeholder="(Fe)male*"
									validate={validateSelect}
									// as="select"
									type="text"
									name="gender"
									id="gender"
								>
									{/* <option value="" selected disabled>Gender*</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option> */}
								</Field>
								{errors.gender && touched.gender ? <div className="c-validation">{errors.gender}</div> : null}
							</div>
							<div className="c-user-form">
								<label className="c-user-form__label">
									Length
								</label>
								<div className="c-user-form__weight-height">
									<Field 
											className="c-user-form__input c-user-form__input-weight-height c-user-form__input-margin" 
											validate={validateNumber} 
											placeholder="164*"
											type="number"
											name="length"
											id="length"
										/>
									<p className="c-user-form__cm">cm</p>
								</div>
								{errors.length && touched.length ? <div className="c-validation">{errors.length}</div> : null}
							</div>
							<div className="c-user-form">
								<label className="c-user-form__label">
									Weight
								</label>
								<div className="c-user-form__weight-height">
										<Field 
												className="c-user-form__input c-user-form__input-weight-height c-user-form__input-margin" 
												validate={validateNumber}
												placeholder="Weigth*" 
												type="number"
												name="weight"
												id="weight"
											/>
										<p className="c-user-form__kg">kg</p>
									</div>
								{errors.weight && touched.weight ? <div className="c-validation">{errors.weight}</div> : null}
							</div>
						</div>

						<div className="c-user-form-placing">
							<div className="c-user-form">
								<label className="c-user-form__label">
									Description
								</label>
								<Field
									className="c-user-form__input c-user-form__input-description" 
									validate={validateDescription}
									as="textarea"
									placeholder="Annelotte has trouble with...*"
									type="text"
									name="description"
									id="description"
								/>	
								{errors.description && touched.description ? <div className="c-validation">{errors.description}</div> : null}
							</div>
						</div>
						
						
						<p className="u-align-text-center">
							<button className="o-button-reset u-align-text-center c-user-layout__button" type="submit">
								Save user
							</button>
						</p>
					</Form>
					)}
				</Formik>
			</div>

			<aside className="c-user-image__holder">
				<img className="c-user-image" src={Photo} alt="A drawing of charts and checklists."/>
			</aside>
		</div>
	)
}

export default AddUser;