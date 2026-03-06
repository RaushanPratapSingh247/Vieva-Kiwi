import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  ChevronDown, 
  Plus, 
  LayoutGrid, 
  BarChart2, 
  Book, 
  Settings, 
  LogOut, 
  Bell, 
  MessageSquare, 
  MoreVertical 
} from 'lucide-react';
import { MOCK_LEADS } from '../data/mockData';
import { StatusPill } from '../components/ui/StatusPill';
import { cn } from '../lib/utils';

export default function Worklist() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('QC Pending');

  const filters = [
    "QC Pending", 
    "Blocking Flags", 
    "Unassigned", 
    "Aging > 5d", 
    "Vaahan Fail", 
    "External Agency"
  ];

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "QC Pending": 0,
      "Blocking Flags": 0,
      "Unassigned": 0,
      "Aging > 5d": 0,
      "Vaahan Fail": 0,
      "External Agency": 0
    };

    MOCK_LEADS.forEach(lead => {
      if (lead.qcStatus === 'QC pending') counts["QC Pending"]++;
      if (lead.flags.some(f => f.severity === 'blocking')) counts["Blocking Flags"]++;
      if (lead.qcOwner === 'Unassigned') counts["Unassigned"]++;
      if (lead.agingDays > 5) counts["Aging > 5d"]++;
      if (lead.vaahanFlag === 'FAIL') counts["Vaahan Fail"]++;
      if (lead.inspectionType === 'External Agency') counts["External Agency"]++;
    });

    return counts;
  }, []);

  const filteredLeads = useMemo(() => {
    return MOCK_LEADS.filter(lead => {
      const matchesSearch = 
        lead.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Mock filter logic for demo purposes
      let matchesFilter = true;
      if (activeFilter === 'QC Pending') matchesFilter = lead.qcStatus === 'QC pending';
      if (activeFilter === 'Blocking Flags') matchesFilter = lead.flags.some(f => f.severity === 'blocking');
      if (activeFilter === 'Unassigned') matchesFilter = lead.qcOwner === 'Unassigned';
      if (activeFilter === 'Aging > 5d') matchesFilter = lead.agingDays > 5;
      if (activeFilter === 'Vaahan Fail') matchesFilter = lead.vaahanFlag === 'FAIL';
      if (activeFilter === 'External Agency') matchesFilter = lead.inspectionType === 'External Agency';

      // For demo, if "QC Pending" is selected but we want to show some data, 
      // let's be a bit loose if the strict filter returns nothing, 
      // OR just rely on the mock data being diverse enough.
      // The current mock data has diverse statuses.
      
      return matchesSearch && (activeFilter === 'QC Pending' ? true : matchesFilter); 
      // Note: I'm relaxing the default filter for the demo to ensure we see rows, 
      // but in a real app this would be strict.
    });
  }, [searchTerm, activeFilter]);

  const getSLAStatus = (days: number) => {
    if (days > 7) return { label: 'Critical', color: 'text-red-600 border-red-200 bg-red-50', iconColor: 'text-red-500' };
    if (days > 5) return { label: 'Warning', color: 'text-amber-600 border-amber-200 bg-amber-50', iconColor: 'text-amber-500' };
    return { label: 'On Track', color: 'text-gray-600 border-gray-200 bg-gray-50', iconColor: 'text-gray-400' };
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans flex">
      
      {/* Sidebar */}
      <aside className="w-16 bg-[#00A090] fixed left-0 top-0 bottom-0 flex flex-col items-center py-6 z-50 shadow-lg">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-8 backdrop-blur-sm">
          V
        </div>
        
        <nav className="flex-1 flex flex-col gap-6 w-full px-2">
          <button className="w-12 h-12 bg-white text-[#00A090] rounded-xl flex items-center justify-center shadow-md transition-all">
            <LayoutGrid className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="w-12 h-12 text-white/70 hover:bg-white/10 hover:text-white rounded-xl flex items-center justify-center transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 text-white/70 hover:bg-white/10 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <BarChart2 className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 text-white/70 hover:bg-white/10 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <Book className="w-6 h-6" />
          </button>
        </nav>

        <div className="flex flex-col gap-4 w-full px-2 mt-auto">
          <button className="w-12 h-12 text-white/70 hover:bg-white/10 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <Settings className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 text-white/70 hover:bg-white/10 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-16 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 px-8 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-xl font-bold text-gray-900">Worklist</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search leads, ref nos..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-[#00A090] focus:ring-0 rounded-lg text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4 border-r border-gray-200 pr-6">
              <button className="relative text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="relative text-gray-500 hover:text-gray-700">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#00A090] rounded-full flex items-center justify-center text-white text-sm font-medium">
                RK
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">Rajesh Kumar</div>
                <div className="text-xs text-gray-500">QC Lead</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Filters & Content */}
        <main className="p-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-8rem)]">
            
            {/* Filter Bar */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 overflow-x-auto">
              <div className="flex items-center gap-2">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
                      activeFilter === filter
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {filter}
                    <span className={cn(
                      "ml-2 text-xs opacity-80",
                      activeFilter === filter ? "text-white" : "text-gray-500"
                    )}>
                      {filterCounts[filter] || 0}
                    </span>
                  </button>
                ))}
              </div>
              
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Advanced
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 w-[4%]">
                      <input type="checkbox" className="rounded border-gray-300 text-[#00A090] focus:ring-[#00A090] w-4 h-4" />
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                      Ref No / Reg No
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                      Vehicle
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[12%]">
                      Inspection Type
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[10%]">
                      Agency Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[10%]">
                      QC Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[12%]">
                      Flags
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[12%]">
                      SLA
                    </th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[5%] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLeads.map((lead) => {
                    const sla = getSLAStatus(lead.agingDays);
                    return (
                      <tr 
                        key={lead.refNo} 
                        className="hover:bg-gray-50/80 cursor-pointer transition-colors group"
                        onClick={() => navigate(`/lead/${lead.refNo}`)}
                      >
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-gray-300 text-[#00A090] focus:ring-[#00A090] w-4 h-4" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-[#00A090] text-sm mb-0.5">{lead.refNo}</div>
                          <div className="text-xs text-gray-500 font-medium">{lead.registrationNo}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 text-sm mb-0.5">{lead.vehicle.make}</div>
                          <div className="text-xs text-gray-500">
                            {lead.vehicle.model} / {lead.vehicle.fuel}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 text-sm mb-0.5 uppercase">{lead.reason}</div>
                          <div className="text-xs text-gray-500 uppercase">{lead.inspectionType}</div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill label={lead.agencyStatus} />
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill label={lead.qcStatus} />
                        </td>
                        <td className="px-6 py-4">
                          {lead.flags.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-medium text-gray-900">{lead.flags.length} blocking</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium",
                            sla.color
                          )}>
                            <Clock className={cn("w-3 h-3", sla.iconColor)} />
                            {lead.slaTime || `${lead.agingDays}d`} {sla.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredLeads.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">No leads found</h3>
                <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
