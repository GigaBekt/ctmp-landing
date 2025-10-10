// Mock data for vendor bids
// This file contains sample bid data for testing the VendorProjectDetail page
// In production, this data would be fetched from the API

export interface VendorBid {
  id: string;
  projectId: string;
  projectTitle: string;
  customerName: string;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  submittedAt: string;
  expiresAt: string;
  notes: string;
  breakdown: {
    labor: number;
    materials: number;
    equipment: number;
    other: number;
  };
}

export const mockVendorBids: VendorBid[] = [
  {
    id: "bid-001",
    projectId: "proj-001",
    projectTitle: "HVAC System Installation - 3 Bedroom Home",
    customerName: "John Smith",
    amount: 4500,
    status: "pending",
    submittedAt: "2024-01-15T10:30:00Z",
    expiresAt: "2024-01-22T23:59:59Z",
    notes:
      "Complete HVAC system installation including ductwork and thermostat. Premium Carrier unit with 10-year warranty included.",
    breakdown: {
      labor: 1800,
      materials: 2200,
      equipment: 400,
      other: 100,
    },
  },
  {
    id: "bid-002",
    projectId: "proj-002",
    projectTitle: "AC Unit Replacement",
    customerName: "Sarah Johnson",
    amount: 3200,
    status: "accepted",
    submittedAt: "2024-01-12T14:20:00Z",
    expiresAt: "2024-01-19T23:59:59Z",
    notes:
      "Replace existing 3-ton AC unit with new energy-efficient model. Includes removal of old unit and installation of new unit.",
    breakdown: {
      labor: 1200,
      materials: 1700,
      equipment: 250,
      other: 50,
    },
  },
  {
    id: "bid-003",
    projectId: "proj-003",
    projectTitle: "Heating System Repair",
    customerName: "Michael Davis",
    amount: 850,
    status: "rejected",
    submittedAt: "2024-01-10T09:15:00Z",
    expiresAt: "2024-01-17T23:59:59Z",
    notes:
      "Diagnose and repair heating system. Replace faulty thermostat and clean ductwork.",
    breakdown: {
      labor: 400,
      materials: 350,
      equipment: 80,
      other: 20,
    },
  },
  {
    id: "bid-004",
    projectId: "proj-004",
    projectTitle: "Ductwork Installation - New Construction",
    customerName: "Emily Wilson",
    amount: 6800,
    status: "pending",
    submittedAt: "2024-01-14T16:45:00Z",
    expiresAt: "2024-01-21T23:59:59Z",
    notes:
      "Complete ductwork installation for new 2-story home. Includes design, materials, and installation of all ducts and vents.",
    breakdown: {
      labor: 2800,
      materials: 3400,
      equipment: 500,
      other: 100,
    },
  },
  {
    id: "bid-005",
    projectId: "proj-005",
    projectTitle: "Furnace Maintenance and Tune-up",
    customerName: "Robert Brown",
    amount: 450,
    status: "pending",
    submittedAt: "2024-01-16T11:00:00Z",
    expiresAt: "2024-01-23T23:59:59Z",
    notes:
      "Annual furnace maintenance including cleaning, inspection, and tune-up. Replace filters and test all safety features.",
    breakdown: {
      labor: 250,
      materials: 150,
      equipment: 30,
      other: 20,
    },
  },
  {
    id: "bid-006",
    projectId: "proj-006",
    projectTitle: "Mini-Split AC System Installation",
    customerName: "Lisa Anderson",
    amount: 3900,
    status: "pending",
    submittedAt: "2024-01-13T13:30:00Z",
    expiresAt: "2024-01-20T23:59:59Z",
    notes:
      "Install 3-zone mini-split AC system for converted garage and two bedrooms. Includes all indoor and outdoor units.",
    breakdown: {
      labor: 1600,
      materials: 2000,
      equipment: 250,
      other: 50,
    },
  },
];
