import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Plus, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await api.get('/trips');
      return data;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-500">Manage your AI-generated itineraries</p>
        </div>
        <Link to="/upload" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus size={20} /> New Trip
        </Link>
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
  );
}