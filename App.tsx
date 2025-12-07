import React, { useState, useEffect } from 'react';
import { UserRole, Bus } from './types';
import { INITIAL_BUSES } from './constants';
import MapVisualizer from './components/MapVisualizer';
import ChatWidget from './components/ChatWidget';
import { 
  Bus as BusIcon, 
  Map as MapIcon, 
  Users, 
  UserCircle, 
  LogOut, 
  Navigation,
  Clock,
  Menu,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [buses, setBuses] = useState<Bus[]>(INITIAL_BUSES);
  const [activeTab, setActiveTab] = useState<'MAP' | 'LIST'>('MAP');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [driverActive, setDriverActive] = useState(false);

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((currentBuses) => 
        currentBuses.map((bus) => {
          // Simple bounce logic between X=20 and X=80 for simulation
          let newX = bus.currentLocation.x;
          let newY = bus.currentLocation.y;
          
          if (bus.status === 'NOT_STARTED') return bus;

          // Simulate movement based on route direction roughly
          if (bus.id === 'B001') { // KTM to EKM (Up and Right)
             newX = (newX + 0.5) % 100;
             newY = Math.max(10, newY - 0.5); 
             if (newX > 80) { newX = 20; newY = 80; } // Loop back
          } else { // VAI to ALU
             newX = (newX + 0.3) % 100;
             newY = Math.max(10, newY - 0.3);
             if (newX > 80) { newX = 20; newY = 50; } // Loop back
          }

          return {
            ...bus,
            currentLocation: { x: newX, y: newY }
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // -- Views --

  const LoginView = () => (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-20"></div>

      <div className="z-10 text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-500/30">
          <BusIcon size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">YatraConnect</h1>
        <p className="text-slate-400 text-lg">Real-time Bus Tracking System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl z-10">
        <button
          onClick={() => setRole(UserRole.PASSENGER)}
          className="group relative bg-white/5 hover:bg-white/10 border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute top-4 right-4 bg-indigo-500/20 p-2 rounded-lg">
             <UserCircle className="text-indigo-400" size={24} />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2 text-left">Passenger</h3>
          <p className="text-slate-400 text-left text-sm">Track buses, check schedules, and get AI assistance.</p>
        </button>

        <button
          onClick={() => setRole(UserRole.DRIVER)}
          className="group relative bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute top-4 right-4 bg-indigo-500/20 p-2 rounded-lg">
             <Navigation className="text-indigo-400" size={24} />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2 text-left">Driver</h3>
          <p className="text-slate-400 text-left text-sm">Update trips, view passenger manifest, and share location.</p>
        </button>
      </div>
    </div>
  );

  const DashboardHeader = () => (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
          <Menu size={20} className="text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <BusIcon size={18} className="text-white" />
          </div>
          <span className="font-bold text-slate-800 text-lg">YatraConnect</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
         {role === UserRole.DRIVER && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${driverActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
              <div className={`w-2 h-2 rounded-full ${driverActive ? 'bg-green-600 animate-pulse' : 'bg-slate-400'}`}></div>
              {driverActive ? 'LIVE' : 'OFFLINE'}
            </div>
         )}
         <button onClick={() => setRole(null)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
           <LogOut size={20} />
         </button>
      </div>
    </header>
  );

  const PassengerDashboard = () => (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Mobile Tabs */}
      <div className="md:hidden flex p-2 gap-2 bg-white border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('MAP')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'MAP' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <MapIcon size={16} /> Live Map
        </button>
        <button 
          onClick={() => setActiveTab('LIST')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'LIST' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Clock size={16} /> Schedules
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row">
        {/* Map Area */}
        <div className={`flex-1 h-full relative ${activeTab === 'LIST' ? 'hidden md:block' : 'block'}`}>
           <MapVisualizer buses={buses} userRole="PASSENGER" />
           <div className="absolute bottom-4 left-4 right-4 md:left-6 md:w-80 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Nearest Bus</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">KL-05-AB-1234</div>
                  <div className="font-semibold text-indigo-700">Super Fast: KTM - EKM</div>
                </div>
                <div className="text-right">
                   <div className="text-xs text-slate-500">Arriving in</div>
                   <div className="font-bold text-green-600">5 min</div>
                </div>
              </div>
           </div>
        </div>

        {/* List Sidebar (Desktop) / Mobile Tab Content */}
        <div className={`md:w-96 bg-white border-l border-slate-200 overflow-y-auto ${activeTab === 'MAP' ? 'hidden md:block' : 'block'}`}>
          <div className="p-4">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" />
              Available Buses
            </h2>
            <div className="space-y-4">
              {buses.map(bus => (
                <div key={bus.id} className="p-4 rounded-xl border border-slate-100 shadow-sm bg-white hover:border-indigo-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded">{bus.id}</span>
                    <span className={`flex items-center gap-1 text-xs font-medium ${bus.status === 'DELAYED' ? 'text-red-600' : 'text-green-600'}`}>
                      {bus.status === 'DELAYED' ? <AlertCircle size={12}/> : <CheckCircle2 size={12}/>}
                      {bus.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">{bus.name}</h3>
                  <div className="flex items-center text-xs text-slate-500 gap-2 mb-3">
                    <span>Next: {bus.nextStop}</span>
                    <span>•</span>
                    <span>Occ: {bus.occupied}/{bus.capacity}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(bus.occupied/bus.capacity)*100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
               <h4 className="text-yellow-800 font-semibold text-sm mb-1">Travel Alert</h4>
               <p className="text-yellow-700 text-xs">Heavy traffic expected near Vyttila hub due to construction work. Expect delays of 10-15 mins.</p>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );

  const DriverDashboard = () => (
    <div className="flex flex-col h-full bg-slate-50">
       <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-1">
             <h2 className="text-slate-500 text-sm font-medium mb-4">Trip Status</h2>
             <div className="flex flex-col gap-4">
                <div className="text-center">
                   <div className="text-3xl font-bold text-slate-800">B001</div>
                   <div className="text-sm text-slate-500">Kottayam - Ernakulam</div>
                </div>
                <button 
                  onClick={() => setDriverActive(!driverActive)}
                  className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg ${driverActive ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}
                >
                  {driverActive ? 'Stop Trip' : 'Start Trip'}
                </button>
             </div>
          </div>

          {/* Passenger Manifest */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
            <h2 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
               <Users size={20} className="text-indigo-600"/>
               Passenger Manifest (3)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Seat</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">A1</td>
                    <td className="px-4 py-3">Rahul Nair</td>
                    <td className="px-4 py-3">Ernakulam</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Waiting</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">A2</td>
                    <td className="px-4 py-3">Sarah Joseph</td>
                    <td className="px-4 py-3">Thrippunithura</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Boarded</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Map Preview */}
          <div className="md:col-span-3 h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow">Live Tracking Preview</div>
             <MapVisualizer buses={buses.filter(b => b.id === 'B001')} userRole="DRIVER" />
          </div>
       </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col font-sans text-slate-800">
      {!role ? (
        <LoginView />
      ) : (
        <>
          <DashboardHeader />
          <main className="flex-1 overflow-hidden">
            {role === UserRole.PASSENGER ? <PassengerDashboard /> : <DriverDashboard />}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
