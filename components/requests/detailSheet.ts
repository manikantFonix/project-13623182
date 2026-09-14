export interface DetailSheetAttachment {
  name: string;
  meta: string;
  url: string;
}

export interface DetailSheetSpecs {
  metalWeight: string;
  toneSpecification: string;
  threeToneSpecification: string;
  specialInstructions: string;
  attachment: DetailSheetAttachment | null;
}

const DEFAULT_SPECS: DetailSheetSpecs = {
  metalWeight: '4.2',
  toneSpecification: 'Three Tone',
  threeToneSpecification: 'Rose + White + Yellow',
  specialInstructions:
    'Vintage-inspired design with intricate milgrain detailing. The centre diamond should be round brilliant cut, G colour, VS2 clarity. The halo diamonds should be uniform and well-matched. The band features delicate filigree work.',
  attachment: {
    name: 'halo-setting-detail.png',
    meta: '1.2 MB · PNG',
    url: 'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20an%2018k%20white%20gold%20vintage%20halo%20diamond%20ring%20with%20a%20round%20brilliant%20centre%20stone%20and%20a%20fine%20milgrain%20halo%2C%20centred%20front%20view%20on%20a%20plain%20uniform%20pale%20neutral%20background%2C%20soft%20even%20diffused%20lighting%2C%20crisp%20focus%2C%20minimalist%20luxury%20jewellery%20catalogue%20image&width=800&height=800&seq=921&orientation=squarish',
  },
};

let specSheet: DetailSheetSpecs = { ...DEFAULT_SPECS };

export function getDetailSheetSpecs(): DetailSheetSpecs {
  return specSheet;
}

export function updateDetailSheetSpecs(patch: Partial<DetailSheetSpecs>): void {
  specSheet = { ...specSheet, ...patch };
}