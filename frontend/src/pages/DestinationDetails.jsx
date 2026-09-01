import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Coins,
  Languages,
  MapPin,
  Lightbulb,
  Sparkles,
  Plane,
} from "lucide-react";

import api from "../api/axios";

export default function DestinationDetails() {
  const { destination } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["destination", destination],

    queryFn: async () => {
      const { data } = await api.get(
        `/explore/${encodeURIComponent(destination)}`
      );

      return data;
    },

    enabled: !!destination,
  });

  // -----------------------------
  // Loading
  // -----------------------------

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">

          <div className="h-8 w-24 bg-slate-200 rounded-lg animate-pulse mb-8" />

          <div className="h-[420px] bg-slate-200 rounded-3xl animate-pulse mb-8" />

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 bg-slate-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>

          <div className="h-48 bg-slate-200 rounded-3xl animate-pulse" />

        </div>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Destination not found
          </h1>

          <p className="text-slate-500 mb-6">
            {error?.response?.data?.message ||
              "Unable to load destination information."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================================= */}
      {/* Hero */}
      {/* ================================= */}

      <section className="relative overflow-hidden">

        <div className="h-[430px] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500">

          <div className="absolute inset-0 opacity-10">

            <div className="absolute -top-20 -right-20 w-96 h-96 border-[60px] border-white rounded-full" />

            <div className="absolute -bottom-40 -left-20 w-96 h-96 border-[60px] border-white rounded-full" />

          </div>

        </div>

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute top-6 left-0 right-0">

          <div className="max-w-7xl mx-auto px-4">

            <button
              type="button"
              onClick={() => {
                
                navigate("/explore");
              }}
              className="relative z-50 bg-white/95 backdrop-blur text-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg hover:bg-white transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

          </div>

        </div>

        <div className="absolute inset-0 flex items-end">

          <div className="max-w-7xl mx-auto w-full px-4 pb-12 text-white">

            <div className="flex items-center gap-2 mb-4">

              <div className="p-2 bg-white/15 backdrop-blur rounded-xl">
                <Sparkles size={20} />
              </div>

              <span className="font-medium text-blue-100">
                Explore Destination
              </span>

            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-3">
              {data.destination}
            </h1>

            <div className="flex items-center gap-2 text-xl text-blue-100">

              <MapPin size={20} />

              <span>{data.country}</span>

            </div>

          </div>

        </div>

      </section>


      <main className="max-w-7xl mx-auto px-4 py-10">


        {/* ================================= */}
        {/* Quick Information */}
        {/* ================================= */}

        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <CalendarDays size={22} />
              </div>

              <h3 className="font-semibold text-slate-900">
                Best Time
              </h3>

            </div>

            <p className="text-slate-600">
              {data.bestTimeToVisit || "Anytime"}
            </p>

          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <Coins size={22} />
              </div>

              <h3 className="font-semibold text-slate-900">
                Currency
              </h3>

            </div>

            <p className="text-slate-600">
              {data.currency || "Varies"}
            </p>

          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-4">

              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Languages size={22} />
              </div>

              <h3 className="font-semibold text-slate-900">
                Language
              </h3>

            </div>

            <p className="text-slate-600">
              {data.language || "Varies"}
            </p>

          </div>

        </div>


        {/* ================================= */}
        {/* About */}
        {/* ================================= */}

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm mb-10">

          <div className="flex items-center gap-3 mb-5">

            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Sparkles size={22} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              About {data.destination}
            </h2>

          </div>

          <p className="text-slate-600 leading-8 text-lg">
            {data.description}
          </p>

        </section>


        {/* ================================= */}
        {/* Top Attractions */}
        {/* ================================= */}

        <section className="mb-10">

          <div className="mb-6">

            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              Places to explore
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-1">
              Top Attractions
            </h2>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {data.topAttractions?.map(
              (attraction, index) => (

                <div
                  key={attraction._id || index}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="flex items-center justify-between mb-5">

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <MapPin
                      size={19}
                      className="text-slate-300"
                    />

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {attraction.name}
                  </h3>

                  <p className="text-slate-600 leading-7">
                    {attraction.description}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* ================================= */}
        {/* Travel Tips */}
        {/* ================================= */}

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm mb-10">

          <div className="flex items-center gap-3 mb-6">

            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
              <Lightbulb size={22} />
            </div>

            <div>

              <p className="text-sm text-yellow-600 font-semibold">
                Travel smarter
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Travel Tips
              </h2>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-4">

            {data.travelTips?.map(
              (tip, index) => (

                <div
                  key={index}
                  className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100"
                >

                  <div className="w-8 h-8 flex-shrink-0 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>

                  <p className="text-slate-600 leading-7">
                    {tip}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* ================================= */}
        {/* Plan Trip CTA */}
        {/* ================================= */}

        <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 md:p-10 text-white">

          <div className="absolute right-0 top-0 opacity-10">

            <Plane size={220} />

          </div>

          <div className="relative z-10 max-w-2xl">

            <h2 className="text-3xl font-bold mb-3">
              Planning a trip to {data.destination}?
            </h2>

            <p className="text-blue-100 text-lg leading-7 mb-6">
              Upload your travel bookings and let TravelAI
              create a personalized itinerary for you.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              <Plane size={18} />
              Plan My Trip
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}