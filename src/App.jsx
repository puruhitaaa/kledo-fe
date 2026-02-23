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

  if (breadcrumbItems.length > 0) {
    breadcrumbItems.forEach((item, i) => {
      item.active = i === breadcrumbItems.length - 1
    })
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-white font-sans text-gray-900'>
      <aside className='w-full md:w-[320px] border-b md:border-b-0 md:border-r border-gray-200 bg-white p-6 md:p-8 flex flex-col shrink-0'>
        <div className='flex items-center gap-3 mb-10'>
          <div className='w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0'>
            <svg
              className='w-6 h-6 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
          </div>
          <span className='text-xl font-bold text-gray-900 tracking-tight'>
            Frontend Assessment
          </span>
        </div>

        <div className='flex-1'>
          <p className='text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-6'>
            Filter Wilayah
          </p>

          <div className='mb-6'>
            <label className='block text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2.5'>
              Provinsi
            </label>
            <div className='relative'>
              <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z'
                  />
                </svg>
              </span>
              <select
                name='province'
                value={filters.province ?? ""}
                onChange={handleProvinceChange}
                className='w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm font-medium text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors cursor-pointer'
              >
                <option value=''>Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className='mb-6'>
            <label className='block text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2.5'>
              Kota/Kabupaten
            </label>
            <div className='relative'>
              <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
                  />
                </svg>
              </span>
              <select
                name='regency'
                value={filters.regency ?? ""}
                onChange={handleRegencyChange}
                disabled={!filters.province}
                className='w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm font-medium text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                <option value=''>Pilih Kota/Kabupaten</option>
                {filteredRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <span className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className='mb-8'>
            <label className='block text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-2.5'>
              Kecamatan
            </label>
            <div className='relative'>
              <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
              </span>
              <select
                name='district'
                value={filters.district ?? ""}
                onChange={handleDistrictChange}
                disabled={!filters.regency}
                className='w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm font-medium text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed'
              >
                <option value=''>Pilih Kecamatan</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className='w-full flex items-center justify-center gap-2 rounded-xl border border-blue-600 py-3 text-sm font-bold tracking-widest text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 3l18 18M4.318 4.318A21.88 21.88 0 003 4.774v1.044a2.25 2.25 0 00.659 1.591l5.432 5.432a2.25 2.25 0 01.659 1.591v2.927a2.25 2.25 0 001.244 2.013L14.25 21v-6.568a2.25 2.25 0 01.659-1.591l2.62-2.62m2.813-2.813L21 6.409A2.25 2.25 0 0021 4.818V3.774c0-.54-.384-1.006-.917-1.096A48.32 48.32 0 0012 3c-1.05 0-2.089.034-3.118.1'
              />
            </svg>
            RESET
          </button>
        </div>
      </aside>

      <div className='flex-1 flex flex-col min-w-0'>
        <nav className='border-b border-gray-100 px-6 md:px-10 py-5 text-sm font-semibold'>
          <ol className='flex items-center gap-2.5 flex-wrap'>
            {breadcrumbItems.map((item, index) => (
              <li key={index} className='flex items-center gap-2.5'>
                {index > 0 && (
                  <svg
                    className='w-3 h-3 text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                )}
                <span
                  className={item.active ? "text-blue-500" : "text-gray-400"}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <main className='flex-1 flex items-center justify-center p-6 md:p-10 overflow-y-auto'>
          <div className='text-center w-full max-w-3xl mx-auto'>
            {!selectedProvince && !selectedRegency && !selectedDistrict && (
              <div className='text-gray-400'>
                <p className='text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight'>
                  Indonesia
                </p>
                <p className='text-base text-gray-400'>
                  Pilih provinsi untuk memulai
                </p>
              </div>
            )}

            {selectedProvince && (
              <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
                <p className='text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-3'>
                  Provinsi
                </p>
                <p className='text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight'>
                  {selectedProvince.name}
                </p>
              </div>
            )}

            {selectedProvince && selectedRegency && (
              <div className='animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both'>
                <div className='flex justify-center my-8 md:my-12'>
                  <svg
                    className='w-5 h-5 text-blue-200'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-3'>
                    Kota / Kabupaten
                  </p>
                  <p className='text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight'>
                    {selectedRegency.name}
                  </p>
                </div>
              </div>
            )}

            {selectedRegency && selectedDistrict && (
              <div className='animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both'>
                <div className='flex justify-center my-8 md:my-12'>
                  <svg
                    className='w-5 h-5 text-blue-200'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-3'>
                    Kecamatan
                  </p>
                  <p className='text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight'>
                    {selectedDistrict.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
