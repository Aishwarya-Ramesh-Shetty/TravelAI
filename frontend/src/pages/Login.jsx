import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      login(response.data.token, response.data.user);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Login to TravelAI</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input {...register('email')} type="email" required className="w-full mt-1 border rounded-lg p-3 outline-indigo-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input {...register('password')} type="password" required className="w-full mt-1 border rounded-lg p-3 outline-indigo-600" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">Sign In</button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}