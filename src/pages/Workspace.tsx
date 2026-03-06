import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Check, AlertCircle, Clock, FileText, Image as ImageIcon, Video, Plus, Search } from 'lucide-react';
import { MOCK_LEADS, MOCK_EVIDENCE } from '../data/mockData';
import { StatusPill } from '../components/ui/StatusPill';
import { FlagPill } from '../components/ui/FlagPill';
import { Button } from '../components/ui/Button';
import { Lead, Evidence, ChecklistItem, Decision } from '../types';
import { cn } from '../lib/utils';

export default function Workspace() {
  const { refNo } = useParams<{ refNo: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState<'Photos' | 'Videos' | 'Docs'>('Photos');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [decision, setDecision] = useState<Decision>(null);
  const [remarks, setRemarks] = useState('');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { key: 'break_in', title: 'Vehicle Swop', guidance: 'Walkaround + RPM/Odo + Damage closeups', state: null },
    { key: 'rc_verified', title: 'ODO Meter Reading Match', guidance: 'Check RC hard copy or Vahan data', state: null },
    { key: 'chassis_match', title: 'Chassis/VIN clear and matching', guidance: 'Must match RC and Lead details', state: null },
  ]);

  const [activeRightTab, setActiveRightTab] = useState<'Guidelines' | 'Assembly'>('Guidelines');
  const [assemblySearch, setAssemblySearch] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);

  const PI_GUIDELINES = [
    "More than 4 panels damaged",
    "AC not working",
    "RC book not verified",
    "No number plate",
    "Reg No differ with the Inspection Lead details raised",
    "CNG inspection + 3 panels damaged",
    "CNG/LPG not endorsed in RC",
    "WS glass broken/scar/chipped off/crack",
    "Chassis No. not matching with RC",
    "Chassis No. not available in Pvt Car if covered by mat",
    "Chassis number not captured clearly in photos/video",
    "Chassis Assy major rusting",
    "Chassis No. repunched",
    "Vehicle is under repair in garage",
    "Vehicle is not in running condition or key is not available",
    "Client not cooperating & refuses to sign the declaration report",
    "3W Auto Rickshaw- Pax carrying - WS Glass Broken",
    "3W Loader - WS Glass - Scar",
    "Vehicle of Political Person or having Political Flag",
    "Vehicle of police/advocate",
    "Vehicle in seized condition/police custody",
    "Vehicle owned/on contract duty by govt. entity",
    "Pvt. Cars with plate/sticker reading 'Govt. of India'/'State govt.'",
    "Pvt. Cars with plate/sticker that specifies the designation in addition to 'Govt. of India'/'State Government'(like Sarpanch, MP/MLA, Collector)",
    "Vehicles with engine warning/ABS/SRS light is on",
    "Vehicles where stepney is not fitted",
    "Replacement of one panel",
    "Damage to Head Lamp",
    "Bumper repaired/Bracket Broken or repaired",
    "Damage to rear window",
    "Panels rusted/Nor repairable",
    "Damage to condensor/radiator",
    "Side view Mirrors Broken/cracked",
    "Upto 5 scratches/dents including bumpers",
    "Body paint peel off/fade off in more than one panel",
    "Vehicle in basement/Bad light",
    "Engine not working",
    "LPG Kit with domestic cylinder",
    "Hazardous Goods Carrying Vehicle"
  ];

  useEffect(() => {
    // Simulate API fetch
    const foundLead = MOCK_LEADS.find(l => l.refNo === refNo);
    if (foundLead) {
      setLead(foundLead);
      setEvidenceList(MOCK_EVIDENCE.filter(ev => ev.refNo === foundLead.refNo));
      
      // Dynamic checklist based on reason
      const initialChecklist: ChecklistItem[] = [
        { key: 'rc_verified', title: 'ODO Meter Reading Match', guidance: 'Check RC hard copy or Vahan data', state: null },
        { key: 'chassis_match', title: 'Chassis/VIN clear and matching', guidance: 'Must match RC and Lead details', state: null },
      ];

      if (foundLead.reason === 'Break-in') {
        initialChecklist.unshift({ key: 'break_in', title: 'Vehicle Swop', guidance: 'Walkaround + RPM/Odo + Damage closeups', state: null });
      }
      if (foundLead.reason === 'Endorsement') {
        initialChecklist.push({ key: 'accessories', title: 'Accessories covered', guidance: 'Video of accessories to be covered', state: null });
      }

      setChecklist(initialChecklist);
    }
  }, [refNo]);

  useEffect(() => {
    setZoomLevel(1);
  }, [selectedEvidence]);

  if (!lead) return <div className="p-8">Loading...</div>;

  const filteredEvidence = evidenceList.filter(ev => {
    if (activeTab === 'Photos') return ev.type === 'photo';
    if (activeTab === 'Videos') return ev.type === 'video';
    if (activeTab === 'Docs') return ev.type === 'document';
    return true;
  });

  const handleChecklistChange = (key: string, state: ChecklistItem['state']) => {
    setChecklist(prev => prev.map(item => item.key === key ? { ...item, state } : item));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedEvidence) return;
    const currentIndex = filteredEvidence.findIndex(ev => ev.id === selectedEvidence.id);
    if (currentIndex < filteredEvidence.length - 1) {
      setSelectedEvidence(filteredEvidence[currentIndex + 1]);
    } else {
      setSelectedEvidence(filteredEvidence[0]); // Loop to start
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedEvidence) return;
    const currentIndex = filteredEvidence.findIndex(ev => ev.id === selectedEvidence.id);
    if (currentIndex > 0) {
      setSelectedEvidence(filteredEvidence[currentIndex - 1]);
    } else {
      setSelectedEvidence(filteredEvidence[filteredEvidence.length - 1]); // Loop to end
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newEvidence: Evidence[] = Array.from(e.dataTransfer.files).map((file, index) => {
        const type = file.type.startsWith('image/') ? 'photo' : 
                     file.type.startsWith('video/') ? 'video' : 'document';
        
        return {
          id: `new-ev-${Date.now()}-${index}`,
          refNo: lead!.refNo,
          type,
          category: 'uploaded_file',
          url: URL.createObjectURL(file),
          thumbnail: type === 'photo' ? URL.createObjectURL(file) : undefined,
          uploadedBy: 'current_user',
          uploadedAt: new Date().toISOString(),
          sizeBytes: file.size,
          metadata: {
            format: file.type.split('/')[1].toUpperCase()
          }
        };
      });
      
      setEvidenceList(prev => [...prev, ...newEvidence]);
      
      // Auto-switch tab to match uploaded file type if needed
      if (newEvidence.length > 0) {
        const firstType = newEvidence[0].type;
        if (firstType === 'photo') setActiveTab('Photos');
        else if (firstType === 'video') setActiveTab('Videos');
        else setActiveTab('Docs');
      }
    }
  };

  const handleSubmit = () => {
    if (!decision) return;
    if (decision !== 'Approve' && !remarks) {
      alert('Remarks are mandatory for rejection or queries.');
      return;
    }
    alert(`Decision ${decision} submitted successfully!`);
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col bg-[#F6F7FB] overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-lg font-bold text-gray-900">QC Workspace</h1>
          </div>
          <div className="flex items-center gap-2">
             <div className="text-sm text-gray-500">QC Owner:</div>
             <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{lead.qcOwner}</div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill label={lead.agencyStatus} tone="info" />
          <StatusPill label={lead.qcStatus} tone="warning" />
          <div className="h-4 w-px bg-gray-300 mx-2"></div>
          <span className="font-mono font-bold text-gray-900">{lead.refNo}</span>
          <span className="text-gray-400">•</span>
          <span className="font-mono text-gray-600">{lead.registrationNo}</span>
          <span className="text-gray-400">•</span>
          <span className="font-medium text-gray-900">{lead.vehicle.make} {lead.vehicle.model}</span>
          <span className="text-gray-500 text-sm">({lead.vehicle.fuel})</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{lead.inspectionType}</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{lead.reason}</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Viewer + Evidence Strip */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-900">
          
          {/* Top: Main View / Lightbox */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gray-900/50">
            {selectedEvidence ? (
              <>
                {selectedEvidence.type === 'photo' ? (
                  <div className="w-full h-full flex items-center justify-center overflow-auto">
                    <img 
                      src={selectedEvidence.url} 
                      alt={selectedEvidence.category} 
                      className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-200 ease-out"
                      style={{ transform: `scale(${zoomLevel})` }}
                    />
                  </div>
                ) : (
                  <video 
                    src={selectedEvidence.url} 
                    controls 
                    className="max-w-full max-h-full shadow-2xl"
                  />
                )}
                
                {/* Lightbox Controls */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <Button variant="secondary" size="sm" onClick={handleZoomIn} disabled={!selectedEvidence || selectedEvidence.type !== 'photo'}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleZoomOut} disabled={!selectedEvidence || selectedEvidence.type !== 'photo'}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => window.open(selectedEvidence.url, '_blank')}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedEvidence(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Navigation Arrows */}
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm z-10 border border-white/10">
                  {selectedEvidence.category} • {new Date(selectedEvidence.uploadedAt).toLocaleString()}
                </div>
              </>
            ) : (
              <div className="text-gray-500 flex flex-col items-center">
                <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">Select evidence to view</p>
                <p className="text-sm opacity-60">Choose from the gallery below</p>
              </div>
            )}
          </div>

          {/* Bottom: Evidence Strip */}
          <div 
            className={cn(
              "h-48 bg-white border-t border-gray-800 flex flex-col shrink-0 z-20 transition-colors",
              isDragging ? "bg-teal-50 border-teal-500 border-t-2" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-teal-50/90 z-50 flex items-center justify-center border-2 border-dashed border-[#00A090] m-2 rounded-xl pointer-events-none">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00A090]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-[#00A090]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#00A090]">Drop files to upload</h3>
                  <p className="text-sm text-gray-500">Photos, Videos, or Documents</p>
                </div>
              </div>
            )}
            <div className="flex items-center px-4 border-b border-gray-200 bg-white">
              {['Photos', 'Videos', 'Docs'].map(tab => (
                <button
                  key={tab}
                  className={cn(
                    "px-4 py-3 text-xs font-medium border-b-2 transition-colors relative",
                    activeTab === tab 
                      ? "border-[#00A090] text-[#00A090]" 
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab}
                  <span className="ml-2 text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600">
                    {evidenceList.filter(e => 
                      (tab === 'Photos' ? e.type === 'photo' : tab === 'Videos' ? e.type === 'video' : e.type === 'document')
                    ).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-x-auto p-4 flex gap-3 items-center bg-gray-50">
              {filteredEvidence.map(ev => (
                <div 
                  key={ev.id} 
                  className={cn(
                    "group relative h-28 aspect-video bg-white rounded-lg overflow-hidden border cursor-pointer shrink-0 transition-all shadow-sm",
                    selectedEvidence?.id === ev.id 
                      ? "border-[#00A090] ring-2 ring-[#00A090]/10 scale-105 z-10" 
                      : "border-gray-200 hover:border-[#00A090] hover:shadow-md"
                  )}
                  onClick={() => setSelectedEvidence(ev)}
                >
                  {ev.type === 'photo' ? (
                    <img src={ev.thumbnail || ev.url} alt={ev.category} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <Video className="w-8 h-8 text-white/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] px-2 py-1 pt-4 truncate font-medium">
                    {ev.category}
                  </div>
                </div>
              ))}
              
              {/* Upload Widget Stub */}
              <div className="h-28 aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center hover:border-[#00A090] hover:bg-teal-50 transition-all cursor-pointer shrink-0 bg-white group">
                <div className="p-2 bg-gray-50 rounded-full mb-2 group-hover:bg-white group-hover:shadow-sm transition-all">
                   <Plus className="w-4 h-4 text-gray-400 group-hover:text-[#00A090]" />
                </div>
                <div className="text-[10px] text-gray-500 font-medium group-hover:text-[#00A090]">Upload</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Decision & Checks */}
        <div className="w-[450px] bg-white border-l border-gray-200 flex flex-col shrink-0">
          
          {/* Right Panel Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={cn(
                "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                activeRightTab === 'Guidelines' ? "border-[#00A090] text-[#00A090]" : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveRightTab('Guidelines')}
            >
              Guidelines Checks
            </button>
            <button
              className={cn(
                "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
                activeRightTab === 'Assembly' ? "border-[#00A090] text-[#00A090]" : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveRightTab('Assembly')}
            >
              Inspekt Labs Report
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeRightTab === 'Guidelines' ? (
              <>
                {/* Flags Section */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Kiwi Flags</h3>
                  {lead.flags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {lead.flags.map(flag => (
                        <FlagPill key={flag.id} flag={flag} className="text-sm py-1.5 px-3" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">No system flags detected.</div>
                  )}
                  
                  {lead.flags.some(f => f.severity === 'blocking') && (
                     <div className="mt-3 text-xs text-red-600 font-medium flex items-center bg-red-50 p-2 rounded">
                       <AlertCircle className="w-3 h-3 mr-1.5" />
                       Blocking flags present. Proceed with caution.
                     </div>
                  )}
                </div>

                {/* Odometer & VIN Stats */}
                {lead.inspectionReport && (
                  <div className="p-6 border-b border-gray-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Odometer</div>
                        <div className="text-lg font-mono font-bold text-gray-900">{lead.inspectionReport.odometerReading.toLocaleString()} km</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">VIN / Chassis</div>
                        <div className="text-sm font-mono font-bold text-gray-900 break-all">{lead.inspectionReport.vinReading}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guidelines Checklist */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Guidelines Checks</h3>
                  <div className="space-y-6">
                    {checklist.map(item => (
                      <div key={item.key}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-900 text-sm">{item.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{item.guidance}</p>
                        <div className="flex gap-2">
                          <button
                            className={cn(
                              "flex-1 py-1.5 text-xs font-medium rounded border transition-colors",
                              item.state === 'pass' 
                                ? "bg-green-100 border-green-200 text-green-800" 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                            onClick={() => handleChecklistChange(item.key, 'pass')}
                          >
                            Pass
                          </button>
                          <button
                            className={cn(
                              "flex-1 py-1.5 text-xs font-medium rounded border transition-colors",
                              item.state === 'fail' 
                                ? "bg-red-100 border-red-200 text-red-800" 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                            onClick={() => handleChecklistChange(item.key, 'fail')}
                          >
                            Fail
                          </button>
                          <button
                            className={cn(
                              "flex-1 py-1.5 text-xs font-medium rounded border transition-colors",
                              item.state === 'need_info' 
                                ? "bg-blue-100 border-blue-200 text-blue-800" 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                            onClick={() => handleChecklistChange(item.key, 'need_info')}
                          >
                            Need Info
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col h-full bg-gray-50">
                {lead.inspectionReport ? (
                  <>
                    <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search assembly parts..." 
                          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A090] focus:bg-white transition-all"
                          value={assemblySearch}
                          onChange={(e) => setAssemblySearch(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {lead.inspectionReport.parts
                        .filter(part => part.name.toLowerCase().includes(assemblySearch.toLowerCase()))
                        .map(part => (
                          <div key={part.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#00A090] transition-colors shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium text-gray-900 text-sm">{part.name}</div>
                              <div className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                {part.confidenceScore}% AI
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <select
                                  className={cn(
                                    "w-full text-xs font-medium px-2 py-1.5 rounded border focus:outline-none focus:ring-1 focus:ring-[#00A090] appearance-none cursor-pointer",
                                    part.condition === 'Safe' || part.condition === 'Intact' ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" :
                                    part.condition === 'Missing' ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200" :
                                    "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                  )}
                                  value={part.condition}
                                  onChange={(e) => {
                                    if (!lead.inspectionReport) return;
                                    const newCondition = e.target.value as any;
                                    const updatedParts = lead.inspectionReport.parts.map(p => 
                                      p.id === part.id ? { ...p, condition: newCondition } : p
                                    );
                                    setLead({
                                      ...lead,
                                      inspectionReport: {
                                        ...lead.inspectionReport,
                                        parts: updatedParts
                                      }
                                    });
                                  }}
                                >
                                  <option value="Safe">Safe</option>
                                  <option value="Intact">Intact</option>
                                  <option value="Scratch">Scratch</option>
                                  <option value="Dent">Dent</option>
                                  <option value="Broken">Broken</option>
                                  <option value="Rusted">Rusted</option>
                                  <option value="Heavy Damage">Heavy Damage</option>
                                  <option value="Chip">Chip</option>
                                  <option value="Missing">Missing</option>
                                </select>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                <span className="text-[10px] text-gray-400 mb-0.5">Recommendation</span>
                                <div className="flex items-center gap-1.5">
                                  <span className={cn(
                                    "text-xs font-medium",
                                    part.recommendation === 'None' ? "text-gray-600" : "text-amber-600"
                                  )}>
                                    {part.recommendation}
                                  </span>
                                  {part.severity && (
                                    <span className={cn(
                                      "text-[10px] px-1.5 py-0.5 rounded font-medium border",
                                      part.severity === 'Minor' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                      part.severity === 'Medium' ? "bg-orange-50 text-orange-700 border-orange-200" :
                                      "bg-red-50 text-red-700 border-red-200"
                                    )}>
                                      {part.severity}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {lead.inspectionReport.parts.filter(part => part.name.toLowerCase().includes(assemblySearch.toLowerCase())).length === 0 && (
                          <div className="text-center py-8 text-gray-400 text-sm">
                            No parts found matching "{assemblySearch}"
                          </div>
                        )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6">
                    <FileText className="w-12 h-12 mb-3 text-gray-300" />
                    <p>No Inspekt Labs report available.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Decision Footer */}
          {activeRightTab === 'Guidelines' && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Decision</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  className={cn(
                    "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                    decision === 'Approve' 
                      ? "bg-green-600 text-white border-green-600 shadow-md" 
                      : "bg-white border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600"
                  )}
                  onClick={() => setDecision('Approve')}
                >
                  Approve
                </button>
                <button
                  className={cn(
                    "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                    decision === 'Reject' 
                      ? "bg-red-600 text-white border-red-600 shadow-md" 
                      : "bg-white border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                  )}
                  onClick={() => setDecision('Reject')}
                >
                  Reject
                </button>
                <button
                  className={cn(
                    "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                    decision === 'ReInspection Needed' 
                      ? "bg-orange-500 text-white border-orange-500 shadow-md" 
                      : "bg-white border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600"
                  )}
                  onClick={() => setDecision('ReInspection Needed')}
                >
                  Re-Inspect
                </button>
                <button
                  className={cn(
                    "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                    decision === 'Additional Query' 
                      ? "bg-blue-500 text-white border-blue-500 shadow-md" 
                      : "bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                  )}
                  onClick={() => setDecision('Additional Query')}
                >
                  Query
                </button>
              </div>

              {decision && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {decision === 'Approve' ? 'Reason' : 'QC Remarks'} <span className="text-red-500">*</span>
                  </label>
                  
                  {decision === 'Reject' && (
                    <div className="mb-2">
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00A090] text-gray-700"
                        onChange={(e) => {
                          if (e.target.value) {
                            setRemarks(prev => prev ? `${prev}\n${e.target.value}` : e.target.value);
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a reason from PI Guidelines (Optional)</option>
                        {PI_GUIDELINES.map((guideline, index) => (
                          <option key={index} value={guideline}>{guideline}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00A090]"
                    rows={3}
                    placeholder={decision === 'Approve' ? "Enter approval reason..." : "Enter reason for decision..."}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              )}

              <Button 
                className="w-full" 
                disabled={!decision || !remarks}
                onClick={handleSubmit}
              >
                Submit Decision
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
