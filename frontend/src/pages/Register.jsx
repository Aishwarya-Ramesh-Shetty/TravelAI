import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      login(response.data.token, response.data.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden backdrop-blur-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 -mt-8">

       
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center bg-white/10 backdrop-blur-md p-12 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Start Your
              <br />
              Next Adventure ✈️
            </h1>

            <p className="text-lg text-indigo-100 mb-8">
              Join thousands of travelers discovering personalized destinations,
              smart itineraries, and AI-powered travel planning.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <span>Discover unique destinations</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">🧳</span>
                <span>Create travel plans in seconds</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <span>Powered by advanced AI recommendations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900">
                Create Account 🚀
              </h2>

              <p className="text-gray-500 mt-2">
                Join TravelAI and plan smarter trips
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  {...register('name')}
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  {...register('email')}
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  {...register('password')}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all shadow-lg"
              >
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-purple-600"
                >
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );

}