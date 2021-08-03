import {
  faWater,
  faSun,
  faLeaf,
  faTemperatureHigh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MainLayout } from '../layouts/MainLayout';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';

const SERVER = `${process.env.NEXT_PUBLIC_API_SERVER}`;

function Index() {
  const [_data, setData] = useState({
    temperature: '00',
    soiltemperature: '00',
    humidity: '00',
    moisture: '00',
    fahrenheit: '00',
    created_at: '00-00-00 00:00:00',
  });

  useEffect(() => {
    const socket = socketIOClient(SERVER);

    socket.on('changed', (data: any) => {
      // console.log(data);
      if (data) {
        const d = new Date(data.created_at);
        setData({
          ..._data,
          temperature: data.celcius,
          soiltemperature: data.temperature_celcius,
          humidity: data.humidity,
          moisture: data.moisture,
          fahrenheit: data.fahrenheit,
          created_at: d.toLocaleString(),
        });
      }
    });

    return () => {
      true;
    };
  }, []);

  return (
    <div>
      <div className="pb-8 w-full   text-sm">
        <div className="w-full"> </div>
        <div className="w-full text-right">
          {' '}
          lastupdated: {_data.created_at}
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 capitalize">
        <div className="rounded grid py-8 bg-gray-100">
          <div className="grid w-full text-center  items-center align-items cursor-pointer">
            <div className="p-8">
              <h1>Soil moisture</h1>
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-5xl text-gray-800"
                  icon={faWater}
                />
              </div>
              <div className="p-4">
                <LinearProgress
                  variant="determinate"
                  value={(Number(_data.moisture) / 1000) * 100}
                />
              </div>

              <div className="p-4 ">
                <h1 className="text-1xl font-bold">{_data.moisture}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded grid py-8 bg-gray-100">
          <div className="grid w-full text-center  items-center align-items cursor-pointer">
            <div className="p-8">
              <h1>soil temperature</h1>
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-5xl text-gray-800"
                  icon={faLeaf}
                />
              </div>
              <div className="p-4">
                <LinearProgress
                  variant="determinate"
                  value={(Number(_data.soiltemperature) / 35.7) * 100}
                />
              </div>

              <div className="p-4 ">
                <h1 className="text-1xl font-bold">
                  {_data.soiltemperature}&#176;C%
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded grid py-8 bg-gray-100">
          <div className="grid w-full text-center  items-center align-items cursor-pointer">
            <div className="p-8">
              <h1>humidity</h1>
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-5xl text-gray-800"
                  icon={faTemperatureHigh}
                />
              </div>
              <div className="p-4">
                <LinearProgress
                  variant="determinate"
                  value={Number(_data.humidity)}
                />
              </div>

              <div className="p-4 ">
                <h1 className="text-1xl font-bold">{_data.humidity}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded grid py-8 bg-gray-100">
          <div className="grid w-full text-center  items-center align-items cursor-pointer">
            <div className="p-8">
              <h1>temperature</h1>
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-5xl text-gray-800"
                  icon={faSun}
                />
              </div>
              <div className="p-4">
                <LinearProgress
                  variant="determinate"
                  value={Number(_data.temperature)}
                />
              </div>

              <div className="p-4 ">
                <h1 className="text-1xl font-bold">
                  {_data.temperature}&#176;C
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded grid py-8 bg-gray-100">
          <div className="grid w-full text-center  items-center align-items cursor-pointer">
            <div className="p-8">
              <h1>temperature (fahrenheit) </h1>
              <div className="p-4">
                <FontAwesomeIcon
                  className="text-5xl text-gray-800"
                  icon={faSun}
                />
              </div>
              <div className="p-4">
                <LinearProgress
                  variant="determinate"
                  value={Number(_data.temperature)}
                />
              </div>

              <div className="p-4 ">
                <h1 className="text-1xl font-bold">
                  {_data.fahrenheit}&#176;F
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.Layout = MainLayout;

export default Index;
