'use client';

import Link from 'next/link';

const items = [
  { label: 'Dashboard', icon: 'ri-home-5-line', active: true },
  { label: 'Requests', icon: 'ri-inbox-archive-line', active: false },
  { label: 'Leads', icon: 'ri-user-3-line', active: false },
  { label: 'Customers', icon: 'ri-team-line', active: false },
  { label: 'Manufacturers', icon: 'ri-building-2-line', active: false },
  { label: 'Analytics', icon: 'ri-bar-chart-2-line', active: false },
  { label: 'Settings', icon: 'ri-settings-3-line', active: false },
];

const itemClass = (active: boolean) =>
  `w-16 h-16 rounded-[18px] flex flex-col items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
    active
      ? 'bg-white/[0.12] text-white'
      : 'text-white/65 hover:bg-white/[0.08] hover:text-white'
  }`;

export default function Sidebar() {
  return (
    <aside className="fixed top-3 left-3 bottom-3 w-[104px] rounded-[20px] bg-[#16323F] flex flex-col items-center">
      <div className="mt-5 w-12 h-12 rounded-[20px] bg-white/10 flex items-center justify-center">
        <i className="ri-vip-diamond-line text-[24px] text-white" />
      </div>

      <nav className="mt-6 flex flex-col gap-1.5 items-center">
        {items.map((item) =>
          item.active ? (
            <Link key={item.label} href="/" className={itemClass(true)}>
              <span className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-[26px]`} />
              </span>
              <span className="mt-1 text-[11px] leading-none font-medium">
                {item.label}
              </span>
            </Link>
          ) : (
            <button key={item.label} type="button" className={itemClass(false)}>
              <span className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-[26px]`} />
              </span>
              <span className="mt-1 text-[11px] leading-none font-medium">
                {item.label}
              </span>
            </button>
          )
        )}
      </nav>

      <div className="mt-4 mb-4 w-8 h-px bg-white/[0.12]" />

      <div className="mt-auto mb-5 flex flex-col items-center gap-3">
        <button
          type="button"
          aria-label="Account"
          className="w-8 h-8 rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <img
            src="https://readdy.ai/api/search-image?query=professional%20corporate%20headshot%20portrait%20of%20a%20woman%20with%20shoulder%20length%20dark%20hair%2C%20neutral%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20realistic%20photography%2C%20head%20and%20shoulders%20crop&width=64&height=64&seq=21&orientation=squarish"
            alt="Account"
            className="w-full h-full object-cover"
          />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="w-8 h-8 flex items-center justify-center rounded-[12px] text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <i className="ri-settings-3-line text-[20px]" />
        </button>
      </div>
    </aside>
  );
}