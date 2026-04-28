import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, ChevronRight, 
  Target, Layers, 
  Download, ChevronLeft, ChevronRight as ChevronRightIcon,
  MapPin, IndianRupee, Maximize2, RotateCcw, Home
} from 'lucide-react';
import { matchService } from '../services/api';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const initialFilters = {
    startDate: '',
    endDate: '',
    listingType: [] as string[],
    requirementType: [] as string[],
    matchStatus: [] as string[],
    tier: [] as string[],
    brokerName: ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await matchService.searchMatches(filters, page, pageSize);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [page, filters.listingType, filters.requirementType, filters.matchStatus, filters.tier, pageSize]);

  const exportToCSV = () => {
    if (!data?.matches) return;
    const headers = ['Score', 'Quality', 'Property Location', 'Property Price', 'Buyer Budget', 'Property Broker', 'Buyer Broker'];
    const rows = data.matches.map((m: any) => [
      m.scorePercent, 
      m.matchQuality, 
      m.property.location, 
      m.property.price, 
      m.buyer.budget,
      m.property.brokerName,
      m.buyer.brokerName
    ]);
    const content = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `matches-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Filter Section (Keeping the UI, but we mostly rely on pagination based on API limits) */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Filters</h2>
          </div>
          <button 
            onClick={resetFilters}
            className="flex items-center text-xs font-bold text-slate-500 hover:text-primary-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end opacity-50">
          <div className="md:col-span-12 mb-2 p-3 bg-amber-50 text-amber-800 rounded-lg text-sm font-medium">
            Additional filtering is currently disabled. Server returns paginated all matches.
          </div>
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                disabled
                placeholder="Search disabled..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Match Results</h2>
          <button 
            onClick={exportToCSV}
            className="flex items-center text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.1em]">
                <th className="px-6 py-4">Score & Quality</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Buyer Requirement</th>
                <th className="px-6 py-4">Match Details</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <AnimatedLoader />
              ) : data?.matches?.length > 0 ? (
                data.matches.map((match: any, idx: number) => (
                  <React.Fragment key={idx}>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-lg font-black text-slate-900">{match.scorePercent}%</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded w-max mt-1 ${
                            match.scorePercent > 80 ? 'bg-emerald-50 text-emerald-600' :
                            match.scorePercent > 60 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
                          }`}>
                            {match.matchQuality}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center text-slate-900 font-bold">
                            <Home className="w-3 h-3 mr-1 text-slate-400" /> {match.property.type} - {match.property.config}
                          </div>
                          <div className="flex items-center text-slate-900 font-bold">
                            <MapPin className="w-3 h-3 mr-1 text-slate-400" /> {match.property.location}
                          </div>
                          <div className="flex items-center text-slate-500 text-xs font-medium">
                            <IndianRupee className="w-3 h-3 mr-1" /> {match.property.price} • <Maximize2 className="w-3 h-3 mx-1" /> {match.property.size}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm space-y-1">
                        <div className="flex items-center text-slate-900 font-bold">
                          <Target className="w-3 h-3 mr-1 text-slate-400" /> {match.buyer.lookingFor} ({match.buyer.type})
                        </div>
                        <div className="flex items-center text-slate-900 font-bold">
                          <IndianRupee className="w-3 h-3 mr-1" /> {match.buyer.budget}
                        </div>
                        <div className="text-slate-500 text-xs mt-1 truncate max-w-[200px] font-medium">
                          {match.buyer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-600">
                           <ul className="list-disc pl-4">
                             {Object.entries(match.matchDetails || {}).map(([key, val]) => (
                               <li key={key} className="truncate capitalize">{key}: {val as React.ReactNode}</li>
                             ))}
                           </ul>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors group"
                        >
                          {expandedRow === idx ? (
                            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === idx && (
                      <tr className="bg-slate-50/30 border-l-4 border-primary-500 animate-in slide-in-from-left-1 duration-200">
                        <td colSpan={5} className="px-6 py-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <div>
                               <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Property Broker</h3>
                               <div className="space-y-2">
                                 <p className="text-sm"><span className="text-slate-400 font-medium">Name:</span> <strong>{match.property.brokerName}</strong></p>
                                 <p className="text-sm"><span className="text-slate-400 font-medium">Phone:</span> <strong>{match.property.brokerPhone}</strong></p>
                                 <p className="text-sm"><span className="text-slate-400 font-medium">Status:</span> <strong>{match.property.for}</strong></p>
                               </div>
                            </div>
                            <div>
                               <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Buyer Broker</h3>
                               <div className="space-y-2">
                                 <p className="text-sm"><span className="text-slate-400 font-medium">Name:</span> <strong>{match.buyer.brokerName}</strong></p>
                                 <p className="text-sm"><span className="text-slate-400 font-medium">Phone:</span> <strong>{match.buyer.brokerPhone}</strong></p>
                               </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <Layers className="w-12 h-12 text-slate-200 mb-4" />
                      <p className="text-lg font-bold text-slate-800">No matches found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination / Table Footer */}
        {data?.pagination && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 font-bold">
                Page <span className="text-slate-900">{data.pagination.currentPage}</span> of <span className="text-slate-900">{data.pagination.totalPages}</span>
              </span>
              <span className="text-xs text-slate-400 mt-1 font-medium flex items-center">
                Total Matches: <span className="text-slate-600 mx-1">{data.pagination.totalMatches}</span> • 
                <span className="ml-2 mr-1">Rows per page:</span>
                <select 
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs font-bold text-slate-700 outline-none hover:border-primary-400 focus:ring-1 focus:ring-primary-500 transition-colors mx-1"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </span>
            </div>
            <div className="flex space-x-2">
              <button 
                disabled={data.pagination.currentPage === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl bg-white hover:border-primary-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm text-sm font-bold text-slate-600"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </button>
              <button 
                disabled={data.pagination.currentPage === data.pagination.totalPages}
                onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl bg-white hover:border-primary-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm text-sm font-bold text-slate-600"
              >
                Next
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnimatedLoader = () => (
  <tr>
    <td colSpan={5} className="py-32">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Pulsing rings */}
          <div className="absolute inset-0 bg-primary-100 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75"></div>
          <div className="absolute inset-4 bg-primary-200 rounded-full animate-pulse duration-700"></div>
          
          {/* Bouncing core */}
          <div className="relative bg-white rounded-full p-4 shadow-xl border border-slate-100 flex items-center justify-center z-10 animate-bounce duration-1000 shadow-primary-500/20">
            <Home className="w-8 h-8 text-primary-600" />
          </div>
          
          {/* Sweeping radar/search element */}
          <Search className="w-6 h-6 text-amber-500 absolute bottom-0 right-0 z-20 animate-[spin_3s_linear_infinite]" />
        </div>
        
        <div className="flex flex-col items-center space-y-1.5 animate-pulse">
          <h3 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-indigo-500 to-primary-600 bg-[length:200%_auto] animate-[gradient_2s_linear_infinite]">
            Discovering Perfect Matches
          </h3>
          <p className="text-sm text-slate-500 font-bold tracking-wide">
            Analyzing properties and requirements...
          </p>
        </div>
      </div>
    </td>
  </tr>
);

export default DashboardPage;
