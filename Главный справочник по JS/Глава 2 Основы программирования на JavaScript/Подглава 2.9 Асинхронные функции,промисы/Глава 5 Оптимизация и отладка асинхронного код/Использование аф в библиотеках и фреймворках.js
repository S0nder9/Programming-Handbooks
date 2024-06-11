// React:

import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект будет запущен только при монтировании компонента

  return (
    <div>
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;


// Vue:

// <template>
//   <div>
//     <ul v-if="data">
//       <li v-for="item in data" :key="item.id">{{ item.name }}</li>
//     </ul>
//     <p v-else>Loading...</p>
//   </div>
// </template>

// <script>
// export default {
//   data() {
//     return {
//       data: null
//     };
//   },
//   async created() {
//     try {
//       const response = await fetch('https://api.example.com/data');
//       const jsonData = await response.json();
//       this.data = jsonData;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// };
// </script>

// Angular:

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-my-component',
//   templateUrl: './my-component.component.html',
//   styleUrls: ['./my-component.component.css']
// })
// export class MyComponent implements OnInit {
//   data: any;

//   constructor(private http: HttpClient) {}

//   async ngOnInit() {
//     try {
//       const jsonData = await this.http.get('https://api.example.com/data').toPromise();
//       this.data = jsonData;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// }
// В каждом примере мы используем асинхронные функции для выполнения HTTP-запроса и обновления компонента с полученными данными. В React мы используем хук useEffect, в Vue - хук created, а в Angular - метод ngOnInit.