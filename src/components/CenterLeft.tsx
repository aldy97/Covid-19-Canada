import React, { useState, useEffect } from 'react';
import ProDropDown from './ProDropDown';
import axios from 'axios';
import Chart from './Charts';
import styled from 'styled-components';

const StyledCenterLeft = styled.div`
  width: 700px;
  margin-left: 300px;
`;

function CenterLeft() {
  const [provinceList, setProvinceList] = useState([]);
  //We show diagrams for Canada by default
  const [province, setProvince] = useState('Canada');

  const [cases, setCases] = useState([]);

  const [deaths, setDeaths] = useState([]);

  const [recovered, setRecovered] = useState([]);

  const handleClick = (key: any) => {
    setProvince(provinceList[parseInt(key.key)]);
  };

  const getData = (json: any) => {
    const stringfiedJSON = JSON.stringify(json);
    const obj = JSON.parse(stringfiedJSON);
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };

  const getParam = (str: string): string => {
    if (str.includes(' ')) {
      const res = str.replace(' ', '%20');
      return res;
    } else {
      return str;
    }
  };

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/historical/Canada?lastdays=30')
      .then((res) => setProvinceList(res.data.province));
    if (province === 'Canada') {
      //get national data when province is not selected
      axios
        .get('https://disease.sh/v3/covid-19/historical/Canada?lastdays=30')
        .then((res) => {
          console.log(res.data.timeline);
          let result1 = [];
          let result2 = [];
          let result3 = [];
          for (let i = 0; i < getData(res.data.timeline.cases).length; i++) {
            result1.push(getData(res.data.timeline.cases)[i]);
          }
          for (let i = 0; i < getData(res.data.timeline.deaths).length; i++) {
            result2.push(getData(res.data.timeline.deaths)[i]);
          }
          for (
            let i = 0;
            i < getData(res.data.timeline.recovered).length;
            i++
          ) {
            result3.push(getData(res.data.timeline.recovered)[i]);
          }
          setCases(result1 as any);
          setDeaths(result2 as any);
          setRecovered(result3 as any);
        });
    } else {
      //when province has been selected
      const param = getParam(province);
      axios
        .get(
          `https://disease.sh/v3/covid-19/historical/Canada/${param}?lastdays=30`
        )
        .then((res) => {
          let result1 = [];
          let result2 = [];
          let result3 = [];
          for (let i = 0; i < getData(res.data.timeline.cases).length; i++) {
            result1.push(getData(res.data.timeline.cases)[i]);
          }
          for (let i = 0; i < getData(res.data.timeline.deaths).length; i++) {
            result2.push(getData(res.data.timeline.deaths)[i]);
          }
          for (
            let i = 0;
            i < getData(res.data.timeline.recovered).length;
            i++
          ) {
            result3.push(getData(res.data.timeline.recovered)[i]);
          }
          setCases(result1 as any);
          setDeaths(result2 as any);
          setRecovered(result3 as any);
        });
    }
  }, [province]);

  return (
    <StyledCenterLeft>
      <ProDropDown
        handleClick={handleClick}
        province={province}
        provinceList={provinceList}
      />
      <Chart option={cases} title='Cases' />
      <Chart option={deaths} title='Deaths' />
      <Chart option={recovered} title='Recovered' />
    </StyledCenterLeft>
  );
}

export default CenterLeft;
