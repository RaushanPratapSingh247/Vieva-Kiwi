export type Severity = 'blocking' | 'advisory' | 'info';

export interface Flag {
  id: string;
  label: string;
  severity: Severity;
  createdAt?: string;
  hint?: string;
}

export interface Vehicle {
  type: string;
  make: string;
  model: string;
  variant: string;
  fuel: string;
  chassisNo: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
}

export interface Location {
  city: string;
  pincode: string;
  state: string;
  address: string;
}

export interface AssemblyPart {
  id: string;
  name: string; // e.g., "Front Bumper", "Bonnet"
  condition: 'Safe' | 'Dent' | 'Scratch' | 'Broken' | 'Missing' | 'Rusted' | 'Heavy Damage' | 'Intact' | 'Chip';
  recommendation: 'Repair' | 'Replace' | 'None';
  severity?: 'Minor' | 'Medium' | 'Major';
  remarks?: string;
  confidenceScore: number; // 0-100
  imageUrl?: string; // Specific crop or image for this part
}

export interface InspectionReport {
  leadRefNo: string;
  odometerReading: number;
  vinReading: string;
  overallScore: number; // 0-10
  parts: AssemblyPart[];
  generatedAt: string;
}

export interface Lead {
  refNo: string;
  leadNumber: string;
  registrationNo: string;
  vehicle: Vehicle;
  customer: Customer;
  inspectionType: 'Self' | 'External Agency';
  reason: 'Break-in' | 'Add-on' | 'Endorsement' | 'PAYD';
  sourcing: 'Producer' | 'Direct Customer';
  vaahanFlag: 'OK' | 'FAIL';
  location: Location;
  agencyStatus: 'Uploaded' | 'Submitted for QC' | 'Re-inspection needed';
  qcStatus: 'QC pending' | 'QC in progress' | 'Approved' | 'Rejected';
  qcOwner: string; // "Unassigned" or name
  flags: Flag[];
  lastUpdate: string;
  agingDays: number;
  slaTime?: string;
  createdAt: string;
  premium: {
    od: number;
    tp: number;
  };
  inspectionReport?: InspectionReport; // Optional link to report
}

export interface Evidence {
  id: string;
  refNo: string; // Link to Lead
  type: 'photo' | 'video' | 'document' | 'archive';
  category: string; // e.g., 'vehicle_front', 'chassis_number'
  url: string;
  thumbnail?: string;
  uploadedBy: string;
  uploadedAt: string;
  sizeBytes: number;
  metadata?: {
    width?: number;
    height?: number;
    format?: string;
    duration?: number;
    exif?: {
      gps?: { lat: number; lng: number };
      timestamp?: string;
    };
  };
}

export interface ChecklistItem {
  key: string;
  title: string;
  guidance: string;
  state: 'pass' | 'fail' | 'need_info' | null;
  note?: string;
}

export type Decision = 'Approve' | 'Reject' | 'ReInspection Needed' | 'Additional Query' | null;
