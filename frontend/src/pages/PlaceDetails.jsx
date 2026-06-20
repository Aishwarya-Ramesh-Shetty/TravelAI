import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";

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

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              About This Place
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {place.activity}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              Travel Information
            </h2>

            <p className="mb-3">
              ⏰ Best Time:
              {" "}
              {place.bestTimeToVisit || "Anytime"}
            </p>

            <p>
              💰 Estimated Cost:
              {" "}
              {place.estimatedCost || "Not Available"}
            </p>
          </div>

        </div>

        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(
            place.placeName
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