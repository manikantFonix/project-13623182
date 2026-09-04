'use client';

import { useState } from 'react';
import DesignTiles from './DesignTiles';
import DesignDescription from './DesignDescription';
import DesignLibrary, { type LibraryState } from './DesignLibrary';
import CustomStateControl, { type CustomState } from './CustomStateControl';
import PlaceholderPanel from './PlaceholderPanel';

const SAMPLE_DESC =
  'A one-off rose gold solitaire, six-prong setting, featuring a 1.2ct round brilliant. The customer asked for a slightly tapered band and no engraving.';

const attachments = [
  { id: 'a1', name: 'reference-scan.png', thumb: 'https://readdy.ai/api/search-image?query=close%20up%20jewellery%20sketch%20drawing%20of%20a%20ring%20on%20plain%20white%20paper%2C%20simple%20pencil%20line%20art%2C%20minimal&width=40&height=40&seq=41&orientation=squarish' },
  { id: 'a2', name: 'stone-photo.jpg', thumb: 'https://readdy.ai/api/search-image?query=macro%20photograph%20of%20a%20single%20round%20cut%20gemstone%20on%20a%20plain%20white%20background%2C%20soft%20even%20lighting&width=40&height=40&seq=42&orientation=squarish' },
];

export default function CustomDesign() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [more, setMore] = useState(false);
  const [attachmentsList, setAttachmentsList] = useState<typeof attachments>([]);
  const [generating, setGenerating] = useState(false);
  const [libraryState, setLibraryState] = useState<LibraryState>('ready');
  const [panel, setPanel] = useState<string | null>(null);
  const [demoState, setDemoState] = useState<CustomState>('default');

  const applyDemo = (s: CustomState) => {
    setDemoState(s);
    setMore(s === 'more-expanded');
    setGenerating(s === 'generating');
    setAttachmentsList(s === 'attachment' ? attachments : []);
    setLibraryState(
      s === 'library-empty'
        ? 'empty'
        : s === 'library-loading'
          ? 'loading'
          : s === 'library-error'
            ? 'error'
            : 'ready'
    );
    if (s === 'default') {
      setSelectedType(null);
      setDescription('');
    } else {
      if (s === 'type-selected') {
        setSelectedType('ring');
        setDescription('');
      } else {
        setSelectedType('ring');
        setDescription(SAMPLE_DESC);
      }
    }
  };

  const typeSelected = selectedType !== null;
  const descriptionEntered = description.trim() !== '';
  const canGenerate = typeSelected && descriptionEntered && !generating;
  const disabledReason = !typeSelected
    ? 'Choose a jewellery type to continue.'
    : !descriptionEntered
      ? 'Describe the piece to continue.'
      : null;

  const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAttachmentsList((cur) => [
          ...cur,
          { id: `a${Date.now()}`, name: file.name, thumb: attachments[0].thumb },
        ]);
      }
    };
    input.click();
  };

  return (
    <div className="mt-8">
      <section>
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-[15px] font-semibold text-[#131A1F]">Jewellery type</h2>
          <span className="text-[13px] text-[#5C6870]">Required</span>
        </div>
        <div className="mt-3">
          <DesignTiles
            selected={selectedType}
            onSelect={(id) => {
              setSelectedType((cur) => (cur === id ? null : id));
            }}
            more={more}
            onToggleMore={() => setMore((m) => !m)}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-center text-[15px] font-semibold text-[#131A1F]">Describe your design</h2>
        <div className="mt-3">
          <DesignDescription
            value={description}
            onChange={setDescription}
            generating={generating}
            attachments={attachmentsList}
            onRemoveAttachment={(id) =>
              setAttachmentsList((cur) => cur.filter((a) => a.id !== id))
            }
            onAttach={openFilePicker}
            onOpenPanel={setPanel}
            canGenerate={canGenerate}
            disabledReason={disabledReason}
            onGenerate={() => setGenerating(true)}
            onCancel={() => setGenerating(false)}
          />
        </div>
      </section>

      <div className="mt-8">
        <DesignLibrary
          state={libraryState}
          onRetry={() => setLibraryState('ready')}
        />
      </div>

      <CustomStateControl state={demoState} onChange={applyDemo} />
      {panel && <PlaceholderPanel title={panel} onClose={() => setPanel(null)} />}
    </div>
  );
}