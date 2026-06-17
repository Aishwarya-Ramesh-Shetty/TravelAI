import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function Review() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(state?.extractedData || {});
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data: trip } = await api.post('/trips/generate', {
        extractedData: data,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate
      });
      toast.success('Itinerary generated!');
      navigate(`/itinerary/${trip._id}`);
    } catch (err) {
      toast.error('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Review Extracted Data</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium">Destination</label>
          <input 
            className="w-full border p-2 rounded mt-1"
            value={data.destination}
            onChange={(e) => setData({...data, destination: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input type="date" className="w-full border p-2 rounded mt-1" value={data.startDate} onChange={(e) => setData({...data, startDate: e.target.value})} />
            </div>
            <div>
                <label className="block text-sm font-medium">End Date</label>
                <input type="date" className="w-full border p-2 rounded mt-1" value={data.endDate} onChange={(e) => setData({...data, endDate: e.target.value})} />
            </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Generating Itinerary...' : 'Confirm & Generate Itinerary'}
        </button>
      </div>
    </div>
  );
}