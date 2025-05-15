// .commitlintrc.cjs
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: 'Chọn loại commit bạn muốn thực hiện:',
      scope: 'Chọn phạm vi commit (có thể bỏ qua):',
      customScope: 'Vui lòng nhập phạm vi commit tùy chỉnh:',
      subject: 'Nhập mô tả ngắn gọn cho thay đổi:\n',
      body: 'Nhập mô tả chi tiết hơn (có thể bỏ qua). Dùng "|" để xuống dòng:\n',
      breaking:
        'Liệt kê các thay đổi phá vỡ tương thích (có thể bỏ qua). Dùng "|" để xuống dòng:\n',
      footerPrefixesSelect: 'Chọn tiền tố liên kết issue (có thể bỏ qua):',
      customFooterPrefix: 'Nhập tiền tố issue tùy chỉnh:',
      footer: 'Liệt kê các issue liên quan (có thể bỏ qua), ví dụ: #31, #I3244:\n',
      confirmCommit: 'Bạn có muốn gửi commit này không?'
    },
    types: [
      { value: 'feat', name: 'feat:     Thêm tính năng mới | A new feature' },
      { value: 'fix', name: 'fix:      Sửa lỗi | A bug fix' },
      {
        value: 'docs',
        name: 'docs:     Cập nhật tài liệu | Documentation only changes'
      },
      {
        value: 'style',
        name: 'style:    Thay đổi định dạng code | Changes that do not affect the meaning of the code'
      },
      {
        value: 'refactor',
        name: 'refactor: Cải tiến code | A code change that neither fixes a bug nor adds a feature'
      },
      {
        value: 'perf',
        name: 'perf:     Cải thiện hiệu năng | A code change that improves performance'
      },
      {
        value: 'test',
        name: 'test:     Liên quan đến kiểm thử | Adding missing tests or correcting existing tests'
      },
      {
        value: 'build',
        name: 'build:    Liên quan đến build | Changes that affect the build system or external dependencies'
      },
      {
        value: 'ci',
        name: 'ci:       Liên quan đến CI | Changes to our CI configuration files and scripts'
      },
      { value: 'revert', name: 'revert:   Hoàn tác code | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    Thay đổi khác | Other changes that do not modify src or test files'
      }
    ],
    useEmoji: false
  }
}
