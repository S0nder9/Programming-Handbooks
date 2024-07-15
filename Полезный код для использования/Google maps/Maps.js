// Глава 1: Введение в Google Maps API
// Google Maps API предоставляет инструменты для добавления карт и геолокационных функций на веб-сайты.
// С его помощью можно создавать интерактивные карты, добавлять маркеры, маршруты и многое другое.

// Глава 2: Основные функции Google Maps API
// Google Maps API предлагает множество методов и свойств для взаимодействия с картами, такими как создание карты,
// добавление маркеров, создание маршрутов и т.д.

// Подглава 2.1: Создание карты
// Чтобы создать карту, необходимо использовать конструктор google.maps.Map(), который принимает элемент DOM
// и объект с параметрами настройки карты.
function initMap() {
    const mapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }
  
  // Подглава 2.2: Добавление маркера
  // Метод google.maps.Marker() используется для добавления маркеров на карту. Он принимает объект с параметрами,
  // включая позицию маркера и карту, на которую его нужно добавить.
  function addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }
  
  // Подглава 2.3: Добавление обработчика событий
  // Google Maps API позволяет добавлять обработчики событий к картам и маркерам. Например, можно добавить обработчик
  // на клик по карте, чтобы создать новый маркер в месте клика.
  function initMapWithEvent() {
    const mapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
    map.addListener("click", function(event) {
      addMarker(event.latLng);
    });
  }
  
  // Подглава 2.4: Создание маршрутов
  // Google Maps API включает сервисы для создания маршрутов. Сервис DirectionsService используется для получения
  // маршрутов, а DirectionsRenderer — для отображения этих маршрутов на карте.
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
      {
        origin: { lat: 37.77, lng: -122.447 },
        destination: { lat: 37.768, lng: -122.511 },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  
  function initMapWithRoute() {
    const mapOptions = {
      center: { lat: 37.77, lng: -122.447 },
      zoom: 13,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
  
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  }

  


// В react

// useGoogleMaps.js
import { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const useGoogleMaps = (apiKey, mapContainerStyle, center, zoom) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState(null);

  const onLoad = mapInstance => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
    if (map) {
      // Пример добавления маркера
      new window.google.maps.Marker({
        position: center,
        map,
        title: 'Hello World!',
      });
    }
  }, [map, center]);

  return { isLoaded, loadError, map, onLoad, onUnmount, mapContainerStyle, center, zoom };
};

export default useGoogleMaps;
