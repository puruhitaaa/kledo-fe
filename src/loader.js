export async function loader({ request }) {
  const url = new URL(request.url)
  const provinceId = url.searchParams.get("province")
  const regencyId = url.searchParams.get("regency")
  const districtId = url.searchParams.get("district")

  const res = await fetch("/data/indonesia_regions.json")
  const data = await res.json()

  return {
    provinces: data.provinces,
    regencies: data.regencies,
    districts: data.districts,
    filters: {
      province: provinceId ? Number(provinceId) : null,
      regency: regencyId ? Number(regencyId) : null,
      district: districtId ? Number(districtId) : null,
    },
  }
}
