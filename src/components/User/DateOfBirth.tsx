const Month = (props: any) => {
	return (
		<div>
			<label className="c-user-form__label" htmlFor={props.id}>
				{props.label}
			</label>
            <select id="cars" name="cars" className="test">
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">Ma</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="Septmber">Septmber</option>
                <option value="October">Octobe</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
			{/* <span className="c-label__error-message">
				A username is required
			</span> */}
		</div>
		

		
	);
};
export default Month;

// code die hoort bij add user date of birth
{/* <Form 
    label="Date of birth*"
    placeholder="1"
    name="Day"
    type="number"
/> */}
{/* <Form 
    placeholder="January"
    name="Month"
    type="Text"
/> */}
{/* <Form 
    placeholder="2000"
    name="Year"
    type="number"
/>  */}