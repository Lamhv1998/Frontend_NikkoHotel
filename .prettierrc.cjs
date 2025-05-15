module.exports = {
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-organize-attributes',
    'prettier-plugin-tailwindcss'
  ],
  printWidth: 100, // Số ký tự tối đa trên một dòng trước khi xuống dòng mới
  semi: false, // Không dùng dấu chấm phẩy ở cuối dòng
  singleQuote: true, // Sử dụng dấu nháy đơn cho chuỗi
  trailingComma: 'none', // Không thêm dấu phẩy ở cuối phần tử trong Object, Array
  attributeGroups: [
    '^v-if$',
    '^v-else$',
    '^v-else-if$',
    '^v-for$',
    '^v-show$',
    '^(?::)?id$',
    '^(?::)?ref',
    '^(?::)?key',
    '^v-(?!loading$!if$!else$!else-if$!for$)',
    '^v-loading$',
    '^v-slot$',
    '^v-model$',
    '^(?::)?model',
    '^(?::)?class$',
    '^(?::)?name$',
    '^(?::)?label$',
    '^(?::)?lang$',
    '^(?::)?src$',
    '^(?::)?type$',
    '^(?::)?href$',
    '^(?::)?value$',
    '^(?::)?title$',
    '^(?::)?alt$',
    '^(?::)?placeholder$',
    '$DEFAULT',
    '^(?::)?disabled$',
    '^(?::)?loading$',
    '^(?::)?src$',
    '^@'
  ],
  attributeSort: 'ASC', // Sắp xếp thuộc tính theo thứ tự tăng dần
  pluginSearchDirs: false
}
