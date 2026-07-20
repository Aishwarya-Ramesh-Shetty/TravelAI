import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import {
  Plus,
  MapPin,
  Calendar,
  ArrowRight,
  Plane,
  Globe,
  Clock3,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await api.get('/trips');
      return data;
    }
  });


  const totalTrips = trips?.length || 0;

  const countries = [
    ...new Set(
      trips?.map((trip) => trip.destination.split(",").pop().trim())
    ),
  ];

  const upcomingTrips =
    trips?.filter(
      (trip) => new Date(trip.startDate) > new Date()
    ).length || 0;

  const totalTravelDays =
    trips?.reduce((sum, trip) => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);

      return (
        sum +
        Math.ceil(
          (end - start) / (1000 * 60 * 60 * 24)
        ) +
        1
      );
    }, 0) || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white p-10 mb-10">

          <div className="absolute top-0 right-0 opacity-10">
            <Plane size={260} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <Sparkles size={22} />

                <span className="font-semibold">
                  AI Powered Travel Planner
                </span>

              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">

                Ready for your
                <br />
                next adventure?

              </h1>

              <p className="text-blue-100 mt-4 max-w-xl">

                Upload your booking, let AI build your itinerary,
                and explore every destination effortlessly.

              </p>

            </div>

            <Link
              to="/upload"
              className="mt-8 lg:mt-0 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transition flex items-center gap-3"
            >
              <Plus size={22} />
              Plan New Trip
            </Link>

          </div>

        </div>


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Plane className="text-indigo-600 mb-4" />

            <h2 className="text-3xl font-bold">
              {totalTrips}
            </h2>

            <p className="text-gray-500">
              Trips Planned
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Globe className="text-green-600 mb-4" />

            <h2 className="text-3xl font-bold">
              {countries.length}
            </h2>

            <p className="text-gray-500">
              Countries
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Clock3 className="text-orange-500 mb-4" />

            <h2 className="text-3xl font-bold">
              {upcomingTrips}
            </h2>

            <p className="text-gray-500">
              Upcoming Trips
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <Calendar className="text-pink-600 mb-4" />

            <h2 className="text-3xl font-bold">
              {totalTravelDays}
            </h2>

            <p className="text-gray-500">
              Travel Days
            </p>

          </div>

        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips?.map((trip) => (
              <Link key={trip._id} to={`/itinerary/${trip._id}`} className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300 group-hover:text-indigo-600 transition" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{trip.destination}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
              </Link>
            ))}
            {trips?.length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                <p className="text-gray-500">No trips found. Upload a booking document to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}