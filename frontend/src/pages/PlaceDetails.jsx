import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function PlaceDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { place, destination } = location.state || {};

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Place not found
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { data: details } = useQuery({
    queryKey: [
      "place-details",
      place.placeName
    ],
    queryFn: async () => {
      const { data } =
        await api.get(
          "/trips/place-details",
          {
            params: {
              placeName:
                place.placeName,
              destination
            }
          }
        );

      return data;
    }
  });



  return (
    <div className="min-h-screen bg-slate-50">

      <div className="relative">

        <img
          src={place.imageUrl}
          alt={place.placeName}
          className="w-full h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-bold">
            {place.placeName}
          </h1>

          <p className="text-xl mt-2">
            📍 {destination}
          </p>
        </div>

      </div>

      <div className="max-w-6xl mx-auto p-8">

        {/* AI Description */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">
            About {place.placeName}
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {details?.description || place.activity}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-bold">Best Time</h3>
            <p>{place.bestTimeToVisit || "Anytime"}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-bold">Estimated Cost</h3>
            <p>{place.estimatedCost || "Not Available"}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-bold">Location</h3>
            <p>{destination}</p>
          </div>

        </div>

        {place.coordinates && (
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              🗺 Location Map
            </h2>

            <MapContainer
              center={[
                Number(place.coordinates.lat),
                Number(place.coordinates.lng)
              ]}
              zoom={15}
              style={{
                height: "400px",
                width: "100%",
                borderRadius: "16px"
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={[
                  Number(place.coordinates.lat),
                  Number(place.coordinates.lng)
                ]}
              >
                <Popup>
                  {place.placeName}
                </Popup>
              </Marker>
            </MapContainer>

          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Nearby Attractions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {details?.nearbyAttractions?.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4"
              >
                📍 {item}
              </div>
            ))}
          </div>

        </div>

        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(
            `${place.placeName} ${destination}`

          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl mt-8 hover:bg-indigo-700"
        >
          <MapPin size={18} />
          Open in Google Maps
        </a>

      </div>

    </div>
  );
}