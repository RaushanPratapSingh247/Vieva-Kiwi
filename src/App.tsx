import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Worklist from './pages/Worklist';
import Workspace from './pages/Workspace';
import CreateLead from './pages/CreateLead';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Worklist />} />
        <Route path="/create" element={<CreateLead />} />
        <Route path="/lead/:refNo" element={<Workspace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
