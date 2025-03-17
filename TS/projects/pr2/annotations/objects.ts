const profile = {
  name: "alex",
  age: 20,
  coordinates: {
    lat: 1,
    lng: 20,
  },

  setAge: (age: number): void => {
    this.age = age;
  },
};

const { age }: { age: number } = profile;
const {coordinates: {lat, lng}}: {coordinates: {lat: number, lng: number}} = profile;