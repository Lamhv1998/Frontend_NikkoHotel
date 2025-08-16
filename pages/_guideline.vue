<template>
  <div class="flex h-screen flex-col font-sans">
    <header class="sticky z-[25] border-b bg-white px-3 py-4 text-h5 2xl:px-6">
      <h1 class="text-h5">Guideline</h1>
    </header>
    <div class="flex flex-1 overflow-hidden bg-slate-100">
      <aside class="w-[168px] shrink-0 !overflow-y-auto py-8 pl-3 2xl:pl-6">
        <h2 class="mb-4 text-h5 text-transparent">_</h2>
        <ul class="space-y-2 pt-6">
          <li v-for="item in scrollPointData" :key="item.title">
            <button
              class="text-h5 transition-colors hover:text-system-info-100 active:text-system-info-120"
              type="button"
              @click="scrollPoint(item.refs as HTMLElement)"
            >
              {{ item.point }}
            </button>
          </li>
        </ul>
      </aside>
      <main ref="mainRefs" class="relative space-y-12 !overflow-y-auto px-3 py-8 2xl:px-6">
        <!-- Typography Thiết kế font chữ -->
        <section :ref="(el: any) => (scrollPointData[0].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[0].title }}</h2>
          <ul class="card">
            <li>
              <h3 class="card-title">Font</h3>
              <div class="font-serif text-h4">Noto Serif TC</div>
            </li>
            <li>
              <h3 class="card-title">Line Height</h3>
              <div class="flex gap-4">
                <div class="box">
                                  <div class="text-h5">Heading</div>
                <div class="text-h2">120%</div>
                <div class="text-body-sm">Dùng cho tiêu đề lớn</div>
              </div>
              <div class="box">
                <div class="text-h5">Normal</div>
                <div class="text-h2">150%</div>
                <div class="text-body-sm">Dùng cho nội dung</div>
                </div>
              </div>
            </li>
            <li>
              <h3 class="card-title">Text Style</h3>
              <ul class="text-sample-wrapper">
                <li>
                  <button type="button" @click="toCopy">text-display</button>
                  <p>Heading 100px B</p>
                  <p class="text-display">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h1</button>
                  <p>Heading 48px B</p>
                  <p class="text-h1">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h2</button>
                  <p>Heading 40px B</p>
                  <p class="text-h2">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h3</button>
                  <p>Heading 32px B</p>
                  <p class="text-h3">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h4</button>
                  <p>Heading 28px B</p>
                  <p class="text-h4">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h5</button>
                  <p>Heading 24px B</p>
                  <p class="text-h5">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h5</button>
                  <p>Heading 20px B</p>
                  <p class="text-h6">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h5</button>
                  <p>Normal 16px B</p>
                  <p class="text-h5">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-h6</button>
                  <p>Normal 14px B</p>
                  <p class="text-h6">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-body</button>
                  <p>Normal 16px R</p>
                  <p class="text-body">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-body-sm</button>
                  <p>Normal 14px R</p>
                  <p class="text-body-sm">The quick brown fox jumps over the lazy dog.</p>
                </li>
                <li>
                  <button type="button" @click="toCopy">text-body-xs</button>
                  <p>Normal 12px R</p>
                  <p class="text-body-xs">The quick brown fox jumps over the lazy dog.</p>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <!-- Color System Hệ màu -->
        <section :ref="(el: any) => (scrollPointData[1].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[1].title }}</h2>
          <ul class="card">
            <li>
              <h3 class="card-title">Màu chính Primary</h3>
              <ul class="color-box-wrapper">
                <li class="bg-system-primary-120">
                  <button type="button" @click="toCopyColor">primary-120</button>
                  <div>#7B6651</div>
                </li>
                <li class="bg-system-primary-100">
                  <button type="button" @click="toCopyColor">primary-100</button>
                  <div>#BF9D7D</div>
                </li>
                <li class="bg-system-primary-80">
                  <button type="button" @click="toCopyColor">primary-80</button>
                  <div>#D0B79F</div>
                </li>
                <li class="bg-system-primary-60">
                  <button type="button" @click="toCopyColor">primary-60</button>
                  <div>#E1D1C2</div>
                </li>
                <li class="bg-system-primary-40">
                  <button type="button" @click="toCopyColor">primary-40</button>
                  <div>#F1EAE4</div>
                </li>
                <li class="bg-system-primary-10">
                  <button type="button" @click="toCopyColor">primary-10</button>
                  <div>#FAF7F5</div>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="card-title">Màu phụ Semantic</h3>
              <ul class="space-y-2">
                <li>
                  <h4 class="text-h5">Success</h4>
                  <ul class="color-box-wrapper">
                    <li class="bg-system-success-120">
                      <button type="button" @click="toCopyColor">success-120</button>
                      <div>#299F65</div>
                    </li>
                    <li class="bg-system-success-100">
                      <button type="button" @click="toCopyColor">success-100</button>
                      <div>#52DD7E</div>
                    </li>
                    <li></li>
                    <li class="bg-system-success-60">
                      <button type="button" @click="toCopyColor">success-60</button>
                      <div>#BCFBBD</div>
                    </li>
                    <li></li>
                    <li class="bg-system-success-10">
                      <button type="button" @click="toCopyColor">success-10</button>
                      <div>#E8FEE7</div>
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 class="text-h5">Info</h4>
                  <ul class="color-box-wrapper">
                    <li class="bg-system-info-120">
                      <button type="button" @click="toCopyColor">info-120</button>
                      <div>#1D66AC</div>
                    </li>
                    <li class="bg-system-info-100">
                      <button type="button" @click="toCopyColor">info-100</button>
                      <div>#3BADEF</div>
                    </li>
                    <li></li>
                    <li class="bg-system-info-60">
                      <button type="button" @click="toCopyColor">info-60</button>
                      <div>#B1EFFD</div>
                    </li>
                    <li></li>
                    <li class="bg-system-info-10">
                      <button type="button" @click="toCopyColor">info-10</button>
                      <div>#E6FBFE</div>
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 class="text-h5">Alert / Error</h4>
                  <ul class="color-box-wrapper">
                    <li class="bg-system-error-120">
                      <button type="button" @click="toCopyColor">error-120</button>
                      <div>#C22538</div>
                    </li>
                    <li class="bg-system-error-100">
                      <button type="button" @click="toCopyColor">error-100</button>
                      <div>#DA3E51</div>
                    </li>
                    <li></li>
                    <li class="bg-system-error-60">
                      <button type="button" @click="toCopyColor">error-60</button>
                      <div>#F5CCD1</div>
                    </li>
                    <li></li>
                    <li class="bg-system-error-10">
                      <button type="button" @click="toCopyColor">error-10</button>
                      <div>#FDECEF</div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="card-title">Màu phụ Semantic</h3>
              <ul class="color-box-wrapper">
                <li class="bg-system-background">
                  <button type="button" @click="toCopyColor">background</button>
                  <div>#140F0A</div>
                </li>
                <li class="bg-black">
                  <button type="button" @click="toCopyColor">black</button>
                  <div>#000000</div>
                </li>
                <li class="bg-system-gray-80">
                  <button type="button" @click="toCopyColor">gray-80</button>
                  <div>#4B4B4B</div>
                </li>
                <li class="bg-system-gray-60">
                  <button type="button" @click="toCopyColor">gray-60</button>
                  <div>#909090</div>
                </li>
                <li class="bg-system-gray-40">
                  <button type="button" @click="toCopyColor">gray-40</button>
                  <div>#ECECEC</div>
                </li>
                <li class="bg-system-gray-10">
                  <button type="button" @click="toCopyColor">gray-10</button>
                  <div>#F9F9F9</div>
                </li>
                <li class="bg-white">
                  <button type="button" @click="toCopyColor">white</button>
                  <div>#FFFFFF</div>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <!-- Icon Biểu tượng -->
        <section :ref="(el: any) => (scrollPointData[2].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[2].title }}</h2>
          <ul class="card">
            <li>
              <h3 class="card-title">Material Design Icons</h3>
              <ul class="icon-box-wrapper">
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> ic:baseline-check </span>
                    <Icon name="ic:baseline-check"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> ic:baseline-keyboard-arrow-left </span>
                    <Icon name="ic:baseline-keyboard-arrow-left"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-keyboard-arrow-down</span>
                    <Icon name="ic:baseline-keyboard-arrow-down"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-keyboard-arrow-up</span>
                    <Icon name="ic:baseline-keyboard-arrow-up"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-keyboard-arrow-right</span>
                    <Icon name="ic:baseline-keyboard-arrow-right"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-person</span>
                    <Icon name="ic:baseline-person"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">mdi:arrow-left</span>
                    <Icon name="mdi:arrow-left"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-close</span>
                    <Icon name="ic:baseline-close"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">mdi:arrow-right</span>
                    <Icon name="mdi:arrow-right"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:round-menu</span>
                    <Icon name="ic:round-menu"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-bed</span>
                    <Icon name="ic:baseline-bed"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:baseline-minus</span>
                    <Icon name="ic:baseline-minus"> </Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden">ic:outline-plus</span>
                    <Icon name="ic:outline-plus"> </Icon>
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <h3 class="card-title">Iconfy</h3>
              <ul class="icon-box-wrapper">
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> ic:baseline-directions-car </span>
                    <Icon name="ic:baseline-directions-car"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> ic:baseline-train </span>
                    <Icon name="ic:baseline-train"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> IconLuxuryCar </span>
                    <Icon name="IconLuxuryCar"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> bi:line </span>
                    <Icon name="bi:line"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> IconSize </span>
                    <Icon name="IconSize"></Icon>
                  </button>
                </li>
                <li>
                  <button type="button" @click="toCopyIcon">
                    <span class="hidden"> ic:outline-account-circle </span>
                    <Icon name="ic:outline-account-circle"></Icon>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <!-- LOGO Biểu trưng -->
        <section :ref="(el: any) => (scrollPointData[3].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[3].title }}</h2>

          <ul class="card">
            <li>
              <h3 class="card-title">Primary Color</h3>
              <PageLogo />
            </li>
            <li>
              <h3 class="card-title">White Color</h3>
              <div class="dark-wrapper">
                <PageLogo white />
              </div>
            </li>
          </ul>
        </section>

        <!-- Hero Button Nút nổi bật -->
        <section :ref="(el: any) => (scrollPointData[4].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[4].title }}</h2>

          <ul class="card">
            <li>
              <h3 class="card-title">Default</h3>
              <div class="dark-wrapper">
                <UIHeroButton />
              </div>
            </li>
          </ul>
        </section>

        <!-- Button Nút -->
        <section :ref="(el: any) => (scrollPointData[5].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[5].title }}</h2>
          <ul class="card">
            <li>
              <h3 class="card-title">Primary</h3>
              <table class="sample-wrapper-md">
                <thead>
                  <tr>
                    <th></th>
                    <th>with icon</th>
                    <th>no icon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Initial</td>
                    <td>
                      <UIButton icon="ic:baseline-person" />
                    </td>
                    <td>
                      <UIButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Disable</td>
                    <td>
                      <UIButton icon="ic:baseline-person" disabled />
                    </td>
                    <td>
                      <UIButton disabled />
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>

            <li>
              <h3 class="card-title">Secondary</h3>
              <table class="sample-wrapper-md">
                <thead>
                  <tr>
                    <th></th>
                    <th>with icon</th>
                    <th>no icon</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Initial</td>
                    <td>
                      <UIButton icon="ic:baseline-person" variant="secondary" />
                    </td>
                    <td>
                      <UIButton variant="secondary" />
                    </td>
                  </tr>
                  <tr>
                    <td>Disable</td>
                    <td>
                      <UIButton icon="ic:baseline-person" variant="secondary" disabled />
                    </td>
                    <td>
                      <UIButton variant="secondary" disabled />
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>

            <li>
              <h3 class="card-title">Ghost</h3>
              <div class="dark-wrapper">
                <table class="sample-wrapper-md">
                  <thead>
                    <tr>
                      <th></th>
                      <th>with icon</th>
                      <th>no icon</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Initial</td>
                      <td>
                        <UIButton icon="ic:baseline-person" variant="ghost" />
                      </td>
                      <td>
                        <UIButton variant="ghost" />
                      </td>
                    </tr>
                    <tr>
                      <td>Disable</td>
                      <td>
                        <UIButton icon="ic:baseline-person" variant="ghost" disabled />
                      </td>
                      <td>
                        <UIButton variant="ghost" disabled />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>

            <li>
              <h3 class="card-title">Text</h3>
              <div class="dark-wrapper">
                <table class="sample-wrapper-md">
                  <thead>
                    <tr>
                      <th></th>
                      <th>with icon</th>
                      <th>no icon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Initial</td>
                      <td></td>
                      <td>
                        <UIButton variant="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>Disable</td>
                      <td></td>
                      <td>
                        <UIButton variant="text" disabled />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </section>

        <!-- Input Field Trường nhập -->
        <section :ref="(el: any) => (scrollPointData[6].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[6].title }}</h2>
          <ul class="card">
            <li>
              <div class="dark-wrapper">
                <table class="sample-wrapper-md">
                  <tbody>
                    <tr>
                      <td class="w-24">Bắt buộc</td>
                      <td>
                        <UIInput
                          name="guideline-input-0"
                          label="Nhãn"
                          placeholder="Vui lòng nhập"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Cơ bản</td>
                      <td>
                        <UIInput
                          v-model="inputText"
                          name="guideline-input-1"
                          placeholder="Vui lòng nhập"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Chữ mờ</td>
                      <td>
                        <UIInput name="guideline-input-2" placeholder="Vui lòng nhập" />
                      </td>
                    </tr>
                    <tr>
                      <td>Thông báo lỗi</td>
                      <td>
                        <UIInput
                          name="guideline-input-3"
                          placeholder="Vui lòng nhập"
                          error="Bắt buộc nhập"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </section>

        <!-- Dropdown Danh sách chọn -->
        <section :ref="(el: any) => (scrollPointData[7].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[7].title }}</h2>

          <ul class="card">
            <li>
              <h3 class="card-title">Default</h3>
              <div class="gary-wrapper">
                <UISelect />
              </div>
            </li>
          </ul>
        </section>

        <!-- Section Tab Thẻ phân vùng -->
        <section :ref="(el: any) => (scrollPointData[8].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[8].title }}</h2>

          <ul class="card">
            <li>
              <div class="dark-wrapper">
                <table class="sample-wrapper-sm">
                  <tbody>
                    <tr>
                      <td>Default</td>
                      <td>
                        <UISectionTab />
                      </td>
                    </tr>
                    <tr>
                      <td>Active</td>
                      <td>
                        <UISectionTab active />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </section>

        <!-- Checkbox Ô chọn -->
        <section :ref="(el: any) => (scrollPointData[9].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[9].title }}</h2>

          <ul class="card">
            <li>
              <div class="dark-wrapper">
                <table class="sample-wrapper-sm">
                  <tbody>
                    <tr>
                      <td>Default</td>
                      <td>
                        <UICheckbox name="test" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </section>

        <!-- Stepper Thanh tiến trình -->
        <section :ref="(el: any) => (scrollPointData[10].refs = el as HTMLElement)">
          <h2 class="mb-4 text-h5">{{ scrollPointData[10].title }}</h2>

          <ul class="card">
            <li>
              <div class="dark-wrapper">
                <table class="sample-wrapper-md">
                  <tbody>
                    <tr>
                      <td class="w-24">Default</td>
                      <td>
                        <UIStepper />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})

/* Copy */
const { copy } = useClipboard()
const toCopy = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  copy(target.innerText)
}
const toCopyColor = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  copy('system-' + target.innerText)
}
const toCopyIcon = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const textToCopy = target.querySelector('span.hidden') as HTMLElement
  copy(textToCopy.innerText.trim())
}

/* Scroll */
const mainRefs = ref<HTMLElement | null>(null)
interface ScrollPoint {
  title: string
  point: string
  refs: HTMLElement | null
}
const scrollPointData = ref<ScrollPoint[]>([
  { title: 'Typography Thiết kế font chữ', point: 'Typography', refs: null },
  { title: 'Color System Hệ màu', point: 'Color System', refs: null },
  { title: 'Icon Biểu tượng', point: 'Icon', refs: null },
  { title: 'LOGO Biểu trưng', point: 'LOGO', refs: null },
  { title: 'Hero Button Nút nổi bật', point: 'Hero Button', refs: null },
  { title: 'Button Nút', point: 'Button', refs: null },
  { title: 'Input Field Trường nhập', point: 'Input Field', refs: null },
  { title: 'Dropdown Danh sách chọn', point: 'Dropdown', refs: null },
  { title: 'Section Tab Thẻ phân vùng', point: 'Section Tab', refs: null },
  { title: 'Checkbox Ô chọn', point: 'Checkbox', refs: null },
  { title: 'Stepper Thanh tiến trình', point: 'Stepper', refs: null }
])
const { y: mainY } = useScroll(mainRefs, { behavior: 'smooth' })
const scrollPoint = (ref: HTMLElement) => {
  mainY.value = ref.offsetTop - 32
}

const inputText = ref('The quick brown fox jumps over the lazy dog.')
</script>

<style lang="scss" scoped>
.card {
  @apply space-y-6 truncate rounded border bg-white p-6;
}

.card-title {
  @apply mb-2 text-h6 text-system-gray-60;
}

.box {
  @apply flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-system-gray-80 text-white;
}

ul {
  &.text-sample-wrapper {
    @apply space-y-2;

    li {
      > :first-child {
        @apply select-none text-h5 transition-colors hover:text-system-info-100 active:text-system-info-120;
      }
      > :nth-child(2) {
        @apply text-body-sm;
      }
      > :last-child {
        @apply text-system-gray-60;
      }
    }
  }

  &.color-box-wrapper {
    @apply grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7;

    li {
      @apply flex w-36 flex-col items-center justify-center rounded-2xl py-2;
      width: 100%;

      > :first-child {
        @apply text-h5 transition-colors hover:text-system-info-100 active:text-system-info-120;
      }
      > :last-child {
        @apply text-body-xs opacity-80 md:text-body-sm;
      }
    }

    > :nth-child(-n + 3) {
      @apply text-white;
    }

    > :nth-child(6),
    > :nth-child(7) {
      @apply border;
    }
  }

  &.icon-box-wrapper {
    @apply flex flex-wrap gap-2;

    button {
      @apply flex h-10 w-10 shrink-0 items-center justify-center transition-colors hover:text-system-info-100 active:text-system-info-120;
      font-size: 20px;
    }
  }
}

table {
  &.sample-wrapper-md {
    @apply max-w-[600px];
  }
  &.sample-wrapper-sm {
    @apply max-w-[320px];
  }

  &.sample-wrapper-sm,
  &.sample-wrapper-md {
    @apply w-full table-fixed border-collapse border;

    th,
    td {
      @apply truncate border p-2 text-center align-middle;
    }

    th {
      @apply text-h5;
    }

    td:first-child {
      @apply text-h5;
    }
  }
}

.dark-wrapper {
  @apply inline-block rounded bg-system-gray-80 p-4 text-white;
}

.gary-wrapper {
  @apply inline-block rounded bg-system-gray-40 p-4;
}
</style>
