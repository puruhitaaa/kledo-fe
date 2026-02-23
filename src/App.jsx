import { useLoaderData, useNavigate, useSearchParams } from "react-router"

export default function App() {
  const { provinces, regencies, districts, filters } = useLoaderData()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const selectedProvince = provinces.find((p) => p.id === filters.province)
  const selectedRegency = regencies.find((r) => r.id === filters.regency)
  const selectedDistrict = districts.find((d) => d.id === filters.district)

  const filteredRegencies = filters.province
    ? regencies.filter((r) => r.province_id === filters.province)
    : []

  const filteredDistricts = filters.regency
    ? districts.filter((d) => d.regency_id === filters.regency)
    : []

  function handleProvinceChange(e) {
    const value = e.target.value
    const params = new URLSearchParams()
    if (value) params.set("province", value)
    navigate(`/?${params.toString()}`)
  }

  function handleRegencyChange(e) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams)
    params.delete("regency")
    params.delete("district")
    if (value) params.set("regency", value)
    navigate(`/?${params.toString()}`)
  }

  function handleDistrictChange(e) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams)
    params.delete("district")
    if (value) params.set("district", value)
    navigate(`/?${params.toString()}`)
  }

  function handleReset() {
    navigate("/")
  }

  // Breadcrumb segments
  const breadcrumbItems = [{ label: "Indonesia", active: false }]
  if (selectedProvince) {
    breadcrumbItems.push({
      label: selectedProvince.name,
      active: !selectedRegency,
    })
  }
  if (selectedRegency) {
    breadcrumbItems.push({
      label: selectedRegency.name,
      active: !selectedDistrict,
    })
  }
  if (selectedDistrict) {
    breadcrumbItems.push({ label: selectedDistrict.name, active: true })
  }
  // Mark last item as active
  if (breadcrumbItems.length > 0) {
    breadcrumbItems.forEach((item, i) => {
      item.active = i === breadcrumbItems.length - 1
    })
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-72 border-r border-gray-200 bg-white p-6 flex flex-col'>
        {/* Logo */}
        <div className='flex items-center gap-3 mb-10'>
          <div className='w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <span className='text-lg font-semibold text-gray-900'>
            Frontend Assessment
          </span>
        </div>

        {/* Filter Section */}
        <div className='flex-1'>
          <p className='text-xs font-semibold text-gray-400 tracking-wider uppercase mb-6'>
            Filter Wilayah
          </p>

          {/* Province */}
          <div className='mb-5'>
            <label className='block text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2'>
              Provinsi
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
              </span>
              <select
                name='province'
                value={filters.province ?? ""}
                onChange={handleProvinceChange}
                className='w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors cursor-pointer'
              >
                <option value=''>Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Regency */}
          <div className='mb-5'>
            <label className='block text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2'>
              Kota/Kabupaten
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </span>
              <select
                name='regency'
                value={filters.regency ?? ""}
                onChange={handleRegencyChange}
                disabled={!filters.province}
                className='w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                <option value=''>Pilih Kota/Kabupaten</option>
                {filteredRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* District */}
          <div className='mb-5'>
            <label className='block text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2'>
              Kecamatan
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </span>
              <select
                name='district'
                value={filters.district ?? ""}
                onChange={handleDistrictChange}
                disabled={!filters.regency}
                className='w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                <option value=''>Pilih Kecamatan</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-200 my-4' />

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className='w-full flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
            />
          </svg>
          RESET
        </button>
      </aside>

      {/* Main Area */}
      <div className='flex-1 flex flex-col'>
        {/* Breadcrumb */}
        <nav className='breadcrumb px-8 py-4 text-sm'>
          <ol className='flex items-center gap-2'>
            {breadcrumbItems.map((item, index) => (
              <li key={index} className='flex items-center gap-2'>
                {index > 0 && <span className='text-gray-400'>›</span>}
                <span
                  className={
                    item.active ? "text-blue-600 font-medium" : "text-gray-500"
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Content */}
        <main className='flex-1 flex items-center justify-center p-8'>
          <div className='text-center space-y-8'>
            {!selectedProvince && !selectedRegency && !selectedDistrict && (
              <div className='text-gray-400 text-lg'>
                <p className='text-5xl font-bold text-gray-800 mb-2'>
                  Indonesia
                </p>
                <p className='text-sm text-gray-400 mt-4'>
                  Pilih provinsi untuk memulai
                </p>
              </div>
            )}

            {selectedProvince && (
              <div>
                <p className='text-xs font-semibold text-blue-500 tracking-widest uppercase mb-2'>
                  Provinsi
                </p>
                <p className='text-5xl font-extrabold text-gray-900'>
                  {selectedProvince.name}
                </p>
              </div>
            )}

            {selectedProvince && selectedRegency && (
              <>
                <div className='flex justify-center'>
                  <svg
                    className='w-6 h-6 text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-xs font-semibold text-blue-500 tracking-widest uppercase mb-2'>
                    Kota / Kabupaten
                  </p>
                  <p className='text-5xl font-extrabold text-gray-900'>
                    {selectedRegency.name}
                  </p>
                </div>
              </>
            )}

            {selectedRegency && selectedDistrict && (
              <>
                <div className='flex justify-center'>
                  <svg
                    className='w-6 h-6 text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-xs font-semibold text-blue-500 tracking-widest uppercase mb-2'>
                    Kecamatan
                  </p>
                  <p className='text-5xl font-extrabold text-gray-900'>
                    {selectedDistrict.name}
                  </p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
