import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Car, ClipboardCheck, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { cn } from '../lib/utils';

const STEPS = [
  { id: 1, title: 'Customer', description: 'Personal details', icon: User },
  { id: 2, title: 'Vehicle', description: 'Asset information', icon: Car },
  { id: 3, title: 'Inspection', description: 'Type & location', icon: ClipboardCheck },
];

export default function CreateLead() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    // Vehicle
    registrationNo: '',
    make: '',
    model: '',
    variant: '',
    fuelType: '',
    chassisNo: '',
    engineNo: '',
    odometer: '',
    // Inspection
    inspectionType: '',
    reason: '',
    city: '',
    pincode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(curr => curr + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(curr => curr - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting Lead:', formData);
    alert('Lead created successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Worklist
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="text-lg font-semibold text-gray-900">Create New Lead</h1>
          </div>
          <div className="text-sm text-gray-500">
            Step <span className="font-medium text-gray-900">{currentStep}</span> of {STEPS.length}
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Stepper */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <div 
                    key={step.id}
                    className={cn(
                      "group flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
                      isActive ? "bg-white shadow-sm border border-gray-200" : "hover:bg-gray-100/50"
                    )}
                  >
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-200",
                        isActive ? "bg-[#00A090] border-[#00A090] text-white shadow-md shadow-[#00A090]/20" :
                        isCompleted ? "bg-green-50 border-green-200 text-green-600" :
                        "bg-white border-gray-200 text-gray-400"
                      )}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-semibold transition-colors",
                        isActive ? "text-gray-900" : 
                        isCompleted ? "text-gray-700" : "text-gray-500"
                      )}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-[#00A090]" />}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px] flex flex-col">
              <div className="flex-1 p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentStep === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                          <p className="text-gray-500 mt-1">Enter the customer's personal information.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <Input 
                            label="First Name" 
                            name="firstName" 
                            placeholder="e.g. Amit" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            autoFocus
                          />
                          <Input 
                            label="Last Name" 
                            name="lastName" 
                            placeholder="e.g. Sharma" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Mobile Number" 
                            name="mobile" 
                            placeholder="+91 98765 43210" 
                            type="tel"
                            value={formData.mobile}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Email Address" 
                            name="email" 
                            placeholder="amit@example.com" 
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Asset Details</h2>
                          <p className="text-gray-500 mt-1">Provide details about the vehicle to be inspected.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                          <Input 
                            label="Registration Number" 
                            name="registrationNo" 
                            placeholder="MH-02-AB-1234" 
                            className="uppercase font-mono tracking-wide"
                            value={formData.registrationNo}
                            onChange={handleInputChange}
                            autoFocus
                          />
                          <Select 
                            label="Make" 
                            name="make" 
                            options={[
                              { value: 'Maruti', label: 'Maruti Suzuki' },
                              { value: 'Hyundai', label: 'Hyundai' },
                              { value: 'Tata', label: 'Tata Motors' },
                              { value: 'Honda', label: 'Honda' },
                              { value: 'Mahindra', label: 'Mahindra' },
                            ]}
                            value={formData.make}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Model" 
                            name="model" 
                            placeholder="e.g. Swift" 
                            value={formData.model}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Variant" 
                            name="variant" 
                            placeholder="e.g. ZXi Plus" 
                            value={formData.variant}
                            onChange={handleInputChange}
                          />
                          <Select 
                            label="Fuel Type" 
                            name="fuelType" 
                            options={[
                              { value: 'Petrol', label: 'Petrol' },
                              { value: 'Diesel', label: 'Diesel' },
                              { value: 'CNG', label: 'CNG' },
                              { value: 'Electric', label: 'Electric' },
                            ]}
                            value={formData.fuelType}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Odometer Reading" 
                            name="odometer" 
                            placeholder="e.g. 12500" 
                            type="number"
                            value={formData.odometer}
                            onChange={handleInputChange}
                          />
                          <div className="md:col-span-3 border-t border-gray-100 my-2"></div>
                          <Input 
                            label="Chassis / VIN Number" 
                            name="chassisNo" 
                            placeholder="Enter 17-digit VIN" 
                            className="uppercase font-mono tracking-wide md:col-span-2"
                            value={formData.chassisNo}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Engine Number" 
                            name="engineNo" 
                            placeholder="Enter Engine No" 
                            className="uppercase font-mono tracking-wide"
                            value={formData.engineNo}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Inspection Information</h2>
                          <p className="text-gray-500 mt-1">Select the type and location of the inspection.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                          <Select 
                            label="Inspection Type" 
                            name="inspectionType" 
                            options={[
                              { value: 'Self', label: 'Self Inspection (Customer App)' },
                              { value: 'External Agency', label: 'External Agency (Surveyor)' },
                            ]}
                            value={formData.inspectionType}
                            onChange={handleInputChange}
                            autoFocus
                          />
                          <Select 
                            label="Reason for Inspection" 
                            name="reason" 
                            options={[
                              { value: 'Break-in', label: 'Break-in (Policy Expired)' },
                              { value: 'Add-on', label: 'Add-on Cover' },
                              { value: 'Endorsement', label: 'Endorsement (Modification)' },
                              { value: 'PAYD', label: 'Pay As You Drive' },
                            ]}
                            value={formData.reason}
                            onChange={handleInputChange}
                          />
                          
                          <div className="md:col-span-2 border-t border-gray-100 my-2"></div>
                          
                          <Input 
                            label="City" 
                            name="city" 
                            placeholder="e.g. Mumbai" 
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                          <Input 
                            label="Pincode" 
                            name="pincode" 
                            placeholder="e.g. 400001" 
                            value={formData.pincode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="w-32"
                >
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={handleNext} className="w-32 shadow-lg shadow-[#00A090]/20">
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="w-40 shadow-lg shadow-[#00A090]/20">
                    Create Lead
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
