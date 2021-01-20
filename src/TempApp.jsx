import React, { useEffect, useState } from "react";

const TeamApp = () => {
    // the below state is for storing json data
  const [cityData, setCityData] = useState("");

  
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchApi = async () => {
        // the below link is for fahrenheit
    //   const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f41db92b8cf9cb8834a7aed7733627d9`;

    // the below link is in celsius, we need to add &units=metric, see documentation for others
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f41db92b8cf9cb8834a7aed7733627d9`;
      const response = await fetch(url);
      //   console.log(response);
      // convertig response data to json, we need to wait till the data converted to json
      const resJson = await response.json();
      //   console.log(resJson);

      // the whole json data of a serached city  will be stored in a cityData
    //   setCityData(resJson);

    // we are taking only the main object which is on 3rd index/4th position from whole json data
      setCityData(resJson.main);
    };
    fetchApi();
    //if we give [search] then useEffect() will be called only when we are searching. it means for each letter typing it will call the API to get the data
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          {/* if we write, without value attribute we can type . if we write with value attribute with blank value="", we cannot type. if we write defaultValue attribute(defaultValue=""), we can type , but defaultValue attribute is not needed.*/}
          <input
            type="search"
            className="inputField" placeholder="Enter City"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        {/* if a searched city is not available then we wont get any data from API, so we need to handle that was well */}
        {!cityData ? (
          <p className="errorMsg">No Data found</p>
        ) : (
          <>
            <div className="info">
              <h2 className="location">
                <i className="fas fa-street-view"> </i> {search}
              </h2>
              <h1 className="temp">{cityData.temp}°Cel</h1>
              <h3 className="tempmin_max">Min: {cityData.temp_min}°Cel | Max: {cityData.temp_max}°Cel</h3>
            </div>
          </>
        )}
        <div id="wave">
        <div className="wave-one"></div>
            <div className="wave-two"></div>
            <div className="wave-three"></div>
      </div>
      </div>
    </>
  );
};

export default TeamApp;
