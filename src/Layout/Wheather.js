
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollViewBase } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import GetLocation from '../Services/Location';
import { useNavigation } from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import { GetLocationWeather, GetLocationWeatherHour } from '../Services/WeatherServices';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from 'react-native';

const Wheather = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [hourWeather, setHourWeather] = useState(null)
  const weatherPhrases = {
    "Thunderstorms": "Giông bão",
    "Cloudy": "Có mây",
    "Rain": "Mưa",
    "Sunny": "Nắng",
    "Partly sunny": "Nắng một phần",
    "Mostly sunny": "Nắng nhiều",
    "Partly cloudy": "Có mây một phần",
    "Mostly cloudy": "Mây nhiều",
    "Clear": "Trời quang",
    "Showers": "Mưa rào",
    "Mostly cloudy w/ t-storms": "Nhiều mây có mưa"

  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});


      let res = await GetLocation(location.coords.latitude, location.coords.longitude)

      setLocation(res);
      let weather = await GetLocationWeather("cần thơ")
      let hourWeather = await GetLocationWeatherHour("Cần thơ")
      setHourWeather(hourWeather)
      console.log(hourWeather)
      setWeather(weather)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const toCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5 / 9);
  };

  const getWeatherIconUrl = (iconCode) => {
    const formattedCode = iconCode < 10 ? `0${iconCode}` : iconCode;
    return `https://developer.accuweather.com/sites/default/files/${formattedCode}-s.png`;
  };



  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', hour12: false });
  };



  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons
            name="keyboard-backspace"
            size={24}
            color="#fff"
            onPress={() => { navigation.goBack() }}
          />
          <Text style={styles.headerText}>Dự báo thời tiết</Text>

          <MaterialIcons name="dashboard-customize" size={24} color="#fff" />
        </View>
        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>

          <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
            <Entypo name="location" size={24} color="#fff" />
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 17, textAlign: "center" }}>{location}</Text>


          </View>

          {weather && (
            <View style={styles.weatherContainer}>
              <Image
                source={{ uri: getWeatherIconUrl(weather.DailyForecasts[0].Day.Icon) }}
                style={styles.icon}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>Hôm nay</Text>
                {weather.DailyForecasts[0].Day.HasPrecipitation && weather.DailyForecasts[0].Day.PrecipitationType === 'Rain' ? (
                  <Text style={styles.rainText}>Mưa</Text>
                ) : (
                  <Text style={styles.noRainText}>Không mưa</Text>
                )}
                <Text style={{ fontWeight: "bold", fontSize: 17, color: "#fff" }}>
                  Nhiệt độ: {toCelsius(weather.DailyForecasts[0].Temperature.Minimum.Value)}°C - {toCelsius(weather.DailyForecasts[0].Temperature.Maximum.Value)}°C
                </Text>
              </View>
            </View>
          )}

        </View>



      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>

          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hôm nay, {new Date().toLocaleDateString('vi-VN')}</Text>
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setIsPlaying(!isPlaying) }}>

            <Text style={{ marginRight: 6, fontSize: 18, fontWeight: "bold" }}>Nghe tin</Text>
            {!isPlaying ? <AntDesign name="playcircleo" size={30} color="#009432" /> : <AntDesign name="pausecircleo" size={30} color="red" />}
          </TouchableOpacity>
        </View>


        <ScrollView horizontal={true} style={styles.scrollViewContainer} showsHorizontalScrollIndicator={false}>
          {hourWeather && hourWeather.map((item, index) => (
            <View key={index} style={styles.hourlyContainer}>

              <Text style={styles.weatherTitle}>{formatTime(item.DateTime) + "h"}</Text>
              <Image
                source={{ uri: getWeatherIconUrl(item.WeatherIcon) }}
                style={styles.icon}
              />
              <View>

                <Text style={styles.temperatureText}>{toCelsius(item.Temperature.Value)}°C</Text>

              </View>
            </View>
          ))}
        </ScrollView>



        <Text style={{ fontWeight: "bold", fontSize: 17, padding: 10 }}>4 ngày tới</Text>
        <View style={{ paddingHorizontal: 15 }}>
          {weather && weather.DailyForecasts.slice(1, 5).map((item, index) => {
            const date = new Date(item.Date);
            const dayOfWeek = date.toLocaleDateString('vi-VN', { weekday: 'long' });

            return (
              <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: 'bold' }}>{dayOfWeek}</Text>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-around' }}>
                  <Text>{toCelsius(item.Temperature.Minimum.Value)}°C - {toCelsius(item.Temperature.Maximum.Value)}°C</Text>
                </View>
                <Image
                  source={{ uri: getWeatherIconUrl(item.Day.Icon) }}
                  style={styles.icon4day}
                />
                <Text style={{ marginLeft: 10, textAlign:"left", fontWeight:"bold", flexBasis:80 }}>{weatherPhrases[item.Day.IconPhrase] || item.Day.IconPhrase}</Text>

              </View>
            );
          })}
        </View>

      </ScrollView>
    </>

  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#009432',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollViewContainer: {

    marginVertical: 10,

  },
  hourlyContainer: {

    alignItems: 'center',
    paddingBottom: 0,


  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    marginTop: 0,
    backgroundColor: "#009432"
  },
  contentContainer: {
    padding: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 17,
    marginLeft: 10,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center"
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "contain"
  },
  weatherTitle: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: 'bold',
  },
  rainText: {
    color: "red",
    fontSize: 17,
    fontWeight: 'bold',
  },
  noRainText: {
    color: "green",
    fontWeight: 'bold',
  },
  temperatureText: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",


  },
  icon4day: {
    height: 80,
    width: 80,
    resizeMode: "contain"


  }
});

export default Wheather;
