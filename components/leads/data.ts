export type LeadSource = 'catalog' | 'widget';
import { METAL_HEX } from '../../lib/metals';

export type LeadStatus = 'new' | 'accepted' | 'rejected';
export type WidgetMetalId = 'yellow' | 'white' | 'rose';
export type WidgetAngle = 'front' | 'side' | 'back' | 'worn';
export type ItemMetal = 'Yellow gold' | 'White gold' | 'Rose gold' | 'Platinum';

export interface CatalogItem {
  category: string;
  description: string;
  image: string;
  metal: ItemMetal;
  quantity: number;
  price: number | null;
}

export interface Estimate {
  size?: string;
  stone: string;
  budget: number;
  benchDays: number;
  benchLevel: string;
  metal: string;
  stones: string;
  labor: string;
  low: number;
  high: number;
}

export interface Lead {
  id: string;
  source: LeadSource;
  name: string;
  phone: string;
  email: string;
  address?: string;
  receivedLabel: string;
  receivedFull: string;
  message?: string;
  status: LeadStatus;
  decidedOn?: string;
  catalogName?: string;
  items?: CatalogItem[];
  metal?: WidgetMetalId;
  views?: Record<WidgetMetalId, Record<WidgetAngle, string>>;
  description?: string;
  quantity?: number;
  estimate?: Estimate | null;
}

export const metalSwatch: Record<ItemMetal, string> = {
  'Yellow gold': METAL_HEX.yellow,
  'White gold': METAL_HEX.white,
  'Rose gold': METAL_HEX.rose,
  Platinum: '#C6CFE0',
};

export const leads: Lead[] = [
  {
    id: 'c-1001',
    source: 'catalog',
    name: 'Emma Hartley',
    phone: '+44 20 7946 0142',
    email: 'emma.hartley@example.com',
    address: '28 Rosewood Lane, Camden, London',
    receivedLabel: '2 hours ago',
    receivedFull: '8 September 2026 at 1:42 pm',
    message:
      'Hi, I saw the Bridal 2026 catalog and I would love to know more about the solitaire ring. Could you let me know the lead time and whether you can do platinum? I would be looking to order in the next few weeks.',
    status: 'new',
    catalogName: 'Bridal 2026',
    items: [
      {
        category: 'Ring',
        description: 'Bridal solitaire ring with a tapered band, a raised six-prong setting and a brilliant-cut center stone.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20six-prong%20setting%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=31&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 1240,
      },
    ],
  },
  {
    id: 'c-1002',
    source: 'catalog',
    name: 'Daniel Osei',
    phone: '+44 20 7946 0193',
    email: 'daniel.osei@example.com',
    receivedLabel: '5 hours ago',
    receivedFull: '8 September 2026 at 10:18 am',
    message:
      'Hello, I am interested in a set to match a engagement ring I bought from you. I have picked out the halo ring, the eternity band and the stud earrings. Could you quote them together?',
    status: 'accepted',
    decidedOn: '8 September 2026',
    catalogName: 'Solitaire collection',
    items: [
      {
        category: 'Ring',
        description: 'Halo cluster ring with a round center diamond and a row of pavé shoulders.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20halo%20cluster%20ring%20with%20a%20round%20center%20diamond%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=32&orientation=squarish',
        metal: 'White gold',
        quantity: 1,
        price: 2180,
      },
      {
        category: 'Ring',
        description: 'Full eternity band ring set with a continuous line of stones.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20full%20eternity%20band%20ring%20with%20a%20continuous%20line%20of%20diamonds%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=33&orientation=squarish',
        metal: 'White gold',
        quantity: 1,
        price: 1890,
      },
      {
        category: 'Earring',
        description: 'Gold stud earrings with four-prong settings.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20gold%20stud%20earrings%20with%20four-prong%20settings%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=34&orientation=squarish',
        metal: 'White gold',
        quantity: 1,
        price: 760,
      },
    ],
  },
  {
    id: 'c-1003',
    source: 'catalog',
    name: 'Priya Raman',
    phone: '+44 20 7946 0227',
    email: 'priya.raman@example.com',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 4:05 pm',
    message:
      'Could you confirm if the gold bangle is available in a smaller size? I only found the standard size in the catalog.',
    status: 'new',
    catalogName: 'Everyday gold',
    items: [
      {
        category: 'Bracelet',
        description: 'Fine gold chain necklace with a solitaire diamond drop.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20bangle%20bracelet%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=35&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 950,
      },
    ],
  },
  {
    id: 'c-1004',
    source: 'catalog',
    name: 'Sophie Turner',
    phone: '+44 20 7946 0168',
    email: 'sophie.turner@example.com',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 9:31 am',
    message: 'Is the teardrop pendant available in rose gold?',
    status: 'rejected',
    decidedOn: '7 September 2026',
    catalogName: 'Bridal 2026',
    items: [
      {
        category: 'Pendant',
        description: 'Teardrop pendant with a pavé bail and a floating pear-cut center stone.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20teardrop%20pendant%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=36&orientation=squarish',
        metal: 'Rose gold',
        quantity: 1,
        price: 840,
      },
    ],
  },
  {
    id: 'c-1005',
    source: 'catalog',
    name: 'Marcus Bell',
    phone: '+44 20 7946 0251',
    email: 'marcus.bell@example.com',
    address: '14 Kings Road, Brighton',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 8:12 am',
    message: 'I would like to order two pairs of the gold drop earrings and a matching pendant for a gift.',
    status: 'new',
    catalogName: 'Festive drops',
    items: [
      {
        category: 'Earring',
        description: 'Gold drop earrings with a tiny diamond accent finish.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20pair%20of%20gold%20drop%20earrings%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=37&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 2,
        price: 640,
      },
      {
        category: 'Pendant',
        description: 'Delicate gold pendant with a single small diamond dropping from a fine chain.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20drop%20pendant%20necklace%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=38&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 720,
      },
    ],
  },
  {
    id: 'c-1006',
    source: 'catalog',
    name: 'Amelia Grant',
    phone: '+44 20 7946 0189',
    email: 'amelia.grant@example.com',
    receivedLabel: '12 Mar',
    receivedFull: '12 March 2026 at 11:20 am',
    message: 'Could we discuss engraving options for the anniversary band?',
    status: 'accepted',
    decidedOn: '12 March 2026',
    catalogName: 'Anniversary bands',
    items: [
      {
        category: 'Ring',
        description: 'Polished yellow gold anniversary band ring with a row of small diamonds along the top.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20yellow%20gold%20anniversary%20band%20ring%20with%20a%20row%20of%20small%20diamonds%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=39&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 1160,
      },
    ],
  },
  {
    id: 'c-1007',
    source: 'catalog',
    name: 'Hana Kim',
    phone: '+44 20 7946 0273',
    email: 'hana.kim@example.com',
    receivedLabel: '11 Mar',
    receivedFull: '11 March 2026 at 3:55 pm',
    message: 'I am choosing between the gemstone pendant and a pair of matching studs. Do you have a set price?',
    status: 'new',
    catalogName: 'Gemstone classics',
    items: [
      {
        category: 'Ring',
        description: 'Gold ring with a single oval green gemstone set in a simple bezel.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20ring%20with%20an%20oval%20green%20gemstone%20in%20a%20simple%20bezel%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=40&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: null,
      },
      {
        category: 'Earring',
        description: 'Gold stud earrings with a single green gemstone accent.',
        image:
          'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20gold%20stud%20earrings%20with%20a%20green%20gemstone%20on%20a%20plain%20pale%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20clean%20composition&width=120&height=120&seq=41&orientation=squarish',
        metal: 'Yellow gold',
        quantity: 1,
        price: 480,
      },
    ],
  },
  {
    id: 'w-2001',
    source: 'widget',
    name: 'Olivia Bennett',
    phone: '+44 20 7946 0306',
    email: 'olivia.bennett@example.com',
    address: '5 Willow Street, Bath',
    receivedLabel: '1 hour ago',
    receivedFull: '8 September 2026 at 2:20 pm',
    message:
      'I used the design tool on your site and I love the result. Could you tell me if you can make it and what the final cost might be?',
    status: 'new',
    metal: 'rose',
    views: {
      yellow: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-yellow-front-111&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20the%20side%20in%20profile%2C%20the%20centre%20stone%20raised%20above%20the%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-yellow-side-112&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20six%20prong%20setting%20and%20the%20underside%20of%20the%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-yellow-back-113&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20worn%20on%20a%20finger%20of%20a%20hand%20shown%20upright%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-yellow-worn-114&orientation=squarish',
      },
      white: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-white-front-121&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20the%20side%20in%20profile%2C%20the%20centre%20stone%20raised%20above%20the%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-white-side-122&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20six%20prong%20setting%20and%20the%20underside%20of%20the%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-white-back-123&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20worn%20on%20a%20finger%20of%20a%20hand%20shown%20upright%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-white-worn-124&orientation=squarish',
      },
      rose: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-rose-front-131&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20the%20side%20in%20profile%2C%20the%20centre%20stone%20raised%20above%20the%20polished%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-rose-side-132&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20six%20prong%20setting%20and%20the%20underside%20of%20the%20band%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-rose-back-133&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20solitaire%20ring%20with%20one%20round%20brilliant%20cut%20centre%20stone%20held%20in%20a%20six%20prong%20setting%20on%20a%20softly%20twisted%20vine%20like%20polished%20band%20worn%20on%20a%20finger%20of%20a%20hand%20shown%20upright%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-olivia-rose-worn-134&orientation=squarish',
      },
    },
    description:
      'A delicate rose gold engagement ring with one round centre stone and a twisted, vine-like band. I would like it to sit low on the finger.',
    quantity: 1,
    estimate: {
      size: 'US 6.5',
      stone: 'Lab-grown · 1 × 0.50 ct',
      budget: 2900,
      benchDays: 2.4,
      benchLevel: 'detailed',
      metal: '$210',
      stones: '$240',
      labor: '$53',
      low: 500,
      high: 550,
    },
  },
  {
    id: 'w-2002',
    source: 'widget',
    name: 'Lucas Meyer',
    phone: '+44 20 7946 0338',
    email: 'lucas.meyer@example.com',
    receivedLabel: '3 hours ago',
    receivedFull: '8 September 2026 at 11:47 am',
    message: 'Would you be able to craft this as a pair of earrings instead?',
    status: 'new',
    metal: 'yellow',
    views: {
      yellow: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-yellow-front-211&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20the%20side%20in%20profile%2C%20the%20hoop%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-yellow-side-212&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20rounded%20hoop%20and%20the%20small%20tucked%20diamond%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-yellow-back-213&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20worn%20on%20an%20ear%20shown%20from%20the%20side%20on%20a%20model%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-yellow-worn-214&orientation=squarish',
      },
      white: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-white-front-221&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20the%20side%20in%20profile%2C%20the%20hoop%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-white-side-222&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20rounded%20hoop%20and%20the%20small%20tucked%20diamond%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-white-back-223&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20worn%20on%20an%20ear%20shown%20from%20the%20side%20on%20a%20model%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-white-worn-224&orientation=squarish',
      },
      rose: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-rose-front-231&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20the%20side%20in%20profile%2C%20the%20hoop%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-rose-side-232&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20rounded%20hoop%20and%20the%20small%20tucked%20diamond%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-rose-back-233&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20hoop%20earring%20with%20a%20smoothly%20rounded%20polished%20hoop%20and%20one%20small%20diamond%20tucked%20inside%20worn%20on%20an%20ear%20shown%20from%20the%20side%20on%20a%20model%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-lucas-rose-worn-234&orientation=squarish',
      },
    },
    description:
      'A pair of gold hoop earrings with a small diamond tucked inside the hoop for a subtle sparkle, nothing too flashy.',
    quantity: 2,
    estimate: null,
  },
  {
    id: 'w-2003',
    source: 'widget',
    name: 'Chloe Dubois',
    phone: '+33 1 44 55 0354',
    email: 'chloe.dubois@example.com',
    receivedLabel: 'Yesterday',
    receivedFull: '7 September 2026 at 6:10 pm',
    message: 'I designed a pendant on your site, please let me know if it is possible.',
    status: 'accepted',
    decidedOn: '8 September 2026',
    metal: 'white',
    views: {
      yellow: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-yellow-front-311&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20the%20side%20in%20profile%2C%20the%20bezel%20and%20pear%20cut%20stone%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-yellow-side-312&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20smooth%20teardrop%20frame%20and%20its%20attachment%20to%20the%20fine%20chain%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-yellow-back-313&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20worn%20on%20a%20fine%20chain%20around%20a%20model%20neck%20and%20collarbone%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-yellow-worn-314&orientation=squarish',
      },
      white: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-white-front-321&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20the%20side%20in%20profile%2C%20the%20bezel%20and%20pear%20cut%20stone%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-white-side-322&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20smooth%20teardrop%20frame%20and%20its%20attachment%20to%20the%20fine%20chain%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-white-back-323&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20worn%20on%20a%20fine%20chain%20around%20a%20model%20neck%20and%20collarbone%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-white-worn-324&orientation=squarish',
      },
      rose: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20directly%20in%20front%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-rose-front-331&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20the%20side%20in%20profile%2C%20the%20bezel%20and%20pear%20cut%20stone%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-rose-side-332&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20seen%20from%20behind%20showing%20the%20reverse%20of%20the%20smooth%20teardrop%20frame%20and%20its%20attachment%20to%20the%20fine%20chain%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-rose-back-333&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20teardrop%20pendant%20on%20a%20fine%20chain%20with%20one%20pear%20cut%20stone%20held%20in%20a%20slim%20bezel%20within%20a%20smooth%20teardrop%20frame%20worn%20on%20a%20fine%20chain%20around%20a%20model%20neck%20and%20collarbone%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-chloe-rose-worn-334&orientation=squarish',
      },
    },
    description:
      'A white gold teardrop pendant on a fine chain with one pear-cut stone, made to wear every day.',
    quantity: 1,
    estimate: {
      size: '18 mm',
      stone: 'Lab-grown · 1 × 1.00 ct',
      budget: 3400,
      benchDays: 4.6,
      benchLevel: 'intricate',
      metal: '$680',
      stones: '$760',
      labor: '$240',
      low: 1680,
      high: 1850,
    },
  },
  {
    id: 'w-2004',
    source: 'widget',
    name: 'Ethan Walker',
    phone: '+44 20 7946 0371',
    email: 'ethan.walker@example.com',
    receivedLabel: '12 Mar',
    receivedFull: '12 March 2026 at 1:02 pm',
    status: 'rejected',
    decidedOn: '12 March 2026',
    metal: 'yellow',
    views: {
      yellow: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20directly%20in%20front%2C%20the%20flat%20oval%20face%20toward%20the%20camera%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-yellow-front-411&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20the%20side%20in%20profile%2C%20the%20raised%20flat%20top%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-yellow-side-412&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20behind%20showing%20the%20underside%20of%20the%20solid%20polished%20band%20and%20its%20plain%20flat%20face%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-yellow-back-413&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20yellow%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20worn%20on%20a%20finger%20of%20a%20hand%20shown%20upright%2C%20the%20flat%20oval%20face%20turned%20toward%20the%20camera%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-yellow-worn-414&orientation=squarish',
      },
      white: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20directly%20in%20front%2C%20the%20flat%20oval%20face%20toward%20the%20camera%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-white-front-421&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20the%20side%20in%20profile%2C%20the%20raised%20flat%20top%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-white-side-422&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20behind%20showing%20the%20underside%20of%20the%20solid%20polished%20band%20and%20its%20plain%20flat%20face%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-white-back-423&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20white%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20worn%20on%20a%20finger%20of%20a%20hand%20shown%20upright%2C%20the%20flat%20oval%20face%20turned%20toward%20the%20camera%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-white-worn-424&orientation=squarish',
      },
      rose: {
        front:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20directly%20in%20front%2C%20the%20flat%20oval%20face%20toward%20the%20camera%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-rose-front-431&orientation=squarish',
        side:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20the%20side%20in%20profile%2C%20the%20raised%20flat%20top%20edge%20on%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-rose-side-432&orientation=squarish',
        back:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20seen%20from%20behind%20showing%20the%20underside%20of%20the%20solid%20polished%20band%20and%20its%20plain%20flat%20face%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-rose-back-433&orientation=squarish',
        worn:
          'https://readdy.ai/api/search-image?query=Photorealistic%203D%20render%20of%20a%20rose%20gold%20signet%20ring%20with%20a%20plain%20flat%20oval%20face%20on%20a%20solid%20polished%20band%20worn%20on%20a%20finger%20of%20a%20hand%20shown%20upright%2C%20the%20flat%20oval%20face%20turned%20toward%20the%20camera%2C%20centred%20on%20a%20plain%20seamless%20very%20light%20neutral%20grey%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20subtle%20reflections%20on%20the%20polished%20metal%2C%20high%20detail%20macro%20jewellery%20visualisation%2C%20clean%20minimal%20composition&width=720&height=720&seq=lead-ethan-rose-worn-434&orientation=squarish',
      },
    },
    description:
      'A plain gold signet ring with a flat face so I can have initials engraved on it.',
    quantity: 1,
    estimate: null,
  },
];

export function getLead(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function itemsLabel(l: Lead): string {
  if (l.source === 'widget') return `${l.quantity} item${(l.quantity ?? 0) !== 1 ? 's' : ''}`;
  const n = l.items?.length ?? 0;
  return `${n} item${n !== 1 ? 's' : ''}`;
}