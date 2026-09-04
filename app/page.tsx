'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SegmentedControl from '../components/SegmentedControl';
import CataloguePage from '../components/CataloguePage';
import CustomDesign from '../components/CustomDesign';

export default function Home() {
  const [mode, setMode] = useState<'custom' | 'catalogue'>('custom');

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-[116px]">
        <main className="min-h-screen bg-[#EFF2F3] pb-16">
          <div className="max-w-[1180px] mx-auto px-8 pt-8">
            <div className="flex justify-center">
              <SegmentedControl mode={mode} onChange={setMode} count={6} />
            </div>
            {mode === 'custom' ? <CustomDesign /> : <CataloguePage />}
          </div>
        </main>
      </div>
    </div>
  );
}