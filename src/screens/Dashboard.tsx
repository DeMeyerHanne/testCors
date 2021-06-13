import React, { useEffect, useRef, useState } from "react";
import Component from "../components/dashboard/component";
import Icon from "../components/dashboard/icon";
import LogoWithText from "../components/general/logo_with_text";

import { Link, useParams } from "react-router-dom";
import { get, postData } from "../utils/dataAccess";
import useDidMountEffect from "../components/dashboard/useDidMountEffect";

const Dashboard = (props: any) => {
	//filters date
	const [filterSession, SetFilterSession] = useState([""]);
	const [filterDay, SetFilterDay] = useState([""]);
	const filterWeek = [""];
	const filterMonth = [""];
	const filterYear = [""];

	//@ts-ignore
	const { id } = useParams();

	// usestates
	//date from api
	const [stepData, SetStepData] = useState([0]);
	let [calorieData, SetCalorieData] = useState([0]);
	let [hearthData, SetHearthData] = useState([0]);

	const [ActiveTime, SetActiveTime] = useState("");
	const [HeightTime, setHeightTime] = useState("0px");
	const [RotateTime, SetRotateTime] = useState("");

	const [ActiveTracking, SetActiveTracking] = useState("");
	const [HeightTracking, setHeightTracking] = useState("0px");
	const [RotateTracking, SetRotateTracking] = useState("");

	//filter when radio button is pressed
	const [timeFilter, SetTimeFilter] = useState("session");
	const [filter, SetFilter] = useState(filterSession);

	const [filterOption, SetFilterOption] = useState("session");

	const [closeBtn, SetCloseBtn] = useState("");

	const [stepsComponent, SetStepsComponent] = useState("component-active");
	const [sizeSteps, SetSizeSteps] = useState("small");
	const [inputActiveSteps, SetInputActiveSteps] = React.useState(true);

	const [hearthComponent, SetHearthComponent] = useState("component-active");
	const [sizeHearth, SetSizeHearth] = useState("big");
	const [inputActiveHearth, SetInputActiveHearth] = React.useState(true);

	const [caloriesComponent, SetCaloriesComponent] =
		useState("component-active");
	const [sizeCalories, SetSizeCalories] = useState("small");
	const [inputActiveCalories, SetInputActiveCalories] = React.useState(true);

	const [distanceComponent, SetDistanceComponent] =
		useState("component-active");
	const [sizeDistance, SetSizeDistance] = useState("small");
	const [inputActiveDistance, SetInputActiveDistance] = React.useState(true);

	const [sleeptrackingComponent, SetSleeptrackingComponent] =
		useState("component-active");
	const [sizeSleep, SetSizeSleep] = useState("small");
	const [inputActiveSleep, SetInputActiveSleep] = React.useState(true);

	const content = useRef<null | HTMLDivElement>(null);

	const [ComponentClicked, SetComponentClicked] = useState("");

	const [user, SetUser] = useState({
		userID: 1,
		lastName: "Unknown",
		firstName: "Unknown",
		birthDate: "Unknown",
		weight: 0,
		length: 0,
		gender: "Unknown",
	});

	const [userTimeFilter, SetUserTimeFilter] = useState([]);

	const [userLst, SetUserLst] = useState<any[]>([]);

	const [age, SetAge] = useState();

	const [searchUserId, SetSearchUserId] = useState("");
	//useEffects
	useEffect(() => {
		switch (closeBtn) {
			case "steps":
				SetStepsComponent("component-hidden");
				SetInputActiveSteps(false);
				break;
			case "Calories":
				SetCaloriesComponent("component-hidden");
				SetInputActiveCalories(false);

				break;
			case "Heart rate":
				SetHearthComponent("component-hidden");
				SetInputActiveHearth(false);
				break;
			case "distance traveled ":
				SetDistanceComponent("component-hidden");
				SetInputActiveDistance(false);
				break;
			case "Sleeptracking":
				SetSleeptrackingComponent("component-hidden");
				SetInputActiveSleep(false);
				break;
		}
		if (ComponentClicked !== "") {
			SetSizeSteps("small");
			SetSizeCalories("small");
			SetSizeHearth("big");
			SetSizeDistance("small");
			SetSizeSleep("small");
			SetStepsComponent("component-active");
			SetInputActiveSteps(true);
			SetCaloriesComponent("component-active");
			SetInputActiveCalories(true);
			SetHearthComponent("component-active");
			SetInputActiveHearth(true);
			SetDistanceComponent("component-active");
			SetInputActiveDistance(true);
			SetSleeptrackingComponent("component-active");
			SetInputActiveSleep(true);
			SetComponentClicked("");
			SetCloseBtn("");
		}
	}, [closeBtn]);

	useEffect(() => {
		switch (ComponentClicked) {
			case "steps":
				SetSizeSteps("large");
				SetSizeCalories("none");
				SetSizeHearth("none");
				SetSizeDistance("none");
				SetSizeSleep("none");
				break;
			case "Calories":
				SetSizeSteps("none");
				SetSizeCalories("large");
				SetSizeHearth("none");
				SetSizeDistance("none");
				SetSizeSleep("none");
				break;
			case "Heart rate":
				SetSizeSteps("none");
				SetSizeCalories("none");
				SetSizeHearth("large");
				SetSizeDistance("none");
				SetSizeSleep("none");
				break;
			case "distance traveled":
				SetSizeSteps("none");
				SetSizeCalories("none");
				SetSizeHearth("none");
				SetSizeDistance("large");
				SetSizeSleep("none");
				break;
			case "Sleeptracking":
				SetSizeSteps("none");
				SetSizeCalories("none");
				SetSizeHearth("none");
				SetSizeDistance("none");
				SetSizeSleep("large");
				break;
		}
	}, [ComponentClicked]);

	useEffect(() => {
		// UserData;
		get("http://smapi-ip-2.azurewebsites.net/api/users").then((data) => {
			let userList = [];

			for (let i = 0; i < data.users.length; i++) {
				userList.push(data.users[i]);
			}
			SetUserLst(userList);
		});
	}, []);

	useDidMountEffect(() => {
		if (id !== "") {
			for (let i = 0; i < userLst.length; i++) {
				if (i.toString() === id) {
					SetUser(userLst[i]);
				}

				let birthday = new Date(userLst[i].birthDate);
				SetAge(
					//@ts-ignore
					birthday.getDate() +
						"/" +
						birthday.getMonth() +
						"/" +
						birthday.getFullYear()
				);
			}
		}
		// react please run me if 'key' changes, but not on initial render
	}, [userLst]);

	useDidMountEffect(() => {
		//userGraph data
		postData("http://smapi-ip-2.azurewebsites.net/api/session/get_data", {
			userID: user.userID,
		}).then((data) => {
			const NotNullData = [];
			//loop every session user
			for (let i = 0; i < data.data.length; i++) {
				//check if data inside session is not null. if notnull, put inside new array
				if (data.data[i].data !== null) {
					NotNullData.push(data.data[i]);
				}
			}
			if (timeFilter === "session") {
				SetUserTimeFilter(NotNullData[NotNullData.length - 1]);
			}
		});
	}, [user]);

	useDidMountEffect(() => {
		//userGraph data
		postData("http://smapi-ip-2.azurewebsites.net/api/session/get_data", {
			userID: user.userID,
		}).then((data) => {
			const NotNullData = [];
			const sessionData = [];

			//loop every session user
			for (let i = 0; i < data.data.length; i++) {
				//check if data inside session is not null. if notnull, put inside new array
				if (data.data[i].data !== null) {
					NotNullData.push(data.data[i]);
				}
			}
			//notnull has all sessions in array, get each array's data
			for (let a = 0; a < NotNullData.length; a++) {
				sessionData.push(NotNullData[a]);
			}

			if (timeFilter === "session") {
				SetUserTimeFilter(NotNullData[NotNullData.length - 1]);
			} else {
				//@ts-ignore
				SetUserTimeFilter(sessionData);
			}
		});
	}, [filterOption]);

	useDidMountEffect(() => {
		let dataArray_Steps = [];
		let dataArray_Calories = [];
		let dataArray_Heartrate = [];

		let dataArray_Steps_day = [];
		let dataArray_Calories_day = [];
		let dataArray_Heartrate_day = [];
		let dataArray_Labels_day = [];

		let sessionCalculations = "";
		let SessionLabels = [];

		if (filterOption === "session") {
			//count the datablocks and show in graph, also calculate amount of labels
			if (typeof userTimeFilter !== "undefined") {
				//@ts-ignore
				for (let i = 0; i < userTimeFilter.data.length; i++) {
					//@ts-ignore
					dataArray_Steps.push(userTimeFilter.data[i].steps);
					//@ts-ignore
					dataArray_Calories.push(userTimeFilter.data[i].calories);
					//@ts-ignore
					dataArray_Heartrate.push(userTimeFilter.data[i].heartrate);

					sessionCalculations = ((i + 1) * 15).toString() + "s";
					SessionLabels.push(sessionCalculations);
				}
				SetStepData(dataArray_Steps);
				SetCalorieData(dataArray_Calories);
				SetHearthData(dataArray_Heartrate);
				SetFilter(SessionLabels);
				SetFilterSession(SessionLabels);
			}
		}
		// 'last session' is special. if day, week, year... is checked, use this code
		else {
			const allData = [];
			for (let us = 0; us < userTimeFilter.length; us++) {
				//@ts-ignore
				//every session is 'usertimerfilter[us].data'. to get individual data we need forloop
				for (let l = 0; l < userTimeFilter[us].data.length; l++) {
					//@ts-ignore
					allData.push(userTimeFilter[us].data[l]);
				}
			}
			if (filterOption === "day") {
				const dataToday = [];
				const today = new Date();
				//@ts-ignore
				let dayTimeLabels = [];
				//only data with current day
				for (let x = 0; x < allData.length; x++) {
					const dataDate = new Date(allData[x].timestamp);

					let dT = dataDate.getDate();
					let thisDay = today.getDate();

					if (dT === thisDay) {
						dataToday.push(allData[x]);
					}
				}
				if (dataToday.length !== 0) {
					for (let u = 0; u < dataToday.length; u++) {
						let minutes = new Date(dataToday[u].timestamp);
						dataArray_Steps_day.push(dataToday[u].steps);

						dataArray_Calories_day.push(dataToday[u].calories);

						dataArray_Heartrate_day.push(dataToday[u].heartrate);

						dataArray_Labels_day.push(minutes.getHours() + ":00");
					}

					//data gets called correctly, but i want to split it in 10 parts and take average of every part (to much data in graph)

					const middleIndex = Math.ceil(dataToday.length / 10);

					const SplicedData = [];

					const correcteDataHearth = [];
					const correcteDataCalories = [];
					const correcteDataSteps = [];

					const firstHalf = dataToday.splice(0, middleIndex);
					const secondHalf = dataToday.splice(1, middleIndex);
					const thirdHalf = dataToday.splice(2, middleIndex);
					const fourthHalf = dataToday.splice(3, middleIndex);
					const fifthHalf = dataToday.splice(4, middleIndex);
					const sixedHalf = dataToday.splice(5, middleIndex);
					const seventhHalf = dataToday.splice(6, middleIndex);
					const eightHalf = dataToday.splice(7, middleIndex);
					const ninthHalf = dataToday.splice(8, middleIndex);
					const tenthHalf = dataToday.splice(9, middleIndex);
					for (let SD = 0; SD < 9; SD++) {
						switch (SD) {
							case 0:
								SplicedData.push(firstHalf);
								break;
							case 1:
								SplicedData.push(secondHalf);
								break;
							case 2:
								SplicedData.push(thirdHalf);
								break;
							case 3:
								SplicedData.push(fourthHalf);
								break;
							case 4:
								SplicedData.push(fifthHalf);
								break;
							case 5:
								SplicedData.push(sixedHalf);
								break;
							case 6:
								SplicedData.push(seventhHalf);
								break;
							case 7:
								SplicedData.push(eightHalf);
								break;
							case 8:
								SplicedData.push(ninthHalf);
								break;
							case 9:
								SplicedData.push(tenthHalf);
								break;
						}
					}

					let DataDevidedBy10Hearth = [];
					let DataDevidedBy10Calories = [];
					let DataDevidedBy10Steps = [];

					for (let spl = 0; spl < SplicedData.length; spl++) {
						let AllDataHearth = [];
						let AllDataCalories = [];
						let AllDataSteps = [];

						let timeDay = new Date(SplicedData[spl][0].timestamp);
						dayTimeLabels.push(timeDay.getHours() + ":00");

						for (let b = 0; b < SplicedData[spl].length; b++) {
							AllDataHearth.push(SplicedData[spl][b].heartrate);
							AllDataCalories.push(SplicedData[spl][b].calories);
							AllDataSteps.push(SplicedData[spl][b].steps);
						}

						let sumHearth = 0;
						let sumCalories = 0;
						let sumSteps = 0;

						let averageHearth = 0;
						let averageCalories = 0;
						let averageSteps = 0;

						//hearth
						for (let value of AllDataHearth) {
							sumHearth = sumHearth - -value;
						}
						averageHearth = sumHearth / AllDataHearth.length;
						DataDevidedBy10Hearth.push(averageHearth);

						//calories
						for (let value of AllDataCalories) {
							sumCalories = sumCalories - -value;
						}
						averageCalories = sumCalories / AllDataSteps.length;
						DataDevidedBy10Calories.push(averageCalories);
						//steps
						for (let value of AllDataSteps) {
							sumSteps = sumSteps - -value;
						}
						averageSteps = sumSteps / AllDataSteps.length;
						DataDevidedBy10Steps.push(averageSteps);
					}

					//hearth
					for (let t = 0; t < DataDevidedBy10Hearth.length; t++) {
						correcteDataHearth.push(DataDevidedBy10Hearth[t]);
					}
					//calories
					for (let t = 0; t < DataDevidedBy10Calories.length; t++) {
						correcteDataCalories.push(DataDevidedBy10Calories[t]);
					}
					//steps
					for (let t = 0; t < DataDevidedBy10Steps.length; t++) {
						correcteDataSteps.push(DataDevidedBy10Steps[t]);
					}

					SetStepData(correcteDataSteps);
					SetCalorieData(correcteDataCalories);
					SetHearthData(correcteDataHearth);
				} else {
					dayTimeLabels = ["no data"];
				}
				SetFilter(dayTimeLabels);
				SetFilterSession(dayTimeLabels);
			}
			if (filterOption === "month") {
				const data = [];
				const today = new Date();
				let dayTimeLabels = [];
				//only data with current month
				for (let x = 0; x < allData.length; x++) {
					const dataDate = new Date(allData[x].timestamp);

					let dT = dataDate.getMonth();
					let thisMonth = today.getMonth();

					if (dT == thisMonth) {
						data.push(allData[x]);
					}
				}
				if (data.length !== 0) {
					for (let u = 0; u < data.length; u++) {
						let minutes = new Date(data[u].timestamp);
						dataArray_Steps_day.push(data[u].steps);

						dataArray_Calories_day.push(data[u].calories);

						dataArray_Heartrate_day.push(data[u].heartrate);

						dataArray_Labels_day.push(minutes.getDate() + "");
					}
					//data gets called correctly, but i want to split it in 10 parts and take average of every part (to much data in graph)

					const middleIndex = Math.ceil(data.length / 30);

					const SplicedData = [];

					const correcteDataHearth = [];
					const correcteDataCalories = [];
					const correcteDataSteps = [];

					const firstHalf = data.splice(0, middleIndex);
					const secondHalf = data.splice(1, middleIndex);
					const thirdHalf = data.splice(2, middleIndex);
					const fourthHalf = data.splice(3, middleIndex);
					const fifthHalf = data.splice(4, middleIndex);
					const sixedHalf = data.splice(5, middleIndex);
					const seventhHalf = data.splice(6, middleIndex);
					const eightHalf = data.splice(7, middleIndex);
					const ninthHalf = data.splice(8, middleIndex);
					const tenthHalf = data.splice(9, middleIndex);
					const elevenHalf = data.splice(10, middleIndex);
					const twelfeHalf = data.splice(11, middleIndex);
					const dertienHalf = data.splice(12, middleIndex);
					const veertienHalf = data.splice(13, middleIndex);
					const vijftienHalf = data.splice(14, middleIndex);
					const zestienHalf = data.splice(15, middleIndex);
					const zeventienHalf = data.splice(16, middleIndex);
					const achtienHalf = data.splice(17, middleIndex);
					const negentienHalf = data.splice(18, middleIndex);
					const twintigHalf = data.splice(19, middleIndex);
					const twintig1Half = data.splice(20, middleIndex);
					const twintig2Half = data.splice(21, middleIndex);
					const twintig3Half = data.splice(22, middleIndex);
					const twintig4Half = data.splice(23, middleIndex);
					const twintig5Half = data.splice(24, middleIndex);
					const twintig6Half = data.splice(25, middleIndex);
					const twintig7Half = data.splice(26, middleIndex);
					const twintig8Half = data.splice(27, middleIndex);
					const twintig9Half = data.splice(28, middleIndex);
					const twintig10Half = data.splice(29, middleIndex);

					for (let SD = 0; SD < 30; SD++) {
						switch (SD) {
							case 0:
								SplicedData.push(firstHalf);
								break;
							case 1:
								SplicedData.push(secondHalf);
								break;
							case 2:
								SplicedData.push(thirdHalf);
								break;
							case 3:
								SplicedData.push(fourthHalf);
								break;
							case 4:
								SplicedData.push(fifthHalf);
								break;
							case 5:
								SplicedData.push(sixedHalf);
								break;
							case 6:
								SplicedData.push(seventhHalf);
								break;
							case 7:
								SplicedData.push(eightHalf);
								break;
							case 8:
								SplicedData.push(ninthHalf);
								break;
							case 9:
								SplicedData.push(tenthHalf);
								break;
							case 10:
								SplicedData.push(elevenHalf);
								break;
							case 11:
								SplicedData.push(twelfeHalf);
								break;
							case 12:
								SplicedData.push(dertienHalf);
								break;
							case 13:
								SplicedData.push(veertienHalf);
								break;
							case 14:
								SplicedData.push(vijftienHalf);
								break;
							case 15:
								SplicedData.push(zestienHalf);
								break;
							case 16:
								SplicedData.push(zeventienHalf);
								break;
							case 17:
								SplicedData.push(achtienHalf);
								break;
							case 18:
								SplicedData.push(negentienHalf);
								break;
							case 19:
								SplicedData.push(twintigHalf);
								break;
							case 20:
								SplicedData.push(twintig1Half);
								break;
							case 21:
								SplicedData.push(twintig2Half);
								break;
							case 22:
								SplicedData.push(twintig3Half);
								break;
							case 23:
								SplicedData.push(twintig4Half);
								break;
							case 24:
								SplicedData.push(twintig5Half);
								break;
							case 25:
								SplicedData.push(twintig6Half);
								break;
							case 26:
								SplicedData.push(twintig7Half);
								break;
							case 27:
								SplicedData.push(twintig8Half);
								break;
							case 28:
								SplicedData.push(twintig9Half);
								break;
							case 29:
								SplicedData.push(twintig10Half);
								break;
						}
					}

					let DataDevidedBy10Hearth = [];
					let DataDevidedBy10Calories = [];
					let DataDevidedBy10Steps = [];

					for (let spl = 0; spl < SplicedData.length; spl++) {
						console.log(SplicedData[spl]);
						if (SplicedData[spl].length !== 0) {
							let AllDataHearth = [];
							let AllDataCalories = [];
							let AllDataSteps = [];
							let timeDay = new Date(
								SplicedData[spl][0].timestamp
							);
							dayTimeLabels.push(timeDay.getDate() + "th");

							for (let b = 0; b < SplicedData[spl].length; b++) {
								AllDataHearth.push(
									SplicedData[spl][b].heartrate
								);
								AllDataCalories.push(
									SplicedData[spl][b].calories
								);
								AllDataSteps.push(SplicedData[spl][b].steps);
							}

							let sumHearth = 0;
							let sumCalories = 0;
							let sumSteps = 0;

							let averageHearth = 0;
							let averageCalories = 0;
							let averageSteps = 0;

							//hearth
							for (let value of AllDataHearth) {
								sumHearth = sumHearth - -value;
							}
							averageHearth = sumHearth / AllDataHearth.length;
							DataDevidedBy10Hearth.push(averageHearth);

							//calories
							for (let value of AllDataCalories) {
								sumCalories = sumCalories - -value;
							}
							averageCalories = sumCalories / AllDataSteps.length;
							DataDevidedBy10Calories.push(averageCalories);
							//steps
							for (let value of AllDataSteps) {
								sumSteps = sumSteps - -value;
							}
							averageSteps = sumSteps / AllDataSteps.length;
							DataDevidedBy10Steps.push(averageSteps);
						}
					}

					//hearth
					for (let t = 0; t < DataDevidedBy10Hearth.length; t++) {
						correcteDataHearth.push(DataDevidedBy10Hearth[t]);
					}
					//calories
					for (let t = 0; t < DataDevidedBy10Calories.length; t++) {
						correcteDataCalories.push(DataDevidedBy10Calories[t]);
					}
					//steps
					for (let t = 0; t < DataDevidedBy10Steps.length; t++) {
						correcteDataSteps.push(DataDevidedBy10Steps[t]);
					}

					SetStepData(correcteDataSteps);
					SetCalorieData(correcteDataCalories);
					SetHearthData(correcteDataHearth);
				} else {
					dayTimeLabels = ["no data"];
				}
				SetFilter(dayTimeLabels);
				SetFilterSession(dayTimeLabels);
			}
			if (filterOption === "week") {
				const data = [];
				const today = new Date();
				let dayTimeLabels = [];
				//only data with current year
				for (let x = 0; x < allData.length; x++) {
					const dataDate = new Date(allData[x].timestamp);

					let dT = dataDate.getMonth();
					let thisMonth = today.getMonth();

					if (dT == thisMonth) {
						data.push(allData[x]);
					}
				}
				if (data.length !== 0) {
					for (let u = 0; u < data.length; u++) {
						let minutes = new Date(data[u].timestamp);
						dataArray_Steps_day.push(data[u].steps);

						dataArray_Calories_day.push(data[u].calories);

						dataArray_Heartrate_day.push(data[u].heartrate);

						dataArray_Labels_day.push(minutes.getDate() + "");
					}
					//data gets called correctly, but i want to split it in 10 parts and take average of every part (to much data in graph)

					const middleIndex = Math.ceil(data.length / 7);

					const SplicedData = [];

					const correcteDataHearth = [];
					const correcteDataCalories = [];
					const correcteDataSteps = [];

					const firstHalf = data.splice(0, middleIndex);
					const secondHalf = data.splice(1, middleIndex);
					const thirdHalf = data.splice(2, middleIndex);
					const fourthHalf = data.splice(3, middleIndex);
					const fifthHalf = data.splice(4, middleIndex);
					const sixedHalf = data.splice(5, middleIndex);
					const seventhHalf = data.splice(6, middleIndex);

					for (let SD = 0; SD < 7; SD++) {
						switch (SD) {
							case 0:
								SplicedData.push(firstHalf);
								break;
							case 1:
								SplicedData.push(secondHalf);
								break;
							case 2:
								SplicedData.push(thirdHalf);
								break;
							case 3:
								SplicedData.push(fourthHalf);
								break;
							case 4:
								SplicedData.push(fifthHalf);
								break;
							case 5:
								SplicedData.push(sixedHalf);
								break;
							case 6:
								SplicedData.push(seventhHalf);
								break;
						}
					}

					let DataDevidedBy10Hearth = [];
					let DataDevidedBy10Calories = [];
					let DataDevidedBy10Steps = [];

					for (let spl = 0; spl < SplicedData.length; spl++) {
						console.log(SplicedData[spl]);
						if (SplicedData[spl].length !== 0) {
							let AllDataHearth = [];
							let AllDataCalories = [];
							let AllDataSteps = [];
							let timeDay = new Date(
								SplicedData[spl][0].timestamp
							);
							const dayOfWeek = [];
							if (timeDay.getDay() === 1) {
								dayOfWeek.push("Mo");
							} else if (timeDay.getDay() === 2) {
								dayOfWeek.push("Tu");
							} else if (timeDay.getDay() === 3) {
								dayOfWeek.push("We");
							} else if (timeDay.getDay() === 4) {
								dayOfWeek.push("Th");
							} else if (timeDay.getDay() === 5) {
								dayOfWeek.push("Fr");
							} else if (timeDay.getDay() === 6) {
								dayOfWeek.push("Sa");
							} else if (timeDay.getDay() === 7) {
								dayOfWeek.push("Su");
							}

							dayTimeLabels.push(dayOfWeek);

							for (let b = 0; b < SplicedData[spl].length; b++) {
								AllDataHearth.push(
									SplicedData[spl][b].heartrate
								);
								AllDataCalories.push(
									SplicedData[spl][b].calories
								);
								AllDataSteps.push(SplicedData[spl][b].steps);
							}

							let sumHearth = 0;
							let sumCalories = 0;
							let sumSteps = 0;

							let averageHearth = 0;
							let averageCalories = 0;
							let averageSteps = 0;

							//hearth
							for (let value of AllDataHearth) {
								sumHearth = sumHearth - -value;
							}
							averageHearth = sumHearth / AllDataHearth.length;
							DataDevidedBy10Hearth.push(averageHearth);

							//calories
							for (let value of AllDataCalories) {
								sumCalories = sumCalories - -value;
							}
							averageCalories = sumCalories / AllDataSteps.length;
							DataDevidedBy10Calories.push(averageCalories);
							//steps
							for (let value of AllDataSteps) {
								sumSteps = sumSteps - -value;
							}
							averageSteps = sumSteps / AllDataSteps.length;
							DataDevidedBy10Steps.push(averageSteps);
						}
					}

					//hearth
					for (let t = 0; t < DataDevidedBy10Hearth.length; t++) {
						correcteDataHearth.push(DataDevidedBy10Hearth[t]);
					}
					//calories
					for (let t = 0; t < DataDevidedBy10Calories.length; t++) {
						correcteDataCalories.push(DataDevidedBy10Calories[t]);
					}
					//steps
					for (let t = 0; t < DataDevidedBy10Steps.length; t++) {
						correcteDataSteps.push(DataDevidedBy10Steps[t]);
					}

					SetStepData(correcteDataSteps);
					SetCalorieData(correcteDataCalories);
					SetHearthData(correcteDataHearth);
				} else {
					dayTimeLabels = ["no data"];
				}
				//@ts-ignore
				SetFilter(dayTimeLabels);
				//@ts-ignore
				SetFilterSession(dayTimeLabels);
			}
			if (filterOption === "year") {
				const data = [];
				const today = new Date();
				let dayTimeLabels = [];
				//only data with current year
				for (let x = 0; x < allData.length; x++) {
					const dataDate = new Date(allData[x].timestamp);

					let dT = dataDate.getFullYear();
					let thisMonth = today.getFullYear();

					if (dT == thisMonth) {
						data.push(allData[x]);
					}
				}
				if (data.length !== 0) {
					for (let u = 0; u < data.length; u++) {
						let minutes = new Date(data[u].timestamp);
						dataArray_Steps_day.push(data[u].steps);

						dataArray_Calories_day.push(data[u].calories);

						dataArray_Heartrate_day.push(data[u].heartrate);

						dataArray_Labels_day.push(minutes.getDate() + "");
					}
					//data gets called correctly, but i want to split it in 10 parts and take average of every part (to much data in graph)

					const middleIndex = Math.ceil(data.length / 10);

					const SplicedData = [];

					const correcteDataHearth = [];
					const correcteDataCalories = [];
					const correcteDataSteps = [];

					const firstHalf = data.splice(0, middleIndex);
					const secondHalf = data.splice(1, middleIndex);
					const thirdHalf = data.splice(2, middleIndex);
					const fourthHalf = data.splice(3, middleIndex);
					const fifthHalf = data.splice(4, middleIndex);
					const sixedHalf = data.splice(5, middleIndex);
					const seventhHalf = data.splice(6, middleIndex);
					const eightHalf = data.splice(7, middleIndex);
					const ninthHalf = data.splice(8, middleIndex);
					const tenthHalf = data.splice(9, middleIndex);

					for (let SD = 0; SD < 10; SD++) {
						switch (SD) {
							case 0:
								SplicedData.push(firstHalf);
								break;
							case 1:
								SplicedData.push(secondHalf);
								break;
							case 2:
								SplicedData.push(thirdHalf);
								break;
							case 3:
								SplicedData.push(fourthHalf);
								break;
							case 4:
								SplicedData.push(fifthHalf);
								break;
							case 5:
								SplicedData.push(sixedHalf);
								break;
							case 6:
								SplicedData.push(seventhHalf);
								break;
							case 7:
								SplicedData.push(eightHalf);
								break;
							case 8:
								SplicedData.push(ninthHalf);
								break;
							case 9:
								SplicedData.push(tenthHalf);
								break;
						}
					}

					let DataDevidedBy10Hearth = [];
					let DataDevidedBy10Calories = [];
					let DataDevidedBy10Steps = [];

					for (let spl = 0; spl < SplicedData.length; spl++) {
						console.log(SplicedData[spl]);
						if (SplicedData[spl].length !== 0) {
							let AllDataHearth = [];
							let AllDataCalories = [];
							let AllDataSteps = [];
							let timeDay = new Date(
								SplicedData[spl][0].timestamp
							);

							dayTimeLabels.push(timeDay.getFullYear() + "");

							for (let b = 0; b < SplicedData[spl].length; b++) {
								AllDataHearth.push(
									SplicedData[spl][b].heartrate
								);
								AllDataCalories.push(
									SplicedData[spl][b].calories
								);
								AllDataSteps.push(SplicedData[spl][b].steps);
							}

							let sumHearth = 0;
							let sumCalories = 0;
							let sumSteps = 0;

							let averageHearth = 0;
							let averageCalories = 0;
							let averageSteps = 0;

							//hearth
							for (let value of AllDataHearth) {
								sumHearth = sumHearth - -value;
							}
							averageHearth = sumHearth / AllDataHearth.length;
							DataDevidedBy10Hearth.push(averageHearth);

							//calories
							for (let value of AllDataCalories) {
								sumCalories = sumCalories - -value;
							}
							averageCalories = sumCalories / AllDataSteps.length;
							DataDevidedBy10Calories.push(averageCalories);
							//steps
							for (let value of AllDataSteps) {
								sumSteps = sumSteps - -value;
							}
							averageSteps = sumSteps / AllDataSteps.length;
							DataDevidedBy10Steps.push(averageSteps);
						}
					}

					//hearth
					for (let t = 0; t < DataDevidedBy10Hearth.length; t++) {
						correcteDataHearth.push(DataDevidedBy10Hearth[t]);
					}
					//calories
					for (let t = 0; t < DataDevidedBy10Calories.length; t++) {
						correcteDataCalories.push(DataDevidedBy10Calories[t]);
					}
					//steps
					for (let t = 0; t < DataDevidedBy10Steps.length; t++) {
						correcteDataSteps.push(DataDevidedBy10Steps[t]);
					}

					SetStepData(correcteDataSteps);
					SetCalorieData(correcteDataCalories);
					SetHearthData(correcteDataHearth);
				} else {
					dayTimeLabels = ["no data"];
				}
				//@ts-ignore
				SetFilter(dayTimeLabels);
				//@ts-ignore
				SetFilterSession(dayTimeLabels);
			}
			if (filterOption === "all") {
				const data = [];
				const today = new Date();
				let dayTimeLabels = [];
				//only data with current year
				for (let x = 0; x < allData.length; x++) {
					const dataDate = new Date(allData[x].timestamp);

					let dT = dataDate.getFullYear();
					let thisMonth = today.getFullYear();

					if (dT == thisMonth) {
						data.push(allData[x]);
					}
				}
				if (data.length !== 0) {
					for (let u = 0; u < data.length; u++) {
						let minutes = new Date(data[u].timestamp);
						dataArray_Steps_day.push(data[u].steps);

						dataArray_Calories_day.push(data[u].calories);

						dataArray_Heartrate_day.push(data[u].heartrate);

						dataArray_Labels_day.push(minutes.getDate() + "");
					}
					//data gets called correctly, but i want to split it in 10 parts and take average of every part (to much data in graph)

					const middleIndex = Math.ceil(data.length / 15);

					const SplicedData = [];

					const correcteDataHearth = [];
					const correcteDataCalories = [];
					const correcteDataSteps = [];

					const firstHalf = data.splice(0, middleIndex);
					const secondHalf = data.splice(1, middleIndex);
					const thirdHalf = data.splice(2, middleIndex);
					const fourthHalf = data.splice(3, middleIndex);
					const fifthHalf = data.splice(4, middleIndex);
					const sixedHalf = data.splice(5, middleIndex);
					const seventhHalf = data.splice(6, middleIndex);
					const eightHalf = data.splice(7, middleIndex);
					const ninthHalf = data.splice(8, middleIndex);
					const tenthHalf = data.splice(9, middleIndex);
					const elevenHalf = data.splice(10, middleIndex);
					const twelfeHalf = data.splice(11, middleIndex);
					const dertienHalf = data.splice(12, middleIndex);
					const veertienHalf = data.splice(13, middleIndex);
					const vijftienHalf = data.splice(14, middleIndex);

					for (let SD = 0; SD < 15; SD++) {
						switch (SD) {
							case 0:
								SplicedData.push(firstHalf);
								break;
							case 1:
								SplicedData.push(secondHalf);
								break;
							case 2:
								SplicedData.push(thirdHalf);
								break;
							case 3:
								SplicedData.push(fourthHalf);
								break;
							case 4:
								SplicedData.push(fifthHalf);
								break;
							case 5:
								SplicedData.push(sixedHalf);
								break;
							case 6:
								SplicedData.push(seventhHalf);
								break;
							case 7:
								SplicedData.push(eightHalf);
								break;
							case 8:
								SplicedData.push(ninthHalf);
								break;
							case 9:
								SplicedData.push(tenthHalf);
								break;
							case 10:
								SplicedData.push(elevenHalf);
								break;
							case 11:
								SplicedData.push(twelfeHalf);
								break;
							case 12:
								SplicedData.push(dertienHalf);
								break;
							case 13:
								SplicedData.push(veertienHalf);
								break;
							case 14:
								SplicedData.push(vijftienHalf);
								break;
						}
					}

					let DataDevidedBy10Hearth = [];
					let DataDevidedBy10Calories = [];
					let DataDevidedBy10Steps = [];

					for (let spl = 0; spl < SplicedData.length; spl++) {
						console.log(SplicedData[spl]);
						if (SplicedData[spl].length !== 0) {
							let AllDataHearth = [];
							let AllDataCalories = [];
							let AllDataSteps = [];
							let timeDay = new Date(
								SplicedData[spl][0].timestamp
							);

							dayTimeLabels.push(timeDay.getFullYear() + "");

							for (let b = 0; b < SplicedData[spl].length; b++) {
								AllDataHearth.push(
									SplicedData[spl][b].heartrate
								);
								AllDataCalories.push(
									SplicedData[spl][b].calories
								);
								AllDataSteps.push(SplicedData[spl][b].steps);
							}

							let sumHearth = 0;
							let sumCalories = 0;
							let sumSteps = 0;

							let averageHearth = 0;
							let averageCalories = 0;
							let averageSteps = 0;

							//hearth
							for (let value of AllDataHearth) {
								sumHearth = sumHearth - -value;
							}
							averageHearth = sumHearth / AllDataHearth.length;
							DataDevidedBy10Hearth.push(averageHearth);

							//calories
							for (let value of AllDataCalories) {
								sumCalories = sumCalories - -value;
							}
							averageCalories = sumCalories / AllDataSteps.length;
							DataDevidedBy10Calories.push(averageCalories);
							//steps
							for (let value of AllDataSteps) {
								sumSteps = sumSteps - -value;
							}
							averageSteps = sumSteps / AllDataSteps.length;
							DataDevidedBy10Steps.push(averageSteps);
						}
					}

					//hearth
					for (let t = 0; t < DataDevidedBy10Hearth.length; t++) {
						correcteDataHearth.push(DataDevidedBy10Hearth[t]);
					}
					//calories
					for (let t = 0; t < DataDevidedBy10Calories.length; t++) {
						correcteDataCalories.push(DataDevidedBy10Calories[t]);
					}
					//steps
					for (let t = 0; t < DataDevidedBy10Steps.length; t++) {
						correcteDataSteps.push(DataDevidedBy10Steps[t]);
					}

					SetStepData(correcteDataSteps);
					SetCalorieData(correcteDataCalories);
					SetHearthData(correcteDataHearth);
				} else {
					dayTimeLabels = ["no data"];
				}
				//@ts-ignore
				SetFilter(dayTimeLabels);
				//@ts-ignore
				SetFilterSession(dayTimeLabels);
			}
		}
	}, [userTimeFilter]);

	useEffect(() => {
		switch (timeFilter) {
			case "session":
				SetFilter(filterSession);
				//extra usestate for problem loop
				SetFilterOption("session");

				break;
			case "day":
				SetFilter(filterDay);
				SetFilterOption("day");
				break;
			case "week":
				SetFilter(filterWeek);
				SetFilterOption("week");
				break;
			case "month":
				SetFilter(filterMonth);
				SetFilterOption("month");
				break;
			case "year":
				SetFilter(filterYear);
				SetFilterOption("year");
				break;
			case "all":
				SetFilter(filterYear);
				SetFilterOption("all");
				break;
		}
	}, [timeFilter]);

	useEffect(() => {
		for (let i = 0; i < userLst.length; i++) {
			if (userLst[i].userID === searchUserId) {
				SetUser(userLst[i]);
			}
		}
		// react please run me if 'key' changes, but not on initial render
	}, [searchUserId]);

	//functions
	function filterTrackingOptions(filter: string) {
		switch (filter) {
			case "steps":
				if (stepsComponent === "component-hidden") {
					SetStepsComponent("component-active");
					SetInputActiveSteps(true);
					SetCloseBtn("");
				} else {
					SetStepsComponent("component-hidden");
					SetInputActiveSteps(false);
				}
				break;
			case "heart-rate":
				if (hearthComponent === "component-hidden") {
					SetHearthComponent("component-active");
					SetInputActiveHearth(true);
					SetCloseBtn("");
				} else {
					SetHearthComponent("component-hidden");
					SetInputActiveHearth(false);
				}
				break;
			case "calories":
				if (caloriesComponent === "component-hidden") {
					SetCaloriesComponent("component-active");
					SetInputActiveCalories(true);
					SetCloseBtn("");
				} else {
					SetCaloriesComponent("component-hidden");
					SetInputActiveCalories(false);
				}
				break;
			case "distance":
				if (distanceComponent === "component-hidden") {
					SetDistanceComponent("component-active");
					SetInputActiveDistance(true);
					SetCloseBtn("");
				} else {
					SetDistanceComponent("component-hidden");
					SetInputActiveDistance(false);
				}
				break;
			case "sleep":
				if (sleeptrackingComponent === "component-hidden") {
					SetSleeptrackingComponent("component-active");
					SetInputActiveSleep(true);
					SetCloseBtn("");
				} else {
					SetSleeptrackingComponent("component-hidden");
					SetInputActiveSleep(false);
				}
				break;
		}
	}

	function filterTime(time: string) {
		SetTimeFilter(time);
	}

	function toggleFilter(filter: string) {
		if (filter === "time") {
			SetActiveTime(ActiveTime === "" ? "active" : "");
			setHeightTime(
				ActiveTime === "active"
					? "0px"
					: `${content.current?.scrollHeight}px`
			);
			SetRotateTime(ActiveTime === "active" ? "" : "rotate");
		} else {
			SetActiveTracking(ActiveTracking === "" ? "active" : "");
			setHeightTracking(
				ActiveTracking === "active"
					? "0px"
					: `${content.current?.scrollHeight}px`
			);
			SetRotateTracking(ActiveTracking === "active" ? "" : "rotate");
		}
	}

	function search(e: any) {
		if (e.key === "Enter") {
			for (let i = 0; i < userLst.length; i++) {
				if (userLst[i].firstName === e.target.value) {
					SetSearchUserId(userLst[i].userID);
				}
			}
		}
	}
	//special constant for search function. Fixes Typescript error. also prevent page from refreshing
	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const toConnectWatch = () => {
		const userID = user.userID;
		const lastName = user.lastName;
		const firstName = user.firstName;
		const myUser = { userID, lastName, firstName };

		console.log(myUser);
		<Link
			to={{
				pathname: "/adduser",
				state: myUser,
			}}
		/>;
	};

	return (
		<main className="c-dashboard__main">
			<aside className="c-dashboard__aside">
				<Link
					to={{
						pathname: `/users`,
					}}
				>
					<div className="c-dashboard__aside--logo">
						<LogoWithText fill="#3f536c" />
					</div>
				</Link>
				<section className="c-dashboard__aside--section">
					<div className="c-user">
						<header className="c-user__header">
							<p className="c-user__header--user">
								<b>User:</b> {user.firstName}
							</p>
							<a href="/edituser" className="c-user__header--svg">
								<svg
									height="100%"
									viewBox="0 0 492.49284 492"
									width="100%"
									fill="#3f536c"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0" />
									<path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0" />
								</svg>
							</a>
						</header>
						<div className="c-user__row">
							<p>
								<b>Age:</b> {age}
							</p>
							<p>
								<b>Weight:</b> {user.weight}
							</p>
						</div>
						<div className="c-user__row">
							<p>
								<b>Gender:</b> {user.gender}
							</p>
							<p>
								<b>Height:</b> {`${user.length} cm`}
							</p>
						</div>
					</div>
					<div className="c-filters">
						<div className="c-filters__title">
							<p className="c-filters__title--text">Filters</p>
						</div>
						{/* filter */}
						<button
							className={`c-filter ${ActiveTracking}`}
							onClick={() => toggleFilter("tracking")}
						>
							<div className="c-filter__header">
								<p className="c-filter__header--text">
									Tracking options
								</p>

								<div
									className={`c-filter__header--svg ${RotateTracking}`}
								>
									<Icon />
								</div>
							</div>
							<div
								ref={content}
								style={{ maxHeight: `${HeightTracking}` }}
								className={`c-filter__hidden-content`}
							>
								<label
									className="c-filter__hidden-items"
									htmlFor="step-tracker"
									id="step-tracker-label"
								>
									<input
										checked={inputActiveSteps}
										type="checkbox"
										id="step-tracker"
										onChange={() =>
											filterTrackingOptions("steps")
										}
									/>
									<p id="step_tracker-text">step-tracker</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="calories-burned"
									id="calories-burned-label"
								>
									<input
										checked={inputActiveCalories}
										type="checkbox"
										id="calories-burned"
										onChange={() =>
											filterTrackingOptions("calories")
										}
									/>
									<p id="calories-burned-text">
										calories burned
									</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="heart-rate"
									id="heart-rate-label"
								>
									<input
										checked={inputActiveHearth}
										type="checkbox"
										id="heart-rate"
										onChange={() =>
											filterTrackingOptions("heart-rate")
										}
									/>
									<p id="heart-rate-text">heart rate</p>
								</label>

								<label
									className="c-filter__hidden-items"
									htmlFor="distance-traveled"
									id="distance-traveled-label"
								>
									<input
										checked={inputActiveDistance}
										type="checkbox"
										id="distance-traveled"
										onChange={() =>
											filterTrackingOptions("distance")
										}
									/>
									<p id="distance-traveled-text">
										distance traveled
									</p>
								</label>

								<label
									className="c-filter__hidden-items"
									htmlFor="sleeptracking"
									id="sleeptracking-label"
								>
									<input
										checked={inputActiveSleep}
										type="checkbox"
										id="sleeptracking"
										onChange={() =>
											filterTrackingOptions("sleep")
										}
									/>
									<p id="sleeptracking-text">sleeptracking</p>
								</label>
							</div>
						</button>
						{/* time filter */}
						<button
							className={`c-filter ${ActiveTime}`}
							onClick={() => toggleFilter("time")}
						>
							<div className="c-filter__header">
								<p className="c-filter__header--text">Time</p>

								<div
									className={`c-filter__header--svg ${RotateTime}`}
								>
									<Icon />
								</div>
							</div>
							<div
								ref={content}
								style={{ maxHeight: `${HeightTime}` }}
								className={`c-filter__hidden-content`}
							>
								<label
									className="c-filter__hidden-items"
									htmlFor="last-session"
									id="last-session-label"
								>
									<input
										type="radio"
										checked={timeFilter === "session"}
										id="last-session"
										onChange={() => filterTime("session")}
									/>
									<p id="last-session-text">Last session</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="day"
									id="day-label"
								>
									<input
										type="radio"
										checked={timeFilter === "day"}
										id="day"
										onChange={() => filterTime("day")}
									/>
									<p id="day-text">Today</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="week"
									id="week-label"
								>
									<input
										type="radio"
										checked={timeFilter === "week"}
										id="week"
										onChange={() => filterTime("week")}
									/>
									<p id="week-text">This week</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="month"
									id="month-label"
								>
									<input
										type="radio"
										checked={timeFilter === "month"}
										id="month"
										onChange={() => filterTime("month")}
									/>
									<p id="month-text">This month</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="year"
									id="year-label"
								>
									<input
										type="radio"
										checked={timeFilter === "year"}
										id="year"
										onChange={() => filterTime("year")}
									/>
									<p id="year-text">This year</p>
								</label>
								<label
									className="c-filter__hidden-items"
									htmlFor="all-time"
									id="all-time-label"
								>
									<input
										type="radio"
										checked={timeFilter === "all"}
										id="all-time"
										onChange={() => filterTime("all")}
									/>
									<p id="all-time-text">All time</p>
								</label>
							</div>
						</button>
					</div>
					<div className="c-data">
						<div className="c-data__title">
							<p className="c-data__title--text">Data</p>
						</div>
						<form>
							<input
								type="checkbox"
								id="Prediction"
								name="Prediction"
								value="Prediction"
							/>
							<label
								className="c-data__label"
								htmlFor="Prediction"
							>
								Prediction
							</label>
						</form>
					</div>
				</section>
				<div className="c-dashboard__aside--buttonbox">
					<Link
						to={{
							pathname: `/`,
						}}
					>
						<button className="c-dashboard__aside--button">
							Logout
						</button>
					</Link>
				</div>
			</aside>

			<section className="c-dashboard__section">
				<input
					type="checkbox"
					name="hidden-nav"
					id="hidden-nav-checkbox"
				/>
				<div className="c-hidden-nav">
					<section className="c-hidden-nav__section">
						<div className="c-hidden-nav__filter">
							<div className="c-hidden-nav__filter__title">
								<p className="c-hidden-nav__filter__title--text">
									Filters
								</p>
							</div>
							<button
								className={`c-filter ${ActiveTracking}`}
								onClick={() => toggleFilter("tracking")}
							>
								<div className="c-filter__header">
									<p className="c-filter__header--text">
										Tracking options
									</p>

									<div
										className={`c-filter__header--svg ${RotateTracking}`}
									>
										<Icon />
									</div>
								</div>
								<div
									ref={content}
									style={{
										maxHeight: `${HeightTracking}`,
									}}
									className={`c-filter__hidden-content`}
								>
									<label
										className="c-filter__hidden-items"
										htmlFor="step-tracker"
										id="step-tracker-label"
									>
										<input
											checked={inputActiveSteps}
											type="checkbox"
											id="step-tracker"
											onChange={() =>
												filterTrackingOptions("steps")
											}
										/>
										<p id="step_tracker-text">
											step-tracker
										</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="calories-burned"
										id="calories-burned-label"
									>
										<input
											checked={inputActiveCalories}
											type="checkbox"
											id="calories-burned"
											onChange={() =>
												filterTrackingOptions(
													"calories"
												)
											}
										/>
										<p id="calories-burned-text">
											calories burned
										</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="heart-rate"
										id="heart-rate-label"
									>
										<input
											checked={inputActiveHearth}
											type="checkbox"
											id="heart-rate"
											onChange={() =>
												filterTrackingOptions(
													"heart-rate"
												)
											}
										/>
										<p id="heart-rate-text">heart rate</p>
									</label>

									<label
										className="c-filter__hidden-items"
										htmlFor="distance-traveled"
										id="distance-traveled-label"
									>
										<input
											checked={inputActiveDistance}
											type="checkbox"
											id="distance-traveled"
											onChange={() =>
												filterTrackingOptions(
													"distance"
												)
											}
										/>
										<p id="distance-traveled-text">
											distance traveled
										</p>
									</label>

									<label
										className="c-filter__hidden-items"
										htmlFor="sleeptracking"
										id="sleeptracking-label"
									>
										<input
											checked={inputActiveSleep}
											type="checkbox"
											id="sleeptracking"
											onChange={() =>
												filterTrackingOptions("sleep")
											}
										/>
										<p id="sleeptracking-text">
											sleeptracking
										</p>
									</label>
								</div>
							</button>
							{/* time filter */}
							<button
								className={`c-filter ${ActiveTime}`}
								onClick={() => toggleFilter("time")}
							>
								<div className="c-filter__header">
									<p className="c-filter__header--text">
										Time
									</p>

									<div
										className={`c-filter__header--svg ${RotateTime}`}
									>
										<Icon />
									</div>
								</div>
								<div
									ref={content}
									style={{ maxHeight: `${HeightTime}` }}
									className={`c-filter__hidden-content`}
								>
									<label
										className="c-filter__hidden-items"
										htmlFor="last-session"
										id="last-session-label"
									>
										<input
											type="radio"
											checked={timeFilter === "session"}
											id="last-session"
											onChange={() =>
												filterTime("session")
											}
										/>
										<p id="last-session-text">
											last session
										</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="day"
										id="day-label"
									>
										<input
											type="radio"
											checked={timeFilter === "day"}
											id="day"
											onChange={() => filterTime("day")}
										/>
										<p id="day-text">day</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="week"
										id="week-label"
									>
										<input
											type="radio"
											checked={timeFilter === "week"}
											id="week"
											onChange={() => filterTime("week")}
										/>
										<p id="week-text">week</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="month"
										id="month-label"
									>
										<input
											type="radio"
											checked={timeFilter === "month"}
											id="month"
											onChange={() => filterTime("month")}
										/>
										<p id="month-text">month</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="year"
										id="year-label"
									>
										<input
											type="radio"
											checked={timeFilter === "year"}
											id="year"
											onChange={() => filterTime("year")}
										/>
										<p id="year-text">year</p>
									</label>
									<label
										className="c-filter__hidden-items"
										htmlFor="all-time"
										id="all-time-label"
									>
										<input
											type="radio"
											checked={timeFilter === "all"}
											id="all-time"
											onChange={() => filterTime("all")}
										/>
										<p id="all-time-text">all time</p>
									</label>
								</div>
							</button>
						</div>

						<div className="c-hidden-nav__data">
							<div className="c-hidden-nav__data--title">
								<p className="c-hidden-nav__data--text">Data</p>
							</div>
							<form>
								<input
									type="checkbox"
									id="Prediction-hidden"
									name="Prediction"
									value="Prediction"
								/>
								<label
									className="c-data__label"
									htmlFor="Prediction-hidden"
								>
									Prediction
								</label>
							</form>
						</div>
					</section>
				</div>

				<nav className="c-nav">
					<div className="c-nav__container">
						{/* <Link className="c-nav__button c-nav__button--session"
							to={{
								pathname: `/connectwatch/${props.index}`,
								state: props.user
							}}
						>
							New session	
						</Link> */}
						<Link
							to={{
								pathname: `/connectwatch/${user.userID}`,
							}}
						>
							<button className="c-nav__button c-nav__button--session">
								New Session
							</button>
						</Link>
						<div className="c-nav__right-container">
							<a href="/users" className="c-nav__button">
								Users
							</a>

							<form className="c-nav__form" onSubmit={submitForm}>
								<label
									htmlFor="search"
									className="c-nav__label"
								>
									<input
										className="c-nav__searchbar"
										type="text"
										placeholder="Search user..."
										id="search"
										onKeyPress={(e) => {
											search(e);
										}}
									/>

									<svg
										fill="#3f536c"
										className="c-nav__svg"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
										x="0px"
										y="0px"
										viewBox="0 0 56.966 56.966"
										xmlSpace="preserve"
									>
										<path
											d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
					   s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
					   c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
					   s-17-7.626-17-17S14.61,6,23.984,6z"
										/>
									</svg>
								</label>
							</form>
						</div>
						<div className="c-nav__svg-container">
							<label htmlFor="hidden-nav-checkbox">
								<svg
									className="c-nav__svg-container--svg"
									fill="#3f536c"
									viewBox="0 -53 384 384"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
									<path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
									<path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
								</svg>
							</label>
						</div>
					</div>
				</nav>

				{/* info container for navigation 100% width, (visual problem with box-shadow) */}
				<div className="c-info__container">
					<div className="c-info">
						<Component
							id="steps"
							title="steps"
							size={sizeSteps}
							time={timeFilter}
							color="#ff9798"
							type="bar"
							data={stepData}
							dateFilter={filter}
							active={stepsComponent}
							close={(closeBtn: any) => SetCloseBtn(closeBtn)}
							clicked={(componentClicked: string) =>
								SetComponentClicked(componentClicked)
							}
						/>
						<Component
							title="Calories"
							size={sizeCalories}
							time={timeFilter}
							color="#ffb55f"
							type="bar"
							data={calorieData}
							dateFilter={filter}
							active={caloriesComponent}
							close={(closeBtn: any) => SetCloseBtn(closeBtn)}
							clicked={(componentClicked: string) =>
								SetComponentClicked(componentClicked)
							}
						/>
						<Component
							title="Heart rate"
							size={sizeHearth}
							time={timeFilter}
							color="#ff9798"
							type="line"
							data={hearthData}
							dateFilter={filter}
							active={hearthComponent}
							close={(closeBtn: any) => SetCloseBtn(closeBtn)}
							clicked={(componentClicked: string) =>
								SetComponentClicked(componentClicked)
							}
						/>
						<Component
							title="distance traveled"
							size={sizeDistance}
							time={timeFilter}
							color="#ffb55f"
							type="line"
							data={hearthData}
							dateFilter={filter}
							active={distanceComponent}
							close={(closeBtn: any) => SetCloseBtn(closeBtn)}
							clicked={(componentClicked: string) =>
								SetComponentClicked(componentClicked)
							}
						/>

						<Component
							title="Sleeptracking"
							size={sizeSleep}
							time={timeFilter}
							color="#33DBDB"
							type="bar"
							data={hearthData}
							dateFilter={filter}
							active={sleeptrackingComponent}
							close={(closeBtn: any) => SetCloseBtn(closeBtn)}
							clicked={(componentClicked: string) =>
								SetComponentClicked(componentClicked)
							}
						/>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Dashboard;
