import { Lead, Evidence } from '../types';

export const MOCK_LEADS: Lead[] = [
  {
    refNo: "REF-2026-001234",
    leadNumber: "LEAD-VV-567890",
    registrationNo: "MH-12-AB-5678",
    vehicle: {
      type: "PC",
      make: "Honda",
      model: "City",
      variant: "VX",
      fuel: "Petrol",
      chassisNo: "MA3EJEB1S00123456"
    },
    customer: {
      firstName: "Amit",
      lastName: "Sharma",
      mobile: "+919876543210",
      email: "amit.sharma@example.com"
    },
    inspectionType: "External Agency",
    reason: "Break-in",
    sourcing: "Producer",
    vaahanFlag: "OK",
    location: {
      city: "Mumbai",
      pincode: "400001",
      state: "Maharashtra",
      address: "123 Marine Drive, Mumbai"
    },
    agencyStatus: "Submitted for QC",
    qcStatus: "QC pending",
    qcOwner: "Amit Sharma",
    flags: [
      {
        id: "flag-001",
        label: "RC not verified",
        severity: "blocking",
        createdAt: "2026-02-23T14:30:00Z",
        hint: "RC hard copy not provided; Vahan data failed"
      },
      {
        id: "flag-002",
        label: "Basement/low light",
        severity: "advisory",
        createdAt: "2026-02-23T14:30:00Z",
        hint: "Vehicle in basement or bad lighting"
      }
    ],
    lastUpdate: "2026-02-23T10:15:00Z",
    agingDays: 2,
    slaTime: "2h 13m",
    createdAt: "2026-02-21T09:00:00Z",
    premium: {
      od: 12000,
      tp: 3500
    },
    inspectionReport: {
      leadRefNo: "REF-2026-001234",
      odometerReading: 45230,
      vinReading: "MA3EJEB1S00123456",
      overallScore: 8.5,
      generatedAt: "2026-02-22T17:00:00Z",
      parts: [
        {
          id: "part-001",
          name: "Front Bumper",
          condition: "Scratch",
          recommendation: "Repair",
          severity: "Minor",
          remarks: "Minor scratches on left corner",
          confidenceScore: 92,
          imageUrl: "https://picsum.photos/seed/bumper/200/150"
        },
        {
          id: "part-002",
          name: "Bonnet",
          condition: "Safe",
          recommendation: "None",
          confidenceScore: 98
        },
        {
          id: "part-003",
          name: "Left Fender",
          condition: "Dent",
          recommendation: "Repair",
          severity: "Medium",
          remarks: "Deep dent visible",
          confidenceScore: 88
        },
        {
          id: "part-004",
          name: "Right Headlight",
          condition: "Broken",
          recommendation: "Replace",
          severity: "Major",
          remarks: "Cracked lens",
          confidenceScore: 95
        },
        {
          id: "part-005",
          name: "Windshield",
          condition: "Safe",
          recommendation: "None",
          confidenceScore: 99
        }
      ]
    }
  },
  {
    refNo: "REF-2026-001235",
    leadNumber: "LEAD-VV-567891",
    registrationNo: "DL-01-XY-9999",
    vehicle: {
      type: "PC",
      make: "Maruti",
      model: "Swift",
      variant: "ZXi",
      fuel: "Petrol",
      chassisNo: "MA3EJEB1S00999999"
    },
    customer: {
      firstName: "Priya",
      lastName: "Mehta",
      mobile: "+919876543211",
      email: "priya.m@example.com"
    },
    inspectionType: "Self",
    reason: "Endorsement",
    sourcing: "Direct Customer",
    vaahanFlag: "OK",
    location: {
      city: "Delhi",
      pincode: "110001",
      state: "Delhi",
      address: "45 Connaught Place"
    },
    agencyStatus: "Uploaded",
    qcStatus: "QC pending",
    qcOwner: "Unassigned",
    flags: [],
    lastUpdate: "2026-02-24T09:00:00Z",
    agingDays: 0,
    slaTime: "45m",
    createdAt: "2026-02-24T09:00:00Z",
    premium: {
      od: 8000,
      tp: 2000
    }
  },
  {
    refNo: "REF-2026-001236",
    leadNumber: "LEAD-VV-567892",
    registrationNo: "KA-05-ZZ-1234",
    vehicle: {
      type: "PC",
      make: "Hyundai",
      model: "Creta",
      variant: "SX",
      fuel: "Diesel",
      chassisNo: "MA3EJEB1S00888888"
    },
    customer: {
      firstName: "Rahul",
      lastName: "Verma",
      mobile: "+919876543212",
      email: "rahul.v@example.com"
    },
    inspectionType: "External Agency",
    reason: "Break-in",
    sourcing: "Producer",
    vaahanFlag: "FAIL",
    location: {
      city: "Bangalore",
      pincode: "560001",
      state: "Karnataka",
      address: "MG Road"
    },
    agencyStatus: "Re-inspection needed",
    qcStatus: "Rejected",
    qcOwner: "Amit Sharma",
    flags: [
      {
        id: "flag-003",
        label: "Chassis not clear",
        severity: "blocking",
        hint: "Chassis number not captured clearly"
      }
    ],
    lastUpdate: "2026-02-20T10:00:00Z",
    agingDays: 5,
    slaTime: "5d 2h",
    createdAt: "2026-02-19T09:00:00Z",
    premium: {
      od: 15000,
      tp: 4000
    }
  },
  {
    refNo: "REF-2026-001237",
    leadNumber: "LEAD-VV-567893",
    registrationNo: "MH-02-CD-4567",
    vehicle: {
      type: "PC",
      make: "Tata",
      model: "Nexon",
      variant: "XZ",
      fuel: "Petrol",
      chassisNo: "MA3EJEB1S00777777"
    },
    customer: {
      firstName: "Suresh",
      lastName: "Patil",
      mobile: "+919876543213",
      email: "suresh.p@example.com"
    },
    inspectionType: "External Agency",
    reason: "PAYD",
    sourcing: "Producer",
    vaahanFlag: "OK",
    location: {
      city: "Mumbai",
      pincode: "400050",
      state: "Maharashtra",
      address: "Bandra West"
    },
    agencyStatus: "Submitted for QC",
    qcStatus: "QC in progress",
    qcOwner: "Priya Mehta",
    flags: [
      {
        id: "flag-004",
        label: "Engine warning light",
        severity: "advisory",
        hint: "Engine warning light visible in cluster"
      }
    ],
    lastUpdate: "2026-02-24T14:00:00Z",
    agingDays: 1,
    slaTime: "1d 4h",
    createdAt: "2026-02-23T12:00:00Z",
    premium: {
      od: 11000,
      tp: 3000
    }
  }
];

export const MOCK_EVIDENCE: Evidence[] = [
  {
    id: "ev-001",
    refNo: "REF-2026-001234",
    type: "photo",
    category: "vehicle_front",
    url: "https://picsum.photos/seed/car1/800/600",
    thumbnail: "https://picsum.photos/seed/car1/200/150",
    uploadedBy: "agency_user_123",
    uploadedAt: "2026-02-22T16:45:00Z",
    sizeBytes: 2457600,
    metadata: {
      width: 1920,
      height: 1080,
      format: "JPEG"
    }
  },
  {
    id: "ev-002",
    refNo: "REF-2026-001234",
    type: "photo",
    category: "vehicle_rear",
    url: "https://picsum.photos/seed/car2/800/600",
    thumbnail: "https://picsum.photos/seed/car2/200/150",
    uploadedBy: "agency_user_123",
    uploadedAt: "2026-02-22T16:46:00Z",
    sizeBytes: 2100000
  },
  {
    id: "ev-003",
    refNo: "REF-2026-001234",
    type: "photo",
    category: "chassis_number",
    url: "https://picsum.photos/seed/chassis/800/600",
    thumbnail: "https://picsum.photos/seed/chassis/200/150",
    uploadedBy: "agency_user_123",
    uploadedAt: "2026-02-22T16:47:00Z",
    sizeBytes: 1800000
  },
  {
    id: "ev-004",
    refNo: "REF-2026-001234",
    type: "photo",
    category: "odometer",
    url: "https://picsum.photos/seed/odo/800/600",
    thumbnail: "https://picsum.photos/seed/odo/200/150",
    uploadedBy: "agency_user_123",
    uploadedAt: "2026-02-22T16:48:00Z",
    sizeBytes: 1500000
  },
  {
    id: "ev-005",
    refNo: "REF-2026-001234",
    type: "video",
    category: "walkaround",
    url: "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video
    thumbnail: "https://picsum.photos/seed/video/200/150",
    uploadedBy: "agency_user_123",
    uploadedAt: "2026-02-22T16:50:00Z",
    sizeBytes: 15000000
  }
];
