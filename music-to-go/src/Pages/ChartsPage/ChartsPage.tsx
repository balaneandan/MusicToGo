import { Stack, StackItem } from "@fluentui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ISensor } from "../../Models/ISensor";
import { baseUrl } from "../../Utils";

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { AuthenticationContext } from "../../App";
import { CustomTextField } from "../ClientsPage/TextField/CustomTextField";
import { Button } from "@mui/material";

interface IData {
  argument: string;
  value : number;
}
export const ChartsPage = ():JSX.Element => {
  const authenticationService = useContext(AuthenticationContext);
  let sensor: ISensor = authenticationService.getSensor();
  const [data, setData] = useState<IData[]>([]);
  const [baseline, setBaseline] = useState<IData[]>([]);
  const [days, setDays] = useState<string>("7");

  useEffect(() => {

    },[days]);

    const handleDaysChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value)
      setDays(e.target.value);
    }
    const handleRequestDays = () => {
     
      if(sensor === undefined || sensor.id === undefined)
      return;

    axios.post(`${baseUrl}JsonRpcService`, {
        id: 1,
        jsonrpc: "2.0",
        method: "getConsumptionDataByNumberOfDays",
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true,
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        },
        params: {
          sensorId: sensor?.id,
          numberOfDays: days,
      }
      })
      .then(function (response) {
        console.log(response.data.result);
        let hour: number = 0;
        let array : IData[] = [];
        let baselineArray : IData[] = [];
        response.data.result.forEach((element: number) => {
            let crData: IData = {argument: ''+hour, value: element}
            let crBase: IData = {argument: ''+hour, value: (element / parseInt(days))}
            hour+=1;
            array.push(crData);
            baselineArray.push(crBase);
            
        });
      setData([...array]);
      setBaseline([...baselineArray]);
      console.log(data);
      console.log("asd" + baseline);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    } 

    return (
        <Stack>
            <StackItem>
              Select the number of days : 
            </StackItem>
            <StackItem>
            <CustomTextField
                textFieldLabel={"nr of days"} 
                textContent={days} 
                errorMessage={""} 
                sectionChanged={(e) => handleDaysChanged(e)}        
              />
          </StackItem>
          <StackItem>
            <Button onClick={handleRequestDays}>Request Data</Button>
          </StackItem>
            {sensor !== undefined && data !== []?
            <Stack>
              <StackItem>
                <Chart data={data}>
                  <ArgumentAxis />
                  <ValueAxis />
                  <BarSeries valueField="value" argumentField="argument" />
                </Chart>
              </StackItem>
              <StackItem>
                Baseline for {days} days
              </StackItem>
              <StackItem>
                <Chart data={data}>
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries valueField="value" argumentField="argument" />
                  </Chart>
              </StackItem>
            </Stack>
          :
          <div>This is ChartsPage. In order to see charts with energy consumption, you have to select a sensor from the sensors page.</div>}
        </Stack>
    );
}