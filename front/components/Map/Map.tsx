import * as React from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  Popup,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import { useToast } from "../ui/use-toast";
import { facilities } from "./SampleData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyMap() {
  const { toast } = useToast();
  const [initialValue, setInitialValue] = React.useState({
    zoom: 8,
  });
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [name, setName] = React.useState("");
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [eWasteFacilities, setEWasteFacilities] = React.useState(facilities); // Store e-waste facility data
  const [nearbyFacilities, setNearbyFacilities] = React.useState([
    {
      id: 1,
      name: "E-Waste Recycling Center 1",
      lat: 28.729692330391437 + 0.001,
      long: 77.22492081078674 - 0.004,
      address: "123 Recycling St, City",
    },
    {
      id: 2,
      name: "GreenTech Recycling",
      lat: 28.729692330391437 - 0.002,
      long: 77.22492081078674 + 0.003,
      address: "456 Tech Ave, Town",
    },
    {
      id: 3,
      name: "Eco Recycle Hub",
      lat: 28.729692330391437 - 0.004,
      long: 77.22492081078674 - 0.001,
      address: "789 Eco Road, Village",
    },
    {
      id: 4,
      name: "TechWaste Solutions",
      lat: 28.729692330391437 + 0.003,
      long: 77.22492081078674 + 0.002,
      address: "101 Tech Street, Suburb",
    },
    // Add more e-waste facilities here
  ]);

  const [maxDistance, setMaxDistance] = React.useState(20000);
  // Your code to fetch e-waste facility data or import it
  function searchPlace() {
    setIsLoading(true);
    // Use the Mapbox Geocoding API to search for the place
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length > 0) {
          // Get the coordinates of the first result
          const coordinates = data.features[0].center;
          // Center the map on the coordinates
          setInitialValue({
            ...initialValue,
            longitude: coordinates[0],
            latitude: coordinates[1],
          });
          calculateNearbyFacilities({
            longitude: coordinates[0],
            latitude: coordinates[1],
          });
          setIsLoading(false);
        } else {
          console.log("Place not found");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function isValidCoordinate(coord: any) {
    return (
      Array.isArray(coord) &&
      coord.length === 2 &&
      !isNaN(coord[0]) &&
      !isNaN(coord[1])
    );
  }

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setInitialValue({
            ...initialValue,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          calculateNearbyFacilities({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setIsLoading(false);
        },
        (err) => {
          setInitialValue({
            ...initialValue,
            latitude: "28.6139",
            longitude: "77.2090",
          });
          setError(err.message);
          calculateNearbyFacilities({
            latitude: "28.6139",
            longitude: "77.2090",
          });
          toast({
            variant: "destructive",
            title: "Permission Denied",
            description: "Location Access permission denied.",
          });
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not available in this browser.");
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    calculateNearbyFacilities({
      latitude: initialValue.latitude,
      longitude: initialValue.longitude,
    });
  }, [maxDistance]);

  const calculateDistance = (userCoords, facilityCoords) => {
    return turf.distance(userCoords, facilityCoords, {
      units: "meters",
    });
  };
  const calculateNearbyFacilities = (data: any) => {
    const userCoords = [data.longitude, data.latitude];

    setNearbyFacilities((prevFacilities) => {
      const nbFacilities = eWasteFacilities.filter((facility) => {
        const facilityCoords = [facility.long, facility.lat];

        // Check if the coordinates are valid numbers
        if (
          !isValidCoordinate(userCoords) ||
          !isValidCoordinate(facilityCoords)
        ) {
          console.error("Invalid coordinates:", userCoords, facilityCoords);
          return false;
        }

        const distance = calculateDistance(userCoords, facilityCoords);

        // Check if the distance is NaN
        if (isNaN(distance)) {
          console.error(
            "Distance calculation resulted in NaN:",
            userCoords,
            facilityCoords
          );
          return false;
        }
        return distance <= maxDistance;
      });

      toast({
        className: "w-[400px]",
        action: (
          <div className="w-full text-sm ">
            <p className="font-semibold mt-1">
              Total Facilities Found Near You are {nbFacilities.length}{" "}
            </p>
          </div>
        ),
      });
      return nbFacilities;
    });
  };

  const handleCurrentPopUp = (facility) => {
    const userCoords = [initialValue.longitude, initialValue.latitude];
    const facilityCoords = [facility.long, facility.lat];

    toast({
      className: "w-[400px]",
      action: (
        <div className="w-full text-sm ">
          <p className="font-semibold mt-1">Facility Name: {facility.Name} </p>
          <p className="font-semibold mt-1">
            Facility Address: {facility.Address}
          </p>
          <p className="font-semibold mt-1">Pincode: {facility.Pincode}</p>
          <p className="font-semibold mt-1">
            Distance (From you):{" "}
            {(calculateDistance(userCoords, facilityCoords) / 1000).toFixed(2)}{" "}
            Km
          </p>
        </div>
      ),
    });
  };
  return (
    <>
      <div className="my-2 flex justify-between">
        <div>
          <input
            className="p-2 rounded-md outline-none border-none"
            type="text"
            id="placeName"
            placeholder="Enter a place, city, country"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={searchPlace}
            className="p-2 bg-white text-black rounded-tr-md rounded-br-md"
          >
            Search
          </button>
        </div>
        <Tabs
          defaultValue="20000"
          className="w-[400px] flex justify-end"
          onValueChange={(e) => {
            setMaxDistance(Number(e));
          }}
        >
          <TabsList>
            <TabsTrigger value="20000">Under 20 Km&apos;s</TabsTrigger>
            <TabsTrigger value="50000">Under 50 Km&apos;s</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
      </div>
      {!isLoading ? (
        <>
          {/* {selectedMarker && <p className="bg-white text-black font-bold text-xl z-[9999]">Hello</p>} */}

          <ReactMapGL
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
            initialViewState={initialValue}
            style={{ width: "100%", height: 900 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            {initialValue.latitude && initialValue.longitude && (
              <Marker
                longitude={initialValue.longitude}
                latitude={initialValue.latitude}
                anchor="bottom"
                offset={[-20, -10]}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--noto"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M99.54 63.98h-71.1c-7.67 0-13.94 6.68-13.94 14.85s6.27 14.85 13.94 14.85h71.11c7.67 0 13.94-6.68 13.94-14.85s-6.28-14.85-13.95-14.85z"
                    fill="#e59600"
                  />
                  <path
                    d="M64 12.39c-22.64 0-43.61 24.21-43.61 59.06c0 34.66 21.61 51.79 43.61 51.79s43.61-17.13 43.61-51.79c0-34.84-20.97-59.06-43.61-59.06z"
                    fill="#ffca28"
                  />
                  <g fill="#404040">
                    <ellipse cx={42.62} cy={74.51} rx={6.41} ry={6.64} />
                    <ellipse cx={85.38} cy={74.51} rx={6.41} ry={6.64} />
                  </g>
                  <path
                    d="M69.02 86.53a1.63 1.63 0 0 0-.42-.11h-9.2c-.14.02-.28.05-.42.11c-.83.34-1.29 1.2-.9 2.12c.4.92 2.23 3.5 5.92 3.5s5.52-2.58 5.92-3.5c.39-.91-.07-1.78-.9-2.12z"
                    fill="#e59600"
                  />
                  <path
                    d="M74.95 96.95c-4.14 2.46-17.73 2.46-21.87 0c-2.38-1.42-4.81.75-3.82 2.91c.97 2.13 8.38 7.06 14.79 7.06s13.73-4.93 14.7-7.06c.98-2.16-1.42-4.32-3.8-2.91z"
                    fill="#795548"
                  />
                  <path
                    d="M64 4.6h-.04c-57.44.31-45.67 65.91-45.67 65.91s2.58 6.77 3.75 9.75c.17.43.79.38.89-.07c1.23-5.49 5.64-24.94 7.87-30.85c1.31-3.49 4.93-5.51 8.59-4.85c5.63 1.02 14.6 2.28 24.49 2.28h.22c9.89 0 18.86-1.26 24.49-2.28c3.66-.66 7.28 1.36 8.59 4.85c2.22 5.89 6.6 25.23 7.84 30.8c.1.45.73.5.9.07l3.77-9.69C109.68 70.51 121.45 4.91 64 4.6z"
                    fill="#543930"
                  />
                  <radialGradient
                    id="IconifyId17ecdb2904d178eab10101"
                    cx={63.984}
                    cy={68.951}
                    r={48.156}
                    gradientTransform="matrix(1 0 0 -1.1282 0 136.838)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset={0.794} stopColor="#6d4c41" stopOpacity={0} />
                    <stop offset={1} stopColor="#6d4c41" />
                  </radialGradient>
                  <path
                    d="M109.68 70.51S121.45 4.9 64 4.6h-.04c-.89.01-1.77.03-2.63.06c-1.71.07-3.36.2-4.95.39c-.02 0-.03 0-.05.01c-.11.01-.21.03-.33.05c-48.35 6.08-37.71 65.4-37.71 65.4l3.76 9.7c.17.43.79.39.89-.06c1.24-5.54 5.64-24.91 7.86-30.81c1.31-3.49 4.93-5.51 8.59-4.85c5.63 1.02 14.6 2.28 24.49 2.28h.22c9.89 0 18.86-1.26 24.49-2.28c3.66-.66 7.28 1.36 8.59 4.85c2.23 5.92 6.64 25.41 7.86 30.87c.1.45.72.5.88.07c1.17-2.97 3.76-9.77 3.76-9.77z"
                    fill="url(#IconifyId17ecdb2904d178eab10101)"
                  />
                  <g fill="#6d4c41">
                    <path d="M95.18 64.04c.01-.01-2.96-4.67-9.83-4.67s-9.84 4.66-9.84 4.66l.01.01c-.24.33-.39.74-.39 1.19c0 1.12.91 2.04 2.04 2.04c.23 0 .8-.17.86-.19c4.11-1.7 7.34-1.71 7.34-1.71s3.2.01 7.31 1.71c.05.02.62.19.86.19c1.12 0 2.04-.91 2.04-2.04c-.01-.45-.16-.86-.4-1.19z" />
                    <path d="M52.47 64.04c.01-.01-2.96-4.67-9.83-4.67s-9.84 4.66-9.84 4.66l.01.01c-.24.33-.39.74-.39 1.19c0 1.12.91 2.04 2.04 2.04c.23 0 .8-.17.85-.19c4.12-1.7 7.34-1.71 7.34-1.71s3.2.01 7.31 1.71c.05.02.62.19.85.19c1.12 0 2.04-.91 2.04-2.04c.01-.45-.14-.86-.38-1.19z" />
                  </g>
                </svg>
              </Marker>
            )}
            {/* <Popup
          latitude={initialValue.latitude}
          longitude={initialValue.longitude}
          anchor="left"
          closeOnMove={true}
          offset={[-20, -10]}
        >
          <p className="text-black font-semibold">Your Location</p>
        </Popup> */}
            {nearbyFacilities.map((facility, i) => (
              <>
                <Marker
                  key={i}
                  longitude={facility.long}
                  latitude={facility.lat}
                  anchor="bottom"
                  onClick={() => handleCurrentPopUp(facility)}
                >
                  {/* Truck Marker */}
                  <svg
                    fill="#000000"
                    width="20px"
                    height="20px"
                    viewBox="0 0 36 36"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="jam jam-trash fill-red-500 cursor-pointer"
                  >
                    <title>{"truck-solid"}</title>
                    <path
                      className="clr-i-solid clr-i-solid-path-1"
                      d="M30,12H26V7a1,1,0,0,0-1-1H3A1,1,0,0,0,2,7V25a1,1,0,0,0,1,1H4V8H24V21.49A4.45,4.45,0,0,0,21.25,24H14.43a4.5,4.5,0,0,0-4.17-2.76A4.38,4.38,0,1,0,14.72,26H21a4.48,4.48,0,0,0,8.91,0H34V16A4,4,0,0,0,30,12ZM10.26,28a2.38,2.38,0,1,1,0-4.75,2.38,2.38,0,1,1,0,4.75Zm15.17,0a2.38,2.38,0,1,1,2.5-2.37A2.44,2.44,0,0,1,25.42,28ZM32,17H26V14h4a2,2,0,0,1,2,2Z"
                    />
                    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
                  </svg>
                </Marker>
                {/* { <Popup
              longitude={ facility.long}
              latitude={facility.lat}
              anchor="left"
              className="z-[99999999] text-black"
              closeButton={false}
            >
              <div>
                <h2>{facility.Address}</h2>
              </div>
            </Popup>} */}
              </>
            ))}
            {/* {selectedMarker && (
              
              <Popup
                longitude={parseFloat(selectedMarker.long)}
                latitude={parseFloat(selectedMarker.lat)}
                anchor="left"
                className="z-[99999999]"
              >
                <div>
                  <h2>{selectedMarker.address}</h2>
                </div>
              </Popup>
            )} */}
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <NavigationControl />
          </ReactMapGL>
        </>
      ) : (
        <p className="text-white text-center my-8 font-semibold">
          Initializing Map....
        </p>
      )}
    </>
  );
}

{
  /* Trash Can */
}
{
  /* <svg
                width="20px"
                height="20px"
                viewBox="-3 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                className="jam jam-trash fill-red-500"
              >
                <path d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" />
              </svg> */
}
