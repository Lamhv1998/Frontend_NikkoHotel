// .commitlintrc.cjs
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: '選擇你要提交的類型 :',
      scope: '選擇一個提交範圍（可選）:',
      customScope: '請輸入自定義的提交範圍 :',
      subject: '填寫簡短精煉的變更描述 :\n',
      body: '填寫更加詳細的變更描述（可選）。使用 "|" 換行 :\n',
      breaking: '列舉非兼容性重大的變更（可選）。使用 "|" 換行 :\n',
      footerPrefixesSelect: '選擇關聯issue前綴（可選）:',
      customFooterPrefix: '輸入自定義issue前綴 :',
      footer: '列舉關聯issue (可選) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修覆缺陷 | A bug fix' },
      {
        value: 'docs',
        name: 'docs:     文檔更新 | Documentation only changes'
      },
      {
        value: 'style',
        name: 'style:    代碼格式 | Changes that do not affect the meaning of the code'
      },
      {
        value: 'refactor',
        name: 'refactor: 代碼重構 | A code change that neither fixes a bug nor adds a feature'
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance'
      },
      {
        value: 'test',
        name: 'test:     測試相關 | Adding missing tests or correcting existing tests'
      },
      {
        value: 'build',
        name: 'build:    構建相關 | Changes that affect the build system or external dependencies'
      },
      {
        value: 'ci',
        name: 'ci:       持續集成 | Changes to our CI configuration files and scripts'
      },
      { value: 'revert', name: 'revert:   回退代碼 | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files'
      }
    ],
    useEmoji: false
  }
}
