function generateEvents(numRecords: number) {
  const eventTypes = ["cultural event", "meeting", "convention", "party"];
  const cities = ["Florence", "Rome", "Venice", "Milan", "Naples"];
  const facilities = [
    "Wi-Fi",
    "Projector",
    "Sound System",
    "Live Music",
    "Bar",
    "Dance Floor",
    "Cafeteria",
    "Gift Shop",
    "Audio Guides",
  ];

  const getRandomElement = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const getRandomPrice = () => Math.floor(Math.random() * 5000) + 500;
  const getRandomCapacity = () => Math.floor(Math.random() * 500) + 50;

  const events = [];

  for (let i = 0; i < numRecords; i++) {
    const city = getRandomElement(cities);
    events.push({
      id: i + 1,
      type: getRandomElement(eventTypes),
      photo: `https://source.unsplash.com/1600x900/?${city}`,
      name: `${city} ${getRandomElement(eventTypes)} #${i + 1}`,
      location: {
        address: `Some address in ${city}`,
        coordinates: {
          latitude: (41.90 + (Math.random()*0.2-0.1)).toFixed(4),
          longitude: (12.37 + (Math.random()*0.25)).toFixed(4),
        },
      },
      halls: [
        {
          name: `${city} Hall A`,
          capacity: getRandomCapacity(),
          price: getRandomPrice(),
        },
        {
          name: `${city} Hall B`,
          capacity: getRandomCapacity(),
          price: getRandomPrice(),
        },
      ],
      facilities: [
        getRandomElement(facilities),
        getRandomElement(facilities),
        getRandomElement(facilities),
      ],
      opening_hours: {
        monday: "09:00-18:00",
        tuesday: "09:00-18:00",
        wednesday: "09:00-18:00",
        thursday: "09:00-18:00",
        friday: "09:00-18:00",
        saturday: "09:00-18:00",
        sunday: "Closed",
      },
    });
  }

  return { events };
}

export default generateEvents;
