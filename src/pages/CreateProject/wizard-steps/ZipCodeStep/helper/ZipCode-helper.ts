// const fetchCounty = async () => {
//   const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your actual API key
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data, "this is data");

//     if (data.status === "OK" && data.results.length > 0) {
//       const addressComponents = data.results[0].address_components;
//       const countyComponent = addressComponents.find((component) =>
//         component.types.includes("administrative_area_level_2")
//       );
//       const stateComponent = addressComponents.find((component) =>
//         component.types.includes("administrative_area_level_1")
//       );

//       console.log(
//         { countyComponent, stateComponent },
//         "this is countyComponent"
//       );
//     } else {
//       console.log("err");
//     }
//   } catch (err) {
//     setError("Failed to fetch county data.");
//     console.error(err);
//   }
// };
