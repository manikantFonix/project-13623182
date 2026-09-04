'use client';

export default function DashboardTopBar() {
  return (
    <header className="h-16 bg-white border-b border-[#DDE3E6] flex items-center justify-between pl-8 pr-8">
      <h1 className="text-[15px] font-medium text-[#131A1F]">Dashboard</h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#5C6870] hover:text-[#131A1F] hover:bg-[#F4F6F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
        >
          <i className="ri-notification-3-line text-[20px]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#A8552A]" />
        </button>
        <button
          type="button"
          aria-label="Account"
          className="w-8 h-8 rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16323F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EFF2F3]"
        >
          <img
            src="https://readdy.ai/api/search-image?query=professional%20corporate%20headshot%20portrait%20of%20a%20woman%20with%20shoulder%20length%20dark%20hair%2C%20neutral%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20realistic%20photography%2C%20head%20and%20shoulders%20crop&width=64&height=64&seq=21&orientation=squarish"
            alt="Account"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}