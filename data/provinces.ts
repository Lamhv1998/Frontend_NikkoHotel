// Dữ liệu tĩnh cho các tỉnh thành Việt Nam (backup)
export const provincesData = [
  {
    code: "01",
    name: "Hà Nội",
    name_en: "Ha Noi",
    full_name: "Thành phố Hà Nội",
    full_name_en: "Ha Noi City",
    code_name: "ha_noi",
    administrative_unit_id: 1,
    administrative_region_id: 3
  },
  {
    code: "79",
    name: "Hồ Chí Minh",
    name_en: "Ho Chi Minh",
    full_name: "Thành phố Hồ Chí Minh",
    full_name_en: "Ho Chi Minh City",
    code_name: "ho_chi_minh",
    administrative_unit_id: 1,
    administrative_region_id: 7
  },
  {
    code: "31",
    name: "Hải Phòng",
    name_en: "Hai Phong",
    full_name: "Thành phố Hải Phòng",
    full_name_en: "Hai Phong City",
    code_name: "hai_phong",
    administrative_unit_id: 1,
    administrative_region_id: 3
  },
  {
    code: "48",
    name: "Đà Nẵng",
    name_en: "Da Nang",
    full_name: "Thành phố Đà Nẵng",
    full_name_en: "Da Nang City",
    code_name: "da_nang",
    administrative_unit_id: 1,
    administrative_region_id: 5
  },
  {
    code: "92",
    name: "Cần Thơ",
    name_en: "Can Tho",
    full_name: "Thành phố Cần Thơ",
    full_name_en: "Can Tho City",
    code_name: "can_tho",
    administrative_unit_id: 1,
    administrative_region_id: 8
  }
]

export const districtsData = {
  "01": [ // Hà Nội
    {
      code: "001",
      name: "Ba Đình",
      name_en: "Ba Dinh",
      full_name: "Quận Ba Đình",
      full_name_en: "Ba Dinh District",
      code_name: "ba_dinh",
      province_code: "01",
      administrative_unit_id: 2
    },
    {
      code: "002",
      name: "Hoàn Kiếm",
      name_en: "Hoan Kiem",
      full_name: "Quận Hoàn Kiếm",
      full_name_en: "Hoan Kiem District",
      code_name: "hoan_kiem",
      province_code: "01",
      administrative_unit_id: 2
    },
    {
      code: "003",
      name: "Tây Hồ",
      name_en: "Tay Ho",
      full_name: "Quận Tây Hồ",
      full_name_en: "Tay Ho District",
      code_name: "tay_ho",
      province_code: "01",
      administrative_unit_id: 2
    }
  ],
  "79": [ // Hồ Chí Minh
    {
      code: "760",
      name: "Quận 1",
      name_en: "District 1",
      full_name: "Quận 1",
      full_name_en: "District 1",
      code_name: "quan_1",
      province_code: "79",
      administrative_unit_id: 2
    },
    {
      code: "761",
      name: "Quận 2",
      name_en: "District 2",
      full_name: "Quận 2",
      full_name_en: "District 2",
      code_name: "quan_2",
      province_code: "79",
      administrative_unit_id: 2
    },
    {
      code: "762",
      name: "Quận 3",
      name_en: "District 3",
      full_name: "Quận 3",
      full_name_en: "District 3",
      code_name: "quan_3",
      province_code: "79",
      administrative_unit_id: 2
    }
  ]
}
